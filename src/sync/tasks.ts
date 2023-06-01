import { error_msg, success_msg } from '../utils';
import { is_ok } from '../utils/is_ok';

/**
 * 一个同步函数调用,可能成功也可能失败
 */
export function sync_task_no_throw() {
  return is_ok() ? success_msg : error_msg;
}

const mod_name = 'sync task';

export function sync_task_throws_string(id: string) {
  if (is_ok()) {
    return `${mod_name} #${id} ${success_msg}`;
  } else {
    console.warn('throw string');
    throw `${mod_name} #${id} ${error_msg}`;
  }
}

export function sync_task(id: string) {
  if (is_ok()) {
    return `${mod_name} #${id} ${success_msg}`;
  } else {
    const msg = `${mod_name} #${id} ${error_msg}`;
    console.warn('throw Error');
    // Error既是constructor, 也是一个工场函数
    throw Math.random() > 0.5 ? new Error(msg) : Error(msg);

    //! 事实上我们可以throw任何东西
    //! 以下是MDN的相关说明:

    // throw 语句用来抛出一个用户自定义的异常。
    // 当前函数的执行将被停止（throw 之后的语句将不会执行），
    // 并且控制将被传递到调用堆栈中的第一个 catch 块。
    // 如果调用者函数中没有 catch 块，程序将会终止。

    // 所以throw语句其实是一种控制语句
    // 程序包括数据和指令,显然throw就是一种指令,它会影响我们程序的执行过程

    //? 那么既然throw的可以是任何数据,那么Error对象的意义是什么呢?
    // 我们可以通过Error对象的name和message属性来获取错误的类型和错误信息
    // 标准中定义了一些常见的错误类型,比如TypeError, RangeError等等

    // 我们也可以通过继承Error对象来自定义一个错误类
    // 这样我们就可以自定义错误的类型和错误信息了

    //! 可是从本质上来说,这些Error对象只是为了方便后续的处理
    // 一些老版本的浏览器的调试工具有可能只能正常支持Error对象,
    // 对其他类型的throw不能正常打印
    //! 但是归根结底一个Error对象并不会影响当前程序的工作流程
  }
}
