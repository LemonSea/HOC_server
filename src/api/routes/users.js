const route = require('express').Router();
const debug = require('debug')('app:route');
// const { celebrate, Joi, errors, Segments } = require('celebrate');
const Joi = require('@hapi/joi');

const userController = require('../../controllers/userController');
const processGet = require('../tools/processGet');
const { loginUpValidate } = require('../../validations/user');

const userModel = require('../../models/user');

module.exports = (app) => {

  app.use('/users', route);

  route.post('/',
    async (req, res, next) => {
      try {
        const { error } = loginUpValidate(req.body);
        if (error) return res.status(400).send(error.details[0].message)

        const result = await userController.logUp(req.body);
        if(!result) return res.status(400).send('User already registered.')

        res.status(201).json(result)
      } catch (e) {
        throw e;
      }
    })
}


