import { Schema } from 'mongoose';
import warehouseInventorySchema from './inventorySchema.js';
const discountTierSchema = new Schema(
	{
		minQuantity: { type: Number, required: true },
		maxQuantity: { type: Number, required: true },
		// discountType: {
		// 	type: String,
		// 	enum: ['percentage', 'flat'],
		// 	default: 'percentage',
		// },
		price: { type: Number, required: true },
	},
	{ _id: false }
);
const variationSchema = new Schema(
	{
		name: { type: String, required: true },
		description: { type: String, trim: true },
		sku: { type: String, trim: true, unique: true, sparse: true },
		price: { type: Number, required: true },
		cost: { type: Number, default: 0 },
		stock: { type: Number, default: 0 },
		lowStockAlert: { type: Number, default: 0 },
		// bulk discount
		discountTiers: [discountTierSchema],
		// Warehouse-specific inventory
		// warehouseInventory: [warehouseInventorySchema],

		// Product attributes (size, color, etc.)
		attributes: [
			{
				label: { type: String }, // e.g., "Size", "Color"
				value: { type: String }, // e.g., "M", "Black"
			},
		],
		images: [String],

		// Additional fields for better inventory management
		weight: { type: Number }, // for shipping calculations
		dimensions: {
			length: Number,
			width: Number,
			height: Number,
			unit: { type: String, default: 'cm' },
		},
	},
	{
		_id: true,
		timestamps: true,
	}
);

export default variationSchema;
