const debug = require('debug')('app:controller');
const { Container } = require("typedi");

const courseModel = require('../models/course');
const courseServer = require('../services/courseServer');

// dependence injected
const courseServiceInstance = Container.get(courseServer);

async function createCourse(course) {
  try {
    const result = await courseServiceInstance.createOne(courseModel, course);
    return result;
  } catch (ex) {
    throw ex
  }
}

async function findCourse(query) {
  try {
    const result = await courseServiceInstance.findList(courseModel, query);
    return result;
  } catch (ex) {
    throw ex
  }
}

async function findCourseById(id) {
  try {
    const result = await courseServiceInstance.findById(courseModel, id);
    return result;
  } catch (ex) {
    throw ex
  }
}

async function updateCourseById(id, doc) {
  try {
    const result = await courseServiceInstance.updateById(courseModel, id, doc);
    return result;
  } catch (ex) {
    throw ex;
  }
}

async function updateOneCourse(query, doc) {
  try{
    const result = await courseServiceInstance.updateOne(courseModel, query, doc);
    return result;
  } catch (ex) {
    throw ex;
  }
}

async function deleteCourseById(id) {
  try {
    const result = await courseServiceInstance.deleteById(courseModel, id);
    return result;
  } catch (ex) {
    throw ex
  }
}

async function deleteOneCourse(query) {
  try{
    const result = await courseServiceInstance.deleteOne(courseModel, query);
    return result;
  } catch (ex) {
    throw ex;
  }
}

async function deleteManyCourse(query) {
  try{
    debug(query)
    const result = await courseServiceInstance.deleteMany(courseModel, query);
    return result;
  } catch (ex) {
    throw ex;
  }
}


module.exports = {
  createCourse,
  findCourseById,
  findCourse,
  updateCourseById,
  updateOneCourse,
  deleteCourseById,
  deleteOneCourse,
  deleteManyCourse
}