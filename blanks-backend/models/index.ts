import { permissions } from './../lib/types/permissions';
//Customer
export { default as Customer } from './customer/customer.model.js';
export { default as customerSettings } from './customer/customer.settings.js';
// Category

// export { default as categorySettings } from './category/category.settings.js';
// export { default as Category } from './category/category.model.js';
// export { default as CategoryConfig } from './category/config.js';
//User
export { default as User } from './user/user.model.js';
export { settings as userSettings } from './user/user.model.js';

//role
export { default as Role } from './role/role.model.js';
export { settings as roleSettings } from './role/role.model.js';

//Counter
export { default as Counter } from './counter/counter.model.js';

//Contacts
// export { default as Supplier } from './customer/supplier.model.js';
// export { supplierSettings } from './customer/supplier.model.js';
//Pages
export { default as Page } from './pages/model.js';
export { default as pageSettings } from './pages/settings.js';
export { default as pageConfig } from './pages/config.js';
// Employee
export { default as Employee } from './employee/model.js';
export { settings as employeeSettings } from './employee/model.js';
export { default as employeeConfig } from './employee/config.js';

// Member
export { default as Member } from './member/model.js';
export { settings as memberSettings } from './member/model.js';
export { default as membersConfig } from './member/config.js';

//Product
export { ProductType } from './products/products.types.js';
export { default as Product } from './products/products.model.js';
export { settings as productSettings } from './products/products.model.js';
// export { default as productConfig } from './products/config.js';
export { default as inventorySettings } from './products/inventory.settings.js';

//  Order
export { default as Order } from './order/order.model.js';
export { settings as orderSettings } from './order/order.model.js';

//Admin Role & User
export { default as Admin } from './admin/admin.model.js';
export { default as AdminRole } from './admin/adminRole.model.js';
export { default as AdminConfig } from './admin/admin.config.js';
export { default as adminRoleSettings } from './admin/adminRole.settings.js';
export { default as adminRoleConfig } from './admin/adminRole.config.js';
export { default as adminSettings } from './admin/admin.settings.js';
// Permissions
export { default as Permission } from './permissions/model.js';
export { default as permissionsSettings } from './permissions/settings.js';
export { default as permissionConfig } from './permissions/config.js';
////////////////////////////////////// new

// banner
export { default as Banner } from './banners/model.js';
export { settings as bannerSettings } from './banners/model.js';
export { default as bannerConfig } from './banners/config.js';
// Subscribers
export { default as Subscribers } from './subscribers/model.js';
export { settings as SubscribersSettings } from './subscribers/model.js';
export { default as SubscribersConfig } from './subscribers/config.js';
// warehouse
export { default as Warehouse } from './products/warehouse/model.js';
export { settings as warehouseSettings } from './products/warehouse/model.js';
export { default as warehouseConfig } from './products/warehouse/config.js';
//Views
export { default as View } from './views/model.js';
export { viewSettings } from './views/settings.js';

//Clicks
export { default as Click } from './click/model.js';
export { default as clickSettings } from './click/settings.js';
//SMS
export { default as SMS } from './sms/sms.model.js';
export { default as SMSType } from './sms/sms.types.js';
export { default as smsSettings } from './sms/sms.settings.js';

//Admin Expense
export { default as AdminExpense } from './admin-expense/adminExpense.model.js';
export { default as adminExpenseSettings } from './admin-expense/adminExpense.settings.js';

//Bill
export { default as Bill } from './admin-expense/bills.model.js';
export { default as billSettings } from './admin-expense/bills.settings.js';

//Sidebar Categories
export { default as SidebarCategory } from './sidebarcategories/model.js';
export { default as sidebarCategorySettings } from './sidebarcategories/settings.js';
export { default as sidebarCategoryConfig } from './sidebarcategories/config.js';

//Sidebar Items
export { default as SidebarItem } from './sidebaritems/model.js';
export { default as sidebarItemSettings } from './sidebaritems/settings.js';
export { default as sidebarItemConfig } from './sidebaritems/config.js';
