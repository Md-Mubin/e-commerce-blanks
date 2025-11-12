// Import necessary modules from their respective files
import express from 'express';

// import {
// 	myData,
// 	userProtect as protect,
// 	sort,
// 	query,
// } from '../../middleware/index.js';
// import { checkProductOrderStatus } from '../../controllers/index.js';
import {
	constructConfig,
	getAllDocuments,
	getDocumentById,
	adminProtect as protect,
	Order,
	orderSettings,
	query,
	sort,
	getFilters,
	updateDocument,
	getCount,
	getSum,
	adminPermissions as hasPermission,
	updateManyDocuments,
	validate,
	getDocumentToEditById,
} from '../imports.js';
import addUserOrder from '../controllers/orders/addUserOrder.js';
import authOrGuest from '../middleware/authOrGuest.js';
import cancelOrder from '../controllers/orders/cancelOrder.controller.js';
// Initialize a new router
const router = express.Router();

const config = constructConfig({
	model: Order,
	config: orderSettings,
});
const updateMiddleware = [
	protect,
	validate(config.VALIDATORS.UPDATE),
	hasPermission(['edit_order']),
];
const countMiddleware = [protect, query(config.FILTER_OPTIONS)];

router.post('/', authOrGuest, addUserOrder);
router.get('/:id', protect, getDocumentById({ model: Order }));
router.get(
	'/edit/:id',
	protect,
	hasPermission(['view_order']),
	getDocumentToEditById(config.MODEL)
);
// router.get('/product-status/:productId', protect, checkProductOrderStatus);

// only logged in user will get all his orders
router.get(
	'/',
	protect,
	sort,
	query(config.FILTER_OPTIONS),
	getAllDocuments(config.QUERY_OPTIONS)
);

router.get('/get/filters', protect, getFilters(config.FILTER_LIST));
router.put('/:id', ...updateMiddleware, updateDocument(config.EDITS));
router.delete('/:id', protect, cancelOrder);
router.get('/get/count', ...countMiddleware, getCount(config.MODEL));

router.get('/get/sum/:field', ...countMiddleware, getSum(config.MODEL));

// router.post('/export/csv', protect, exportDocument(config.QUERY_OPTIONS));

router.put(
	'/update/many',
	protect,
	hasPermission(['edit_order']),
	updateManyDocuments(config.EDITS)
);
// router.put('/copy/:id', protect, duplicateDocument(config.DUPLICATE_OPTIONS));
export default router;
