import mongoose, { Schema } from 'mongoose';
import { OrderType, OrderItemType } from './order.types.js';
import { Counter } from '../index.js';
import Ledger from '../ledger/ledger.model.js';

const schema: Schema = new Schema<OrderType>(
	{
		invoice: { type: String },
		items: [
			{
				name: { type: String, required: true },
				image: { type: String },
				_id: {
					type: Schema.Types.ObjectId,
					required: true,
					ref: 'Product',
					populate: 'Product',
				},
				qty: { type: Number, required: true },
				unitPrice: { type: Number, required: true },
				totalPrice: { type: Number },
				vat: { type: Number, required: true },
				unitVat: { type: Number },
				returnQty: {
					type: Number,
					default: 0,
				},
			} as Record<string, any>,
		],
		customerEmail: { type: String }, // not in admin schema
		total: { type: Number, required: true, default: 0 },
		returnAmount: { type: Number, default: 0, required: true },

		vat: { type: Number, required: true, default: 0 },
		subTotal: { type: Number, required: true, default: 0 },
		coupon: { type: Schema.Types.ObjectId, ref: 'Coupon' },
		isPaid: { type: Boolean, default: false },
		paidAmount: { type: Number, default: 0 },
		profit: { type: Number, default: 0, required: true },
		dueAmount: { type: Number, default: 0 },
		isPickup: { type: Boolean, default: true },
		address: { type: Schema.Types.Mixed },
		billingAddress: { type: Schema.Types.Mixed },
		shippingAddress: { type: Schema.Types.Mixed },
		shippingCharge: { type: Number, required: true, default: 0 },
		paymentMethod: { type: String }, // is not in admin schema
		trnxRef: { type: String }, // is not in admin schema
		status: { type: String, default: 'order-placed' },
		customer: { type: Schema.Types.ObjectId, ref: 'User' },
		orderDate: { type: Date, default: Date.now, required: true }, // is not in admin schema
		isCancelled: { type: Boolean, default: false, required: true }, // is not in admin schema
		discount: { type: Number, default: 0, required: true }, // is not in admin schema
		isDelivered: { type: Boolean, default: false, required: true }, // is not in admin schema
		note: { type: String }, // is not in admin schema
		courier: {
			type: String,
		}, // is not in admin schema
		trackingNumber: {
			type: String,
		}, // is not in admin schema
		trackingUrl: {
			type: String,
		}, // is not in admin schema
		pickupDate: { type: Date },
		pickupTime: { type: String },
		origin: { type: String, default: 'website' },
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

schema.virtual('totalItems').get(function () {
	if (!Array.isArray(this.items)) {
		return 0;
	}
	return this.items.reduce((total: number, item: OrderItemType): number => {
		return total + (item.qty || 0);
	}, 0);
});

// Create a virtual property 'name' that gets and sets the 'invoice' field
schema
	.virtual('name')
	.get(function () {
		return this.invoice;
	})
	.set(function (value) {
		this.invoice = value;
	});

// Pre-save hook to auto-increment the invoice number
schema.pre<OrderType>('save', async function (next) {
	try {
		if (this.isNew) {
			// Find the counter document
			let counter = await Counter.findOne({
				// shop: this?.shop?.toString(),
				slug: 'order',
			});

			// If no counter document exists, create one
			if (!counter) {
				counter = new Counter({
					sequenceValue: 0,
					// shop: this?.shop?.toString(),
					slug: 'order',
				});
			}

			// Increment the sequence value
			counter.sequenceValue += 1;
			await counter.save();

			// Set the invoice number as a string with at least 4 digits
			this.invoice = counter.sequenceValue.toString().padStart(4, '0');
		}
		next();
	} catch (error: any) {
		console.log(error);
		next();
	}
});

let isNewOrder = false;

schema.pre<any>('save', function (next) {
	isNewOrder = this.isNew;
	next();
});
// ensure that customer can be null (guest orders) and customerEmail is required if customer is null.
schema.pre('save', function (next) {
	if (!this.customer && !this.customerEmail) {
		return next(new Error('Guest orders must include customerEmail.'));
	}
	next();
});
// Pre-save hook to auto-increment the invoice number
schema.post<any>('save', async function (next) {
	try {
		if (isNewOrder) {
			const ledger = new Ledger({
				amount: this.total,
				account: 'debit',
				order: this._id,
				type: 'customer',
				amountReceived: 0,
				amountSent: this.total,
				note: `Order placed for invoice ${this.invoice}`,
				date: this.orderDate,
				customer: this.customer,
			});
			await ledger.save();
		}
	} catch (error: any) {
		console.log('Error creating ledger entry:', error);
	}
});

const Order = mongoose.model<OrderType>('Order', schema);
export default Order;
export { default as settings } from './order.settings.js';
