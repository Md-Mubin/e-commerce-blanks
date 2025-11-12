import mongoose from 'mongoose';

const schema = new mongoose.Schema(
	{
		name: {
			type: 'String',
			required: [true, 'Banner name is required'],
		},
		image: {
			type: String,
		},
		images: {
			type: [String],
			// required: [true, 'Images is required'],
		},
		slug: {
			type: String,
		},
		bannerPosition: {
			type: String,
			enum: ['hero', 'body'],
			// required: [true, 'Banner position is required'],
		},
		show: {
			type: Boolean,
			default: true,
		},
		bannerType: {
			type: String,
			enum: ['image', 'video'],
			// required: [true, 'Banner type is required'],
		},
		link: {
			type: 'String',
			// required: [true, 'Link is required'],
		},
		priority: {
			type: 'Number',
		},
	},
	{
		timestamps: true,
	}
);

const Banner = mongoose.model('Banner', schema);
export { default as settings } from './settings.js';
export default Banner;
