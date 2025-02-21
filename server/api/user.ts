import express from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/profile', requireAuth, (req: AuthenticatedRequest, res) => {
  res.json({
    user: req.user,
    favorites: [
    ],
  });
});

export default router;
