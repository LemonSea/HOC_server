const debug = require('debug')('app:controller-companyAuditRecord');
const { Container } = require("typedi");
const _ = require('lodash');

const companyAuditRecordModel = require('../models/companyAuditRecord');
const companyAuditRecordServer = require('../services/companyAuditRecordServer');

// dependence injected
const companyAuditRecordServiceInstance = Container.get(companyAuditRecordServer);

async function addCompanyAuditRecord(data) {
  try {
    const record = await companyAuditRecordServiceInstance.createOne(companyAuditRecordModel, data);
    return record;
  } catch (ex) {
    throw ex
  }
}


module.exports = {
  addCompanyAuditRecord
}