const debug = require('debug')('app:processGet');

function processGet(query) {
  ({ sort=null, select=null, offset=null, limit=null, count=false, ...rest } = query);

  // 排序
  const sortObj = sortProcess(sort);
  // 选择
  const selectObj = selectProcess(select);
  // 分页
  const skipNum = skipProcess(offset, limit);
  // 限制
  const limitNum = limitProcess(limit);
  // 总数
  const countObj = countProcess(count);
  // 查询内容
  const restObj = restProcess(rest);
  return {
    sort: sortObj,
    select: selectObj,
    limit: limitNum,
    skip: skipNum,
    count: countObj,
    rest: restObj
  }
}

function sortProcess(data) {

  if (data !== null) {
    let sortArr = data.split(',');
    let sort = {};
    sortArr.forEach(str => {
      if (str.match(/^\+/g)) {
        sort[str.slice(1)] = 1;
      }
      if (str.match(/^\-/g)) {
        sort[str.slice(1)] = -1;
      }
    });
    return sort;
  }
  return {};
}

function selectProcess(data) {
  if (data !== null) {
    let selectArr = data.split(',');
    let select = {};
    selectArr.forEach(str => {
      select[str] = 1;
    });
    return select;
  }
  return {}
}

function limitProcess(data) {
  if (data === null) return parseInt(0);
  return parseInt(data);
}

function skipProcess(offset, limit) {
  if (offset === null) return parseInt(0);
  if (parseInt(offset) <= 0) return parseInt(0);
  return skip = (parseInt(offset) - 1) * parseInt(limit);
}

function countProcess(count) {
  return { count: Boolean(count) }
}

function restProcess(data) {
  // { price: { $gte: 10, $lte: 20 }}
  // {author: 'Mosh'}
  let rest = {};
  let option = {};
  let arr = [];
  for (key in data) {
    if (Array.isArray(data[key])) {
      if (data[key][0].slice(0, 1) !== '$') {
        rest[key] = data[key]
      } else {
        data[key].forEach(str => {
          arr = str.split(':');
          operatorMatching(arr, option);
        });
        rest[key] = option;
      }
    } else {
      if (data[key][0].slice(0, 1) !== '$') {
        rest[key] = data[key]
      } else {
        arr = data[key].split(':');
        operatorMatching(arr, option);
        rest[key] = option;
      }
    }
  }
  return rest;
}

function operatorMatching(arr, option) {
  switch (arr[0]) {
    case '$ge':
      option['$ge'] = Number(arr[1]);
      break;
    case '$gte':
      option['$gte'] = Number(arr[1]);
      break;
    case '$lt':
      option['$lt'] = Number(arr[1]);
      break;
    case '$lte':
      option['$lte'] = Number(arr[1]);
      break;
    default:
      break;
  }
}

module.exports = processGet;