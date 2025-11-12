// shippingRoutes
// routes/shipping.ts
import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import xml2js from 'xml2js';
import { Product } from '../models/index.js';

dotenv.config();
const router = express.Router();
// original postal code => city:Edmonton postalcode: T5A 0A1
router.post('/', async (req: Request, res: Response) => {
	const originPostalCode = 'T5A0A1';
	try {
		const {
			items,
			// originPostalCode,
			shippingInfo,
			shippingAddress,
		} = req.body;
		const customerNumber = process.env.CANADA_POST_CUSTOMER_NUMBER_SAND;
		console.log('itesm::::', req.body);

		let totalWeightKg = 0;

		for (const item of items) {
			const product = await Product.findById(item?._id);
			if (!product) throw new Error('Product not found');
			console.log('product weight:::', product);
			// Use variation weight if exists, else product weight
			const weightKg = product.weight; // assume weight stored in kg
			// Add packaging weight (optional, e.g., 0.1 kg)
			// weightKg += 0.1;
			const itemQty = item.quantity || item.qty || 1;
			totalWeightKg += weightKg * itemQty;
		}

		// Round to 3 decimals for Canada Post
		totalWeightKg = Math.ceil(totalWeightKg * 1000) / 1000;
		console.log('total items:', totalWeightKg);
		///////////////////// Normalize postal code shippingAddress
		const normalizePostalCode = shippingInfo?.destinationPostalCode
			? shippingInfo?.destinationPostalCode?.toUpperCase().replace(/\s+/g, '')
			: shippingAddress?.postalCode?.toUpperCase().replace(/\s+/g, '');
		console.log('Normalize posta code:', normalizePostalCode);

		// Build XML payload
		const xmlPayload = `<?xml version="1.0" encoding="utf-8"?>
      <mailing-scenario xmlns="http://www.canadapost.ca/ws/ship/rate-v4">
        <parcel-characteristics>
          <weight>${totalWeightKg}</weight>
        </parcel-characteristics>
        <origin-postal-code>${originPostalCode}</origin-postal-code>
        <destination>
          <domestic>
            <postal-code>${normalizePostalCode}</postal-code>
          </domestic>
        </destination>
        <quote-type>counter</quote-type>
      </mailing-scenario>`;

		// Canada Post API call
		const response = await axios.post(
			process.env.CANADAPOST_URL ||
				'https://ct.soa-gw.canadapost.ca/rs/ship/price',
			xmlPayload,
			{
				headers: {
					Accept: 'application/vnd.cpc.ship.rate-v4+xml',
					'Content-Type': 'application/vnd.cpc.ship.rate-v4+xml',
					Authorization: `Basic ${Buffer.from(
						`${process.env.CANADAPOST_USER_SAND}:${process.env.CANADAPOST_PASS_SAND}`
					).toString('base64')}`,
					'Accept-language': 'en-CA',
				},
			}
		);

		// Convert XML -> JSON
		const parser = new xml2js.Parser({ explicitArray: false });
		const result = await parser.parseStringPromise(response.data);
		console.log('shipping rate result::', result);
		res.json({ success: true, data: result });
	} catch (error: any) {
		console.error(
			'Error fetching Canada Post rates:',
			error?.response?.data || error.message
		);
		res.status(500).json({
			success: false,
			error: error?.response?.data || error.message,
		});
	}
});

export default router;
