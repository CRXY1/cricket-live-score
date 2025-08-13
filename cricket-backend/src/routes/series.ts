import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Series routes not implemented yet' });
});

export default router;
