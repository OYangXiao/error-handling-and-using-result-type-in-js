import { handled_error, print_success } from '../utils/print';
import { sync_task } from './tasks';

/**
 * 调用一个可能会抛出异常的函数
 * 但是我们用try catch保护它
 */
try {
  const res = sync_task('2.1');
  print_success(res);
} catch (e) {
  handled_error(e);
}

//! 但是很多人不喜欢try catch, 因为try的代码会创造一个scope
// 在使用var的时候这不是问题
// 但是用let和const的时候就会有问题

try {
  var res2 = sync_task('2.2');
} catch (e) {
  handled_error(e);
}
// 虽然在ts中这里报错了,但其实没问题的
// 因为var声明的变量是在js文件parse的时候就已经声明了
print_success(res2);

// 如果希望使用let和const,我们可以这样做
let res3;
try {
  res2 = sync_task('2.3');
} catch (e) {
  handled_error(e);
}
print_success(res3);

//! try catch可以捕获多层函数的throw
//! 类似react的ErrorBoundary就是这么处理的
try {
  (function () {
    sync_task('2.4');
    throw Error('error from 2.4');
  })();
} catch (e) {
  handled_error(e);
}
