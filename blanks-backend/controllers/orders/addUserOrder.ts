import { Response } from 'express';
import Order from '../../models/order/order.model.js';
// import sendMail from '../mail/sendMail.controller.js';
import { Product } from '../../imports.js';
//  "name": "Recepient",
//     "email": "recipent@gmail.com",
//     "phone": "01752175488",
//     "street": "street address here...",
//     "city": "Clagray",
//     "state": "Alberta",
//     "country": "Canada",
//     "postalCode": "457845"
// shippingAddress: {
// 		fullName: '',
// 		street: '',
// 		city: '',
// 		state: '',
// 		postalCode: '',
// 		country: '',
// 	},
const addUserOrder = async (req: any, res: Response): Promise<Response> => {
	try {
		const {
			cart,
			isPaid,
			shippingAddress,
			billingAddress,
			customer,
			user,
			paymentInfo,
			isPickup,
			pickupDate,
			pickupTime,
		} = req.body;

		// ✅ Create Order
		const order = new Order({
			items: cart.items,
			total: cart.total,
			vat: cart.vat,
			subTotal: cart.subTotal,
			coupon: cart.couponCodeId,
			discount: cart.discount,
			address: {
				email: customer?.email,
				name: shippingAddress?.fullName,
				street: shippingAddress?.street,
				city: shippingAddress?.city,
				state: shippingAddress?.state,
				country: shippingAddress?.country,
				postalCode: shippingAddress?.postalCode,
			},
			isPaid: isPaid || false,
			shippingAddress,
			billingAddress,
			origin: 'website',
			status: 'pending',
			paymentMethod: paymentInfo?.method,
			customerEmail: customer?.email,
			customer: user ? user : null,
			orderDate: Date.now(),
			dueAmount: isPaid ? 0 : Number(cart?.total),
			isPickup,
			pickupDate,
			pickupTime,
		});

		const saved = await order.save();
		// ✅ Reduce Stock (both product & variant)
		for (const item of cart.items) {
			const product = await Product.findById(item._id);
			if (!product) continue;

			// Try to match variant first
			const variation = product.variations?.find(
				(v: any) => v.price === item.unitPrice
			);

			if (variation) {
				// variant stock
				const idx = product.variations.findIndex((v: any) =>
					v._id.equals(variation._id)
				);
				product.variations[idx].stock = Math.max(
					product.variations[idx].stock - item.qty,
					0
				);
			} else {
				// base product stock
				product.stock = Math.max(product.stock - item.qty, 0);
			}

			await product.save();
		}

		// ✅ Send pickup email if applicable
// 		if (isPickup) {
// 			const ownerEmail: any = process.env.SHOP_OWNER_EMAIL;

// 			await sendMail({
// 				to: ownerEmail,
// 				subject: `New Pickup Order #${saved.invoice}`,
// 				body: `
// New pickup order placed:
// Invoice: ${saved.invoice}
// Customer: ${customer?.name || 'Guest'}
// Email: ${customer?.email}
// Pickup Date: ${pickupDate}
// Pickup Time: ${pickupTime}
// Total: $${saved.total}

// Please prepare the items before pickup.
// 				`,
// 			});
// 		}

		return res.status(201).json({
			message: `Order ${saved.invoice} placed successfully.`,
			order: saved,
		});
	} catch (e: any) {
		console.error('Order Error:', e);
		return res.status(500).json({ message: e.message });
	}
};

export default addUserOrder;
