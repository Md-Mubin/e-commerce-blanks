// utils/checkoutValidation.ts
export const validateCustomer = (customer: { email: string; phone?: string }) =>
	/\S+@\S+\.\S+/.test(customer.email);

export const validateAddress = (address: {
	fullName: string;
	street: string;
	city: string;
	state: string;
	postalCode: string;
	country: string;
}) => Object.values(address).every(v => v.trim() !== '');

export const validatePayment = (paymentInfo: {
	method: string;
	cardNumber?: string;
	expiry?: string;
	cvv?: string;
	nameOnCard?: string;
}) => {
	if (paymentInfo.method === 'credit_card') {
		return (
			paymentInfo.cardNumber?.length === 16 &&
			paymentInfo.expiry?.match(/^\d{2}\/\d{2}$/) &&
			paymentInfo.cvv?.length === 3 &&
			paymentInfo.nameOnCard?.trim() !== ''
		);
	}
	return true;
};
