const debug = require('debug')('app:commonServer');

/**
 * other server will extends this server
 */
class commonServer {
  constructor() { }

  /**
   * 创建一条数据
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

  /**
   * 根据 id 查询
   * 返回查询的数据，Object
   * @param {model} model 文档模型
   * @param {id}} id _id
   */
  async findById(model, id) {
    try {

      const result = await model.findById(id)
      if (!result) return {}
      return result;
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * 查询
   * 返回查询的数据，Array
   * @param {model} model 文档模型
   * @param {object} param1 查询参数
   */
  async findList(model, { sort, select, limit, skip, count, rest }) {
    try {
      if (count.count === true) {
        const result = await model
          .find(rest)
          .skip(skip)
          .limit(limit)
          .sort(sort)
          .select(select)
          .count();
        debug(result)
        return result;
      }
      const result = await model
        .find(rest)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .select(select);
      return result;
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * 根据 id 跟新文档
   * 得到更新后的文档
   * @param {model} model 文档模型
   * @param {id} id _id
   * @param {Object} dec 修改的内容
   */
  async updateById(model, id, dec) {
    try {
      debug(id);
      debug(dec);
      const result = await model.findByIdAndUpdate(id, {
        $set: dec
      }, { new: true })
      return result;
    } catch (ex) {
      throw ex;
    }
  }

  /**
     * 根据条件更新文档
     * 更新查询的第一条记录
     * 得到更新结果
     * @param {model} model 文档模型
     * @param {obj} query 查询参数
     * @param {obj} doc 更新对象
     */
  async updateOne(model, query, doc) {
    try {
      const result = await model.update(query, {
        $set: doc
      })
      return result;
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * 根据条件更新文档
   * 更新查询的所有记录
   * 得到更新结果
   * @param {model} model 文档模型
   * @param {obj} query 查询参数
   * @param {obj} doc 更新对象
   */
  async updateList(model, query, doc) {
    try {
      const result = await model.update(query, {
        $set: doc
      })
      return result;
    } catch (ex) {
      throw ex;
    }
  }

  /**
     * 根据 id 删除文档
     * 得到删除前的文档
     * @param {model} model 文档模型
     * @param {id} id _id
     */
  async deleteById(model, id) {
    try {
      debug(id)
      const result = await model.findByIdAndRemove(id);
      debug(result)
      return result;
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * 根据条件删除文档
   * 更新查询的第一条记录
   * 得到删除结果
   * @param {model} model 文档模型
   * @param {obj} query 查询参数
   */
  async deleteOne(model, query) {
    try {
      const result = await model.deleteOne(query);
      return result;
    } catch (ex) {
      throw ex;
    }
  }

  async deleteMany(model, query) {
    try {
      debug(query)
      const result = await model.deleteMany(query);
      debug(result)
      return result;
    } catch (ex) {
      throw ex;
    }
  }

}

module.exports = commonServer;