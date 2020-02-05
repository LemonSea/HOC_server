const debug = require('debug')('app:server');

/**
 * other server will extends this server
 */
class commonServer {
  constructor() { }

  /**
   * 增加一条数据
   * 返回增加的内容
   * @param {model} model 文档模型
   * @param {object} doc 文档内容
   */
  async createOne(model, doc) {
    try {
      const result = await new model(doc).save();
      return result;
    } catch (e) {
      throw e;
    }
  }

  async createList() {

  }

  async findById() {

  }

  async findOne() {

  }

  async findList() {

  }

  async updateById() {

  }

  async updateOne() {

  }

  async updateList() {

  }

  async deleteById() {
    
  }

  async deleteOne() {

  }

  async deleteList() {

  }

}

module.exports = commonServer;