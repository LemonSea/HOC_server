const debug = require('debug');

function getProcess(query) {
  ({ sort=null, select=null, offset=null, limit=null, count=false, ...rest } = query);

  sortProcess(sort);
  selectProcess(sort);
  skipProcess(offset, limit);
  limitProcess(limit);
  countProcess(count);
  restProcess(rest);
}

function sortProcess(sort) {
  console.dir(sort);
}

function selectProcess(select) {
  console.dir(select);
}

function limitProcess(limit) {
  console.dir(limit);
}

function skipProcess(offset, limit) {
  console.dir(offset);
  console.dir(limit);
}

function countProcess(count) {
  console.dir(count);
}

function restProcess(rest) {
  console.dir(rest);
  for (key in rest) {
    console.dir(key)
    console.dir(rest[key])
  }
}

module.exports = getProcess;