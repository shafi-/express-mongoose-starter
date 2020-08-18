const { Sale } = require('../../models/sales');
const { Product } = require('../../models/product');
const { Installment } = require('../../models/installment');
const Util = require('../../helpers/controllerHelpers');

async function index(req, res, next) {
  try {
    const { start, end } = Util.getTimeRange(req);
    const [sales, installments, products] = await Promise.all([
      getSalesData(req, start, end),
      getInstallmentData(req, start, end),
      getProductCount(req)
    ]);
    return res.json({ sales, installments, products });
  } catch (err) {
    next(err);
  }
}

function getProductCount(req) {
  return Product.countDocuments({ shopId: req.user.shopId });
}

function getInstallmentData(req, start, end) {
  return Installment.find({
    shopId: req.user.shop._id,
    date: { $gte: start, $lte: end }
  });
}

function getSalesData(req, start, end) {
  return Sale.find({
    shopId: req.user.shop._id,
    salesDate: { $gte: start, $lte: end }
  }).select(
    '_id shopId installment installmentPaid subTotal total otherCharges.amount salesDate'
  );
}

module.exports = { index };
