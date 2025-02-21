import express from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/authMiddleware';

const router = express.Router();

// Protected endpoint: GET /api/user/profile
router.get('/profile', requireAuth, (req: AuthenticatedRequest, res) => {
  // In a real app, you would look up the user in your database using req.user.id.
  // For now, we return the decoded user info from the token.
  res.json({
    user: req.user,
    favorites: [
      // Optionally, include favorite recipes here.
    ],
  });
});

export default router;
