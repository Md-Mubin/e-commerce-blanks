import express from 'express';
import { protect } from '../middleware/index.js';

import {
	updateSellerSelf,
	updateSellerPreferences,
	login,
	register,
	getSellerSelf,
	// shopRegister,
	UpdateShop,
} from '../controllers/index.js';
import changeSellerPassword from '../controllers/auth/changeSellerPassword.controller.js';
// import userShopRegisterController from '../controllers/onboarding/userShopRegister.controller.js';

const router = express.Router();

//route for: /api/auth route
router
	.post('/login', login)
	// .post('/register', userShopRegisterController)
	.get('/self', protect, getSellerSelf);

router.put('/update/preferences', protect, updateSellerPreferences);
router.put('/update/self', protect, updateSellerSelf);
router.put('/change-password', protect, changeSellerPassword);

// router.get('/verify-reset-token/:token', verifyToken);
// router.post('/reset', resetPassword);

export default router;
