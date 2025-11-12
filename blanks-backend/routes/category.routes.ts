// Import necessary modules from their respective files
import express from 'express';
import Category from '../models/category/category.model.js';
import CategorySettings from '../models/category/category.settings.js';
// import {
// 	Category as Model,
// 	categorySettings as settings,
// } from '../models/index.js';
import { Filter } from '../lib/types/settings.types.js';

import { orderStatus } from '../models/order/order.settings.js';
import {
	getSum,
	constructConfig,
	getInventoryCount,
	deleteDocument,
	getFilters,
	createDocument,
	updateDocument,
	getAllDocuments,
	getDocumentById,
	getDocumentToEditById,
	duplicateDocument,
	updateManyDocuments,
	exportDocument,
	getCount,
	adminProtect as protect,
	sort,
	query,
	ifExists,
	validate,
	adminPermissions as hasPermission,
	exportPdf,
	customQuery,
	constructPermissions,
	isExpired,
	getSchema,
} from '../imports.js';

type TopProductsFilters = {
	[key: string]: { filter: Filter; sort?: boolean };
};

const topProductsFilters: TopProductsFilters = {
	createdAt: {
		sort: true,
		filter: {
			name: 'createdAt',
			type: 'date',
			label: 'Date',
			title: 'Filter by Date',
		},
	},
	status: {
		sort: true,
		filter: {
			name: 'Status',
			field: 'status_in',
			type: 'multi-select',
			label: 'Order Status',
			title: 'Sort by order status',
			options: orderStatus,
		},
	},
};

const permissions = constructPermissions('expense');

// Initialize a new router
const router = express.Router();

const config = constructConfig({
	model: Category,
	config: CategorySettings,
});

// Define common middleware
const commonMiddleware = [
	protect,
	sort,
	query(config.FILTER_OPTIONS),
	hasPermission([permissions.read]),
];

const postMiddleware = [
	protect,
	isExpired,
	ifExists(config.EXIST_OPTIONS),
	validate(config.VALIDATORS.POST),
];
const updateMiddleware = [
	protect,
	isExpired,
	ifExists(config.EXIST_OPTIONS),
	validate(config.VALIDATORS.UPDATE),
];

const getByIdMiddleware = [protect, hasPermission([permissions.view])];
const countMiddleware = [protect, query(config.FILTER_OPTIONS)];
const deleteMiddleware = [
	protect,
	isExpired,
	hasPermission([permissions.delete]),
];

// Define the routes for the product store
router
	.route('/')
	.get(...commonMiddleware, getAllDocuments(config.QUERY_OPTIONS))
	.post(
		...postMiddleware,
		hasPermission([permissions.create]),
		createDocument(config.MODEL)
	);

// router.get('/top-selling', ...orderMiddleware, topSellingProductController);

// roduct.find({ $expr: { $gt: ['$lowStockAlert', '$stock'] } }
router.get(
	'/low-stock',
	...commonMiddleware,
	customQuery({
		query: { $expr: { $gte: ['$lowStockAlert', '$stock'] } },
	}),
	getAllDocuments(config.QUERY_OPTIONS)
);

router.get('/:id', ...getByIdMiddleware, getDocumentById(config.QUERY_OPTIONS));

router.get(
	'/edit/:id',
	...getByIdMiddleware,
	getDocumentToEditById(config.MODEL)
);

router.get('/get/filters', protect, getFilters(config.FILTER_LIST));

router.put(
	'/:id',
	...updateMiddleware,
	hasPermission(['edit_product']),
	updateDocument(config.EDITS)
);
router.delete('/:id', ...deleteMiddleware, deleteDocument(config.MODEL));
router.get('/get/count', protect, getCount(config.MODEL));

router.post('/export/csv', protect, exportDocument(config.QUERY_OPTIONS));
router.post('/export/pdf', protect, exportPdf(config.QUERY_OPTIONS));

router.put(
	'/update/many',
	protect,
	hasPermission(['edit_product']),
	updateManyDocuments(config.EDITS)
);
router.put('/copy/:id', protect, duplicateDocument(config.DUPLICATE_OPTIONS));
router.get('/get/schema', getSchema(config.SCHEMA));
// router.put('/:id/cancel', protect, cancelOrder);
router.get(
	'/get/sum/:field',
	...countMiddleware,
	getInventoryCount(config.MODEL)
);

// Export the router
export default router;
