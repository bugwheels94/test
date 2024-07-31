import express from 'express';
import { UserRepository } from '../../data-source';
import { passportProtection } from '../auth/auth';

const router = express.Router();
router.use('/users', passportProtection);
router.get('/users/me', async (req, res) => {
  res.json(req.user);
});
export default router;
