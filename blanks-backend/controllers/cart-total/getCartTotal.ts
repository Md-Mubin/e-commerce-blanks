import { Request, Response } from 'express';
import { Order, Product } from '../../models/index.js';
import Coupon from '../../models/coupon/coupon.model.js';

const getCartTotal = async (req: Request, res: Response): Promise<Response> => {
	try {
		let subTotal = 0;
		let vat = 0;
		let cartItems: any[] = [];
		let discount = 0;
		let couponCodeId: string | undefined;
		let totalItems = 0;

		const {
			couponCode,
			shippingInfo = {},
			items = [],
			isPickup = false,
		} = req.body;
		const user = (req as any).user || null; // ✅ null = guest

		// ---------------------------
		// ✅ Coupon Validation
		// ---------------------------
		let couponData: any = null;
		if (couponCode) {
			couponData = await Coupon.findOne({
				code: couponCode,
				isActive: true,
				validTill: { $gte: new Date() },
			});

			if (!couponData) {
				return res
					.status(400)
					.json({ message: `Coupon ${couponCode} is invalid or expired.` });
			}

			const query: { [key: string]: any } = { coupon: couponData._id };
			if (user) query['customer'] = user._id;

			const totalUses = await Order.countDocuments(query);
			if (totalUses >= couponData.maxUse) {
				return res.status(400).json({
					message: `Coupon ${couponCode} has reached its usage limit.`,
				});
			}

			couponCodeId = couponData._id.toString();
		}

		// ---------------------------
		// ✅ Validate and Calculate Items
		// ---------------------------
		for (const item of items) {
			const product: any = await Product.findById(item._id);
			if (!product) {
				return res
					.status(400)
					.json({ message: `Product ${item._id} not found.` });
			}
			console.log('find product""', product);

			let matchedPrice: number | undefined;
			let vatRate = product.vat || 0;

			// 1️⃣ Try match main product price
			if (Number(item.price) === Number(product.price)) {
				matchedPrice = Number(product.price);
			} else {
				// 2️⃣ Try match variation
				const variation = product.variations?.find(
					(v: any) =>
						v._id.toString() === item.variationId ||
						Number(v.price) === Number(item.price)
				);

				if (variation) {
					matchedPrice = Number(variation.price);
				}

				// 3️⃣ Try match any discount tier from product or variation
				const tiers = [
					...(product.discountTiers || []),
					...(variation?.discountTiers || []),
				];

				const tierMatch = tiers.find(
					(t: any) => Number(t.price) === Number(item.price)
				);

				if (tierMatch) {
					matchedPrice = Number(tierMatch.price);
				}
			}

			// 4️⃣ If still no match, reject
			if (matchedPrice === undefined) {
				return res.status(400).json({
					message: `Invalid price for product ${product.name}. Possible tampering detected.`,
				});
			}

			// 5️⃣ Compute totals
			const lineSubtotal = matchedPrice * item.qty;
			const itemVat = (lineSubtotal * vatRate) / 100;

			subTotal += lineSubtotal;
			vat += itemVat;
			totalItems += item.qty;

			cartItems.push({
				_id: product._id,
				name: product.name,
				image: product.image || null,
				qty: item.qty,
				unitPrice: matchedPrice,
				totalPrice: lineSubtotal,
				vat: itemVat,
			});
		}

		// ---------------------------
		// ✅ Apply Discount
		// ---------------------------
		if (couponData) {
			if (subTotal < couponData.minOrderValue) {
				return res.status(400).json({
					message: `Minimum order value for ${couponData.code} is ${couponData.minOrderValue}`,
				});
			}

			if (couponData.discountType === 'fixed') {
				discount = couponData.discountValue;
			} else {
				discount = Math.ceil((subTotal * couponData.discountValue) / 100);
			}
		}

		const extraDiscount = req?.body?.discount || 0;
		const totalDiscount = discount + extraDiscount;

		const shippingCost = isPickup ? 0 : Number(shippingInfo?.shippingCost || 0);
		const total = Math.ceil(subTotal + vat - totalDiscount + shippingCost);

		return res.json({
			success: true,
			userType: user ? 'registered' : 'guest',
			subTotal,
			total,
			vat,
			discount: totalDiscount,
			coupon: couponData ? couponData.code : null,
			couponCodeId: couponCodeId || null,
			totalItems,
			isPickup,
			items: cartItems,
			shippingInfo,
		});
	} catch (e: any) {
		console.error(e);
		return res.status(500).json({ message: e.message });
	}
};

export default getCartTotal;
