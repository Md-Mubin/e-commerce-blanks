import mongoose, { Schema } from 'mongoose';

const schema = new Schema<any>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		phone: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		preferences: {
			type: [String],
			default: [],
		},
		role: {
			type: Schema.Types.ObjectId,
			ref: 'Role',
			required: true,
		},
		isActive: {
			type: Boolean,
			required: true,
			default: true,
		},
		joiningDate: {
			type: Date,
		},
		image: {
			type: String,
		},
		nid: {
			type: String,
		},
		nidImage: {
			type: String,
		},
	},
	{ timestamps: true }
);

const Employee = mongoose.model<any>('Employee', schema);
export {default as settings} from './settings.js'
export default Employee;
