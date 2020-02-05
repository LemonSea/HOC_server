const debug = require('debug');

function getProcess(query) {
  ({ sort=null, select=null, offset=null, limit=null, count=false, ...rest } = query);

  const sortObj = sortProcess(sort);
  const selectObj = selectProcess(select);
  const skipNum = skipProcess(offset, limit);
  const limitNum = limitProcess(limit);
  const countObj = countProcess(count);
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
  return parseInt(data);
}

function skipProcess(pageNumber, pageSize) {
  if (parseInt(pageNumber) <= 0) return parseInt(0);
  return skip = (parseInt(pageNumber) - 1) * parseInt(pageSize);
}

function countProcess(count) {
  return { count: Boolean(count) }
}

function restProcess(data) {
  // { price: { $gte: 10, $lte: 20 }}
  // {author: 'Mosh'}
  console.log(data)
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

module.exports = getProcess;