import { sync_task } from '../sync/tasks';
import { handled_error, print_success } from '../utils/print';
import { callback_task } from './tasks';

/**
 * 相比较同步函数
 * 异步函数的错误处理最基本的方案就是回调函数
 * 以下是一个典型的node风格的回调函数
 * error-first callback
 */
try {
  callback_task((error, result) => {
    if (error) handled_error(error);
    else print_success(result);
  });
} catch (e) {
  console.log('hi', e);
}

//! 但是很明显的问题是
//! callback导致代码层层嵌套
// https://www.google.com/search?q=js+callback+hell&newwindow=1&c2coff=1&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj38tOU9Y3_AhUEsFYBHf-CCpcQ_AUoAXoECAEQAw&biw=1440&bih=796&dpr=2#imgrc=henKq01jwSrCCM

//! 我们无法catch住异步代码中的exception
//! 因为try catch执行的时机早于异步代码的执行时机

// window.onerror = function (message, file, lineNumber) {
//   // check if the error is from the callback
// };

// 但是我们可以在回调函数中处理错误
export function callback_task_with_try_catch(
  callback: (error: string | null, result?: string) => void
) {
  setTimeout(() => {
    let res;
    try {
      res = sync_task('3.1');
      callback(null, res);
    } catch (e) {
      callback((e as any).message, res);
    }
  }, 0);
}

// callback_task_with_try_catch((error, result) => {
//   if (error) print_success(result);
//   else handled_error(error);
// })
