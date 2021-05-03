import sellerInfo from '../models/sellerInfo.js';

const createSellerInfo = async (req, res) => {
    const newSellerInfo = new sellerInfo({
        sellerName: req.body.sellerName,
        sellerPhoneNumber: req.body.sellerPhoneNumber,
        sellerMail: req.body.sellerMail,
        sellerBankCode: req.body.sellerBankCode,
        sellerBankBranch: req.body.sellerBankBranch,
        sellerBankAccount: req.body.sellerBankAccount,
        sellerID: req.body.sellerID,
        sellerReturnStore: req.body.sellerReturnStore
    });

    //newSellerInfo.save();
    try {
        await newSellerInfo.save({}, function (err, result) {
            res.status(200).send('create success');
        });
    } catch (err) {
        res.status(409).send('create fail');
    }
}

export default createSellerInfo;