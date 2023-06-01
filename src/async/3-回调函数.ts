import { handled_error, print_success } from '../utils/print';
import { callback_task } from './tasks';

/**
 * 相比较同步函数
 * 异步函数的错误处理最基本的方案就是回调函数
 * 以下是一个典型的node风格的回调函数
 * error-first callback
 */
callback_task((error, result) => {
  if (error) print_success(result);
  else handled_error(error);
});

//! 但是很明显的问题是
//! callback导致代码层层嵌套
// https://www.google.com/search?q=js+callback+hell&newwindow=1&c2coff=1&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj38tOU9Y3_AhUEsFYBHf-CCpcQ_AUoAXoECAEQAw&biw=1440&bih=796&dpr=2#imgrc=henKq01jwSrCCM

//! 我们无法catch住异步代码中的exception
//! 因为try catch执行的时机早于异步代码的执行时机