// promise依然没有解决回调地狱的问题
// 为了解决这个问题,我们引入了async/await

import { promise_task } from './tasks';

try {
  const res1 = await promise_task('6.1');
} catch (e) {
  console.log('res1 error', e);
}
