
import { Router } from 'express';
import courseRoutes from './courses.routes.ts';
import process from 'process';

const router = Router();

// Health Check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Module Routes
router.use('/courses', courseRoutes);

// Other routes will be attached here
// router.use('/admin', adminRoutes);
// router.use('/forms', formsRoutes);

export default router;
