import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import xml2js from 'xml2js';
import { Product } from '../models/index.js';
import dns from 'dns';

dns.setDefaultResultOrder('ipv4first');
dotenv.config();

const router = express.Router();
const MAX_WEIGHT_PER_PARCEL = 30;

router.post('/', async (req: Request, res: Response) => {
  const originPostalCode = 'T5A0A1';

  try {
    const { items, shippingInfo = {}, shippingAddress = {} } = req.body;

    // Step 1: Calculate total weight
    let totalWeightKg = 0;
    for (const item of items) {
      const product = await Product.findById(item._id);
      if (!product) throw new Error(`Product ${item._id} not found`);

      const weightKg = Number(product.weight) || 0.1;
      const qty = item.quantity || item.qty || 1;
      totalWeightKg += weightKg * qty;
    }

    // Step 2: Split into multiple parcels if > 30kg
    const parcelCount = Math.ceil(totalWeightKg / MAX_WEIGHT_PER_PARCEL);
    const weightPerParcel = +(totalWeightKg / parcelCount).toFixed(2);

    // Step 3: Normalize postal code
    const normalizePostalCode =
      shippingInfo?.destinationPostalCode?.toUpperCase().replace(/\s+/g, '') ||
      shippingAddress?.postalCode?.toUpperCase().replace(/\s+/g, '');

    if (!normalizePostalCode)
      return res.status(400).json({ success: false, error: 'Postal code required' });

    const customerNumber = process.env.CANADA_POST_CUSTOMER_NUMBER_SAND;
    const contractId = process.env.CANADA_POST_CONTRACT_ID_SAND;
    const authHeader = `Basic ${Buffer.from(
      `${process.env.CANADAPOST_USER_SAND}:${process.env.CANADAPOST_PASS_SAND}`
    ).toString('base64')}`;

    const parser = new xml2js.Parser({ explicitArray: false });
    let combinedQuotes: any[] = [];

    // Step 4: Loop each parcel and request rate
    for (let i = 0; i < parcelCount; i++) {
      const xmlPayload = `<?xml version="1.0" encoding="utf-8"?>
        <mailing-scenario xmlns="http://www.canadapost.ca/ws/ship/rate-v4">
          <customer-number>${customerNumber}</customer-number>
          <contract-id>${contractId}</contract-id>
          <parcel-characteristics>
            <weight>${weightPerParcel}</weight>
          </parcel-characteristics>
          <origin-postal-code>${originPostalCode}</origin-postal-code>
          <destination>
            <domestic><postal-code>${normalizePostalCode}</postal-code></domestic>
          </destination>
          <quote-type>commercial</quote-type>
        </mailing-scenario>`;

      const response = await axios.post(process.env.CANADAPOST_URL!, xmlPayload, {
        headers: {
          Accept: 'application/vnd.cpc.ship.rate-v4+xml',
          'Content-Type': 'application/vnd.cpc.ship.rate-v4+xml',
          Authorization: authHeader,
          'Accept-language': 'en-CA',
        },
      });

      const parsed = await parser.parseStringPromise(response.data);
      const quotes = parsed?.['price-quotes']?.['price-quote'];

      if (quotes) {
        const normalizedQuotes = Array.isArray(quotes) ? quotes : [quotes];
        combinedQuotes.push(...normalizedQuotes);
      }
    }

    // Step 5: Combine duplicates (sum costs for same service)
    const summary: Record<string, any> = {};
    combinedQuotes.forEach(q => {
      const code = q['service-code'];
      const cost = parseFloat(q['price-details']?.due || '0');
      const name = q['service-name'];
      const delivery = q['service-standard']?.['expected-delivery-date'] || null;

      if (!summary[code]) {
        summary[code] = { serviceCode: code, serviceName: name, totalCost: 0, delivery };
      }
      summary[code].totalCost += cost;
    });

    const results = Object.values(summary);

    return res.json({
      success: true,
      parcelCount,
      data: results,
    });
  } catch (error: any) {
    console.error('❌ Canada Post Rate Error:', error?.response?.data || error.message);
    return res.status(500).json({
      success: false,
      error: error?.response?.data || error.message,
    });
  }
});

export default router;
