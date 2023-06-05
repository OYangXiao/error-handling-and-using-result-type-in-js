// promise依然没有解决回调地狱的问题
// 为了解决这个问题,我们引入了async/await

import { promise_task } from './tasks';

try {
  const res1 = await promise_task('6.1');
  console.log(res1);
} catch (e) {
  console.log('res1 error', e);
}

// 当然我们也可以使用promise的catch方法
const res2 = await promise_task('6.2').catch((e) => {
  console.log('res2 error', e);
  // 可是我们有办法在这里把控制权返回给上层吗?
  // throw?
  // return?
});
console.log(res2);

// try catch 能够生效的原因是await会把promise变成同步的写法
// 但是我们又要面临一样的问题,try catch会创造一个scope
// 但是我们又不想用var,因为var会污染全局变量

// 但是这样写起来太麻烦了,我们可以把它封装成一个函数
async function await_task() {
  try {
    const res3 = await promise_task('6.3');
    return res3;
  } catch (e) {
    return 'res3 error: ' + e;
  }
}
const res = await await_task();
console.log(res);

