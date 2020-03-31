/**
 * 生成 [n,m] 的随机整数
 */
function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
}

/**
 * 获得一个6位数的数据整数
 */
function randomNumBySix() {
  return parseInt(Math.random() * (100000 - 10000 + 1) + 10000, 10)
}

module.exports = {
  randomNum,
  randomNumBySix
};
