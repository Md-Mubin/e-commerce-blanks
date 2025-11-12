export { default as authRoute } from './auth.route.js';
// export { default as customerRoute } from './customers.route.js';
export { default as roleRoute } from './role.route.js';
export { default as uploadRoute } from './upload.route.js';
export { default as userRoute } from './user.route.js';
export { default as smsRoute } from './sms.route.js';
export { default as viewsRoute } from './views.route.js';
import Category from '../models/category/category.model.js';
import CategorySettings from '../models/category/category.settings.js';
// ------------- gym management --------------
import getSidebar from '../controllers/common/getSidebar.controller.js';
import {
	getModelKeys,
	// Doc,
	// docSettings,
	User,
	userSettings,
	Role,
	roleSettings,
	adminProtect as protect,
	SidebarCategory,
	sidebarCategorySettings,
	SidebarItem,
	sidebarItemSettings,
	sidebarItemConfig,
	sidebarCategoryConfig,
	adminProtect,
	Admin,
	AdminConfig,
	adminSettings,
	AdminRole,
	adminRoleConfig,
	adminRoleSettings,
	getAdminPermissionList,
	getAdminSidebar,
	Permission,
	permissionConfig,
	permissionsSettings,
	Member,
	memberSettings,
	membersConfig,
	Employee,
	employeeSettings,
	employeeConfig,
	Product,
	productSettings,
	Order,
	orderSettings,
	Warehouse,
	warehouseSettings,
	warehouseConfig,
	Banner,
	bannerSettings,
	bannerConfig,
	Subscribers,
	SubscribersSettings,
	SubscribersConfig,
	// Category,
	// categorySettings,
	// CategoryConfig,
	// productConfig,
} from '../imports.js';
import productRoute from './products.route.js';
import authRouter from '../routes-admin/auth/auth.admin.route.js';
import categoryRoute from './category.routes.js';
import commonRouter from './common/router.js';
import uploadRoute from './upload.route.js';
import shippingRoutes from './shipping.route.js';
import userAuthRouter from './user-auth.route.js';
import orderRouter from './order.route.js';

import express from 'express';
import getCartTotal from '../controllers/cart-total/getCartTotal.js';
// import getCartTotal from '../controllers/cart-total/getCartTotal.js';

const router = express.Router();

router.use('/upload', uploadRoute);
router.get('/model/:id/:type', getModelKeys);
// router.get('/model/:id/:type', getModelKeys);

router.get('/sidebar/:platform/:type', adminProtect, getAdminSidebar());
// router.get('/sidebar/:platform/:type', adminProtect, getAdminSidebar());
// admin auth
router.use('/auth', authRouter);

// user auth
router.use('/user', userAuthRouter);
router.get('/permissionlist', getAdminPermissionList());
// router.use('/brands', brandRoute);
// router.use('/categories', categoryRoute);

// router.use('/products', productRoute);
router.use(
	'/categories',
	commonRouter({
		Model: Category,
		settings: CategorySettings,
		permission: 'category',
	})
);
router.use(
	'/customers',
	commonRouter({
		Model: User,
		settings: userSettings,
		permission: 'users',
	})
);
router.use(
	'/subscribers',
	commonRouter({
		Model: Subscribers,
		settings: SubscribersSettings,
		frontendConfig: SubscribersConfig,
		permission: 'subscribers',
	})
);

// banner
router.use(
	'/banners',
	commonRouter({
		Model: Banner,
		settings: bannerSettings,
		frontendConfig: bannerConfig,
		permission: 'banners',
	})
);
// old route
router.use('/products', productRoute);

router.use('/orders', orderRouter);
router.use(
	'/warehouse',
	commonRouter({
		Model: Warehouse,
		settings: warehouseSettings,
		permission: 'warehouse',
		frontendConfig: warehouseConfig,
	})
);
router.use(
	'/users',
	commonRouter({
		Model: User,
		settings: userSettings,
		permission: 'users',
	})
);
router.use(
	'/admins',
	commonRouter({
		Model: Admin,
		settings: adminSettings,
		permission: 'admins',
		frontendConfig: AdminConfig,
	})
);

router.use(
	'/payments',
	commonRouter({
		Model: AdminRole,
		settings: adminRoleSettings,
		permission: 'roles',
		frontendConfig: adminRoleConfig,
	})
);
router.use(
	'/roles',
	commonRouter({
		Model: AdminRole,
		settings: adminRoleSettings,
		permission: 'roles',
		frontendConfig: adminRoleConfig,
	})
);

router.use(
	'/sidebarcategories',
	commonRouter({
		Model: SidebarCategory,
		settings: sidebarCategorySettings,
		permission: 'sidebar',
		frontendConfig: sidebarCategoryConfig,
	})
);

router.use(
	'/sidebaritems',
	commonRouter({
		Model: SidebarItem,
		settings: sidebarItemSettings,
		permission: 'sidebar',
		frontendConfig: sidebarItemConfig,
	})
);
router.use(
	'/categorys',
	commonRouter({
		Model: Category,
		settings: CategorySettings,
		permission: 'category',
	})
);
// permissions
router.use(
	'/permissions',
	commonRouter({
		Model: Permission,
		settings: permissionsSettings,
		permission: 'user',
		frontendConfig: permissionConfig,
	})
);

// cart total
router.post('/cart-total', getCartTotal);
router.use('/canadapost/shipping-rates', shippingRoutes);
// router.post('cart-total', getCartTotal)
export default router;
