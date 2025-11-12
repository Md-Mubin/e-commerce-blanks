import jwt from 'jsonwebtoken';
import User from '../models/user/user.model.js'; // adjust path as per your structure
import { Request, Response, NextFunction } from 'express';

const authOrGuest = async (req: any, res: Response, next: NextFunction) => {
	try {
		const authHeader: any = req.headers.authorization;

		if (authHeader && authHeader.startsWith('Bearer ')) {
			const token = authHeader.split(' ')[1];
			if (!token) {
				req.user = null;
				return next();
			}

			const decoded: any = jwt.verify(
				token,
				process.env.JWT_PRIVATE_KEY as string
			);
			const user = await User.findById(decoded.id).select('-password');
			req.user = user || null;
		} else {
			req.user = null; // guest order
		}

		next();
	} catch (error) {
		console.log('authOrGuest error:', error);
		req.user = null; // fallback as guest
		next();
	}
};

export default authOrGuest;
