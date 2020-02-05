const debug = require('debug')('app:server');
const commonServer = require('./commonServer');

const Course = require('../models/course');

class courseServer extends commonServer {
  constructor() { 
    super();
  }

  async createCourse(courseModel, course) {
    try {
      // const result = await new courseModel(course).save();
      const result = await this.createOne(courseModel, course);
      debug(result)
      return result;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = courseServer;