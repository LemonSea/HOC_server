const debug = require('debug')('app:controller-orderComments');
const { Container } = require("typedi");
const bcrypt = require('bcrypt');
const _ = require('lodash');

const orderCommentsModel = require('../models/orderComments');
const orderCommentsServer = require('../services/orderCommentsServer');
// dependence injected
const orderCommentsServiceInstance = Container.get(orderCommentsServer);
// staff 
const staffModel = require('../models/staff');
const staffServer = require('../services/staffServer');
const staffServiceInstance = Container.get(staffServer);
// order
const orderModel = require('../models/order');
const orderServer = require('../services/orderServer');
const orderServiceInstance = Container.get(orderServer);


// 计对应增加订单数量属性
function orderScore(satisfaction) {
  switch (satisfaction) {
    case 1:
      return { oneStarOrders: 1 };
    case 2:
      return { twoStarOrders: 1 };
    case 3:
      return { threeStarOrders: 1 };
    case 4:
      return { fourStarOrders: 1 };
    case 5:
      return { fiveStarOrders: 1 };
    default:
      return { fiveStarOrders: 1 };
  }
}

// 星级核算
function starInternational(staff) {
  let count = staff.oneStarOrders + staff.twoStarOrders + staff.threeStarOrders + staff.fourStarOrders + staff.fiveStarOrders;
  let SatisfiedAccountedForOrder = (staff.threeStarOrders + staff.fourStarOrders + staff.fiveStarOrders) / count;
  let goodAccountedForOrder = (staff.fourStarOrders + staff.fiveStarOrders) / count
  let highPraiseAccountedForOrder = staff.fiveStarOrders / count

  if (count > 10 && count <= 50 && SatisfiedAccountedForOrder > 1 / 2) {
    return { star: 2 }
  } else if (count > 50 && count <= 100 && goodAccountedForOrder > 1 / 3) {
    return { star: 3 }
  } else if (count > 100 && count <= 200 && goodAccountedForOrder > 1 / 4) {
    return { star: 4 }
  } else if (count > 200 && highPraiseAccountedForOrder > 1 / 4) {
    return { star: 2 }
  } else {
    return { star: 1 }
  }
}

// 添加评论
async function addOrderComments(data) {
  try {

    data.status === 0;
    const record = await orderCommentsServiceInstance.createOne(orderCommentsModel, data);

    if (record) {
      // 对应星级订单数量修改
      let starOrder = orderScore(data.satisfaction);
      const staff = await staffModel.findByIdAndUpdate(data.staff, { $inc: starOrder }, { new: true })

      // 星级核算
      let star = starInternational(staff)
      // 对应员工星级修改
      const staffRecord = await staffServiceInstance.updateById(staffModel, data.staff, star)

      // 对应订单状态修改
      const orderRecord = await orderServiceInstance.updateById(orderModel, data.order, { status: 3 });
    }

    return record;
  } catch (ex) {
    throw ex
  }
}

module.exports = {
  addOrderComments,
}
