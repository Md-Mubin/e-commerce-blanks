import mongoose, { Schema } from 'mongoose';
import variationSchema from './variationSchema.js';

const discountTierSchema = new Schema(
	{
		minQuantity: { type: Number, required: true },
		maxQuantity: { type: Number, required: true },
		// discountType: {
		// 	type: String,
		// 	enum: ['percentage', 'flat'],
		// 	default: 'percentage',
		// },
		price: { type: Number, required: true }, // e.g., 10% or 500 flat
	},
	{ _id: false }
);

const schema = new Schema<any>(
	{
		name: { type: String, required: true, trim: true },
		shortDescription: { type: String, trim: true },
		description: { type: String },
		category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
		brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
		images: [String],
		image: String,

		// Global stock for simple products (when no variations exist)
		stock: { type: Number, default: 0 },
		damage: { type: Number, default: 0 },
		lowStockAlert: { type: Number, default: 0 }, //

		// Product variations with warehouse inventory
		variations: [variationSchema],

		// Base pricing
		cost: { type: Number, required: true, default: 0 }, // costPrice - buying cost
		price: { type: Number, required: true }, // base selling price

		// Bulk discounts
		discountTiers: [discountTierSchema], // n

		// SEO + Marketing
		slug: { type: String, trim: true, lowercase: true },
		tags: [String],
		meta: {
			title: String,
			description: String,
			keywords: [String],
			image: String,
		},
		metaKeywords: [String],
		metaImage: String,
		// Flags
		isFeatured: { type: Boolean, default: false },
		isVisible: { type: Boolean, default: true },
		status: {
			type: String,
			enum: ['draft', 'published', 'archived'],
			default: 'draft',
		},

		// Extra / Flexible attributes
		customAttributes: [
			{
				label: String,
				value: String,
			},
		],
		faq: [
			{
				question: String,
				answer: String,
			},
		],
		weight: {
			type: Number,
			default: 0, // Weight in grams or other units
		},
		// dimensions:
		length: { type: Number, default: 0 }, // in cm
		width: { type: Number, default: 0 }, // in cm
		height: { type: Number, default: 0 }, // in cm

		vat: { type: Number, default: 0 },
		isDeleted: { type: Boolean },
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// Add the 'inStock' virtual field
schema.virtual('inStock').get(function (this: any) {
	return this.stock > 0;
});

//Total Stock
schema.virtual('totalStock').get(function (this: any) {
	let totalStock = 0;
	this.inventory?.forEach((inv: any) => {
		totalStock += inv.stock;
	});
	return totalStock + this.stock;
});

//Total Inventory Sell value
schema.virtual('totalInventorySellValue').get(function (this: any) {
	let totalValue = 0;
	this.inventory?.forEach((inv: any) => {
		totalValue += inv.stock * this.price;
	});
	return totalValue + this.stock * this.price;
});

//Total Inventory Sell value
schema.virtual('stockInTransit').get(function (this: any) {
	let totalValue = 0;
	this.inventory?.forEach((inv: any) => {
		totalValue += inv.incomingStock;
	});
	return totalValue;
});

// Pre-save middleware to set the slug field
schema.pre('save', function (next) {
	if (!this.slug) {
		if (!this.name) return;
		this.slug = (this.name as any).toLowerCase().replace(/\s+/g, '-');
	}
	next();
});

// Define the virtual property
schema.virtual('inventoryCostPrice').get(function (this: any) {
	return this.price * this.stock;
});

// Define the virtual property
schema.virtual('inventorySellPrice').get(function (this: any) {
	return this.price * this.stock;
});

const Product = mongoose.model<any>('Product', schema);
export default Product;

export { default as settings } from './products.settings.js';
