import express from 'express';
// import { protect, shop } from '../../middleware/userAuth.middleware.js';

// import updateSellerPreferences from '../../controllers/auth/updatePreference.controller.js';
import userLoginController from '../controllers/auth/login.controller.js';
import userRegisterController from '../controllers/auth/register.controller.js';
import userGetSelf from '../controllers/auth/getSelf.controller.js';
import { protect } from '../middleware/index.js';
// import updateSelf from '../../controllers/auth/updateSelf.controller.js';
// import changeUserPassword from '../../controllers/auth/changeUserPassword.controller.js';
// import requestPasswordChange from '../../controllers/auth/requestPasswordChange.js';
// import verifyToken from '../../controllers/auth/verifyToken.js';
// import resetPassword from '../../controllers/auth/resetPassword.js';

const router = express.Router();

//route for: /api/auth route
router
	.post('/login', userLoginController)
	.post('/register', userRegisterController)
	.get('/self', protect, userGetSelf);

// router.put('/update/preferences', protect, updateSellerPreferences);
// router.put('/self', protect, updateSelf);
// router.put('/update/password', protect, changeUserPassword);

// router.post('/request-password-change', shop, requestPasswordChange);
// router.get('/verify-reset-token/:token', shop, verifyToken);
// router.post('/reset', shop, resetPassword);

export default router;
