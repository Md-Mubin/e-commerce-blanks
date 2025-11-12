export const warehouse = {
	id: 1,
	label: 'Dhaka Central',
};

export const availableSizes = ['S', 'M', 'L', 'XL'];

export const priceBySize: { [key: string]: number } = {
	S: 12,
	M: 14,
	L: 16,
	XL: 18,
};

export const stock: { [key: string]: number } = {
	S: 5,
	M: 0, // Out of stock
	L: 12,
	XL: 7,
};

// Example: user has selected quantities
export const selectedQuantity: { [key: string]: number | '' } = {
	S: '',
	M: '',
	L: '',
	XL: '',
};
