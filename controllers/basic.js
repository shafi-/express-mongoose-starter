const {
  sendList,
  sendOne,
  sendCreated,
  sendUpdated,
  sendDeleted,
  sendNotFound
} = require('../helpers/responseHelpers');
const helper = require('../helpers/controllerHelpers');

/**
 * Generate basic CRUD operations for provided Model
 * @param {import('mongoose').Model} Model
 */
function basicCRUD(Model, paramKey = 'id') {
  async function list(req, res, next) {
    try {
      const filters = helper.getFilters(req);
      const models = await Model.find(filters);
      sendList(res, models);
    } catch (err) {
      next(err);
    }
  }

  async function byId(req, res, next) {
    try {
      const model = await Model.findById(req.params[paramKey]);

      if (model) return sendOne(res, model);
      else return sendNotFound(res);
    } catch (err) {
      next(err);
    }
  }

  async function add(req, res, next) {
    try {
      const model = new Model(req.body);
      await model.save();
      return sendCreated(res, model);
    } catch (err) {
      next(err);
    }
  }

  async function update(req, res, next) {
    try {
      const model = await Model.findById(req.params[paramKey]);
      if (!model) sendNotFound(res);

      Object.assign(model, req.body);
      await model.save();

      return sendUpdated(res, model);
    } catch (err) {
      next(err);
    }
  }

  async function remove(req, res, next) {
    try {
      const model = await Model.findById(req.params[paramKey]);
      if (!model) sendNotFound(res);

      await model.remove();
      sendDeleted(res, model);
    } catch (err) {
      next(err);
    }
  }

  return {
    list,
    byId,
    add,
    update,
    remove
  };
}

module.exports = basicCRUD;
