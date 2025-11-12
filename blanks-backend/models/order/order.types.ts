import { Document, Schema } from 'mongoose';

type DocumentBaseType = Document & {
	createdAt: Date;
	updatedAt: Date;
};

export type OrderItemType = {
	name: string;
	image?: string;
	_id: Schema.Types.ObjectId;
	qty: number;
	unitPrice: number;
	totalPrice: number;
	vat: number;
};

export type OrderType = DocumentBaseType & {
	pickupDate?: Date;
	pickupTime?: string;
	user?: Schema.Types.ObjectId;
	customerEmail?: string;
	items: OrderItemType[];
	total: number;
	vat: number;
	subTotal: number;
	coupon?: Schema.Types.ObjectId;
	isPaid?: boolean;
	isPickup?: boolean;
	address: any;
	billingAddress: any;
	shippingAddress: any;
	shippingCharge: number;
	// delivery?: Schema.Types.ObjectId;
	paymentMethod?: string;
	status?: string;
	location?: any;
	paidAmount?: number;
	dueAmount?: number;
	trnxRef?: string;
	returnAmount?: number;
	// transactions?: any[];
	customer?: Schema.Types.ObjectId;
	orderDate: Date;
	shop?: Schema.Types.ObjectId;
	isCancelled?: boolean;
	discount?: number;
	isDelivered?: boolean;
	delivery?: Schema.Types.ObjectId;
	note?: string;
	origin?: string;
	courier?: string;
	trackingNumber?: string;
	trackingUrl?: string;
	profit: number;
	invoice: string;
};

export default OrderType;
