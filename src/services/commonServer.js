const debug = require('debug')('app:commonServer');

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

  async findById(model, id) {
    const result = await model.findById(id)
    return result;
  }

  async findList(model, { sort, select, limit, skip, count, rest }) {
    if (count.count === true) {
      const result = await model
        .find(rest)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .select(select)
        .count();
      return result;
    }
    const result = await model
      .find(rest)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(select);
    return result;
  }

  async count(model, query) {
    ({ query, skip, limit, sort, select } = query);
    const result = await model
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(select)
      .count();
    return result;
  }

  async updateById() {

  }

  async updateOne() {

  }

  async updateList() {

  }

  async deleteById(model, id) {
    const result = await model.deleteOne({ _id: id });
    return result;
  }

  async deleteOne() {

  }

  async deleteList() {

  }

}

module.exports = commonServer;