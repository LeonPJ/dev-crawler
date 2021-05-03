import mongoose from 'mongoose';

const sellerInfoSchema = mongoose.Schema({
    sellerName: String,
    sellerPhoneNumber: String,
    sellerMail: String,
    sellerBankCode: String,
    sellerBankBranch: String,
    sellerBankAccount: String,
    sellerID: String,
    sellerReturnStore: String,
    date: {
        type: String,
        default: new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })
    }
});

const sellerInfo = mongoose.model('sellerInformation', sellerInfoSchema);

export default sellerInfo;