import mongoose, { Schema } from 'mongoose';

const schema = new Schema<any>(
	{
		name: { type: String, required: true, trim: true },
		location: {
			address: String,
			city: String,
			state: String,
			country: String,
			zipCode: String,
			// coordinates: {
			// 	lat: Number,
			// 	lng: Number,
			// },
		},
		isActive: { type: Boolean, default: true },
	},
	{
		timestamps: true,
	}
);

const Warehouse = mongoose.model<any>('Warehouse', schema);
export { default as settings } from './settings.js';
export default Warehouse;
