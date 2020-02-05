const debug = require('debug')('app:controller');
const { Container } = require("typedi");

const courseModel = require('../models/course');
const courseServer = require('../services/courseServer');

// dependence injected
const courseServiceInstance = Container.get(courseServer);

async function createCourse(course) {
  try {
    const result = await courseServiceInstance.createCourse(courseModel, course);
    return result;
  } catch (ex) {
    throw ex
  }
}

module.exports = {
  createCourse
}