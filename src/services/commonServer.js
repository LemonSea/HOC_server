const debug = require('debug')('app:server');

const Course = require('../models/course');

class commonServer {
  constructor() { }

  async createOne(model, doc) {
    try {
      const result = await new model(doc).save();
      debug(result)
      return result;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = commonServer;