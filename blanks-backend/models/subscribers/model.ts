import mongoose from 'mongoose';

const schema = new mongoose.Schema(
	{
		email: {
			type: String, // ✅ not 'String'
			unique: true,
			required: [true, 'Email is required!'],
			trim: true,
			lowercase: true,
		},
	},
	{
		timestamps: true,
	}
);

const Subscribers = mongoose.model('Subscribers', schema);
export { default as settings } from './settings.js';
export default Subscribers;
