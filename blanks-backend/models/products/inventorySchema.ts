import { Schema } from 'mongoose';
const warehouseInventorySchema = new Schema(
	{
		warehouse: {
			type: Schema.Types.ObjectId,
			ref: 'Warehouse',
			required: true,
		},
		stock: { type: Number, default: 0, required: true },
		reservedStock: { type: Number, default: 0 }, // for orders being processed
		lowStockAlert: { type: Number, default: 0 },
	}
	//   { _id: false }
);
export default warehouseInventorySchema;
