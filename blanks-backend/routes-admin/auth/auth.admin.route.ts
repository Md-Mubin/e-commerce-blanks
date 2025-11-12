import express from 'express';
import {
	adminLoginController,
	adminGetSelfController,
	adminUpdateSelfCongroller,
	updateAdminPreferences,
} from './controllers/index.js';
import { adminProtect } from '../../imports.js';
import changeSellerPassword from '../../controllers/auth/changeSellerPassword.controller.js';

const router = express.Router();

router.post('/login', adminLoginController);
router.get('/self', adminProtect, adminGetSelfController);
router.put('/update/self', adminProtect, adminUpdateSelfCongroller);
router.put('/update/preferences', adminProtect, updateAdminPreferences);
router.put('/change-password', adminProtect, changeSellerPassword);

export default router;
