const { Installment } = require('../../models/installment');
const Sales = require('../../models/sales').Sale;
const {
  sendList,
  sendUpdated,
  sendNotFound
} = require('../../helpers/responseHelpers');

const SALES_KEY = 'salesId';

async function takeInstallment(req, res, next) {
  try {
    const salesId = req.params[SALES_KEY];
    const sale = await Sales.findById(salesId);
    if (!sale) return sendNotFound(res);

    const installment = new Installment(req.body);
    installment.sale = salesId;
    installment.shopId = req.user.shop._id;
    if (!installment.receivedBy)
      installment.receivedBy = req.user.publicProfile();

    await installment.save();
    return sendUpdated(res, installment);
  } catch (err) {
    next(err);
  }
}

async function getInstallments(req, res, next) {
  try {
    const installments = await Installment.find({
      sale: req.params.salesId,
      shopId: req.user.shop._id
    });
    return sendList(res, installments);
  } catch (err) {
    next(err);
  }
}

module.exports.handlers = {};
module.exports.handlers.takeInstallment = takeInstallment;
module.exports.handlers.getInstallments = getInstallments;
module.exports.ReqRules = require('./req-rules');
