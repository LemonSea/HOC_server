const debug = require('debug')('app:server-companyAuditRecord');
const companyAuditRecordModel = require('../models/companyAuditRecord');
const commonServer = require('./commonServer');

class companyAuditRecordServer extends commonServer {
  constructor() {
    super();
  }
}

module.exports = companyAuditRecordServer;