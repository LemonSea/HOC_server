const debug = require('debug')('app:controller');
const { Container } = require("typedi");

const courseModel = require('../models/course');
const courseServer = require('../services/courseServer');

async function createCourse(course) {
  try {
    const courseServiceInstance = Container.get(courseServer);
    const result = await courseServiceInstance.createCourse(courseModel, course);
    debug(result);
    return result;
  } catch (ex) {
    throw ex
  }
}

module.exports = {
  createCourse
}