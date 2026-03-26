import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import homeRoutes from './homeRoutes';
import transactionRoutes from './transactionRoutes';
import billRoutes from './billRoutes';
import eventRoutes from './eventRoutes';
import announcementRoutes from './announcementRoutes';
import maintenanceRoutes from './maintenanceRoutes';

const router = Router();

router.use('/api/auth', authRoutes);
router.use('/api/users', userRoutes);
router.use('/api/homes', homeRoutes);
router.use('/api/transactions', transactionRoutes);
router.use('/api/bills', billRoutes);
router.use('/api/events', eventRoutes);
router.use('/api/announcements', announcementRoutes);
router.use('/api/maintenance', maintenanceRoutes);

router.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

export default router;
