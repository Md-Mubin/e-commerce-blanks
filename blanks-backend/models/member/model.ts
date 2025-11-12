import mongoose, { Schema } from 'mongoose';

const schema = new Schema<any>(
	{
		code: {
			type: String,
		},
		name: {
			type: String,
			required: [true, 'Name is required'],
			trim: true,
		},
		email: {
			type: String,
			trim: true,
			lowercase: true,
		},
		phone: {
			type: String,
			required: [true, 'Phone number is required'],
			trim: true,
		},
		gender: {
			type: String,
			required: true,
			enum: ['male', 'female', 'others'],
		},
		age: {
			type: Number,
		},
		dateOfBirth: {
			type: Date,
		},
		height: {
			type: Number,
		},
		weight: {
			type: Number,
		},
		image: {
			type: String,
		},
		status: {
			type: String,
			required: true,
			enum: ['active', 'inactive'],
		},
		nid: {
			type: String,
		},
		plan: {
			type: Schema.Types.ObjectId,
			ref: 'Plan',
		},
		joiningDate: {
			type: Date,
			required: true,
		},
		address: {
			type: String,
		},
		nidImage: {
			type: String,
		},
		note: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Member = mongoose.model<any>('Member', schema);
export default Member;
export { default as settings } from './settings.js';
