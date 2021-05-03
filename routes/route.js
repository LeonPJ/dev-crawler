import express from 'express';
import createSellerInfo from '../controllers/createSellerInfo.js';

const router = express.Router();

router.post('/create/sellerinfo', createSellerInfo);
//router.post('/create/seller', createSellerInfo);

export default router;