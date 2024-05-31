import { syncMenuController } from '#controllers/menuController';
import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send('Hello World!');
});

router.get('/trigger-sync/:locationId?', syncMenuController);

export default router;
