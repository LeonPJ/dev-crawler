import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    buyerName: String,
    buyerPhoneNumber: String,
    orderNumber: String,
    date: {
        type: String,
        default: new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })
    }
});

const orderInfo = mongoose.model('orderInformation', orderSchema);

export default orderInfo;