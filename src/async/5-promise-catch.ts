import { final_print, handled_error, print_success } from '../utils/print';
import {
  promise_error,
  promise_task,
  promise_throw_in_async_func,
  promise_throw,
} from './tasks';

await promise_task('5.1')
  // then的第二个参数是fail,一个错误处理函数
  .then(print_success, handled_error)
  // 通过then的fail参数可以保持链式调用的继续
  .finally(final_print);


await promise_task('5.2')
  // 如果不使用fail参数
  .then((result) => {
    print_success(result);
    return promise_error('5.3');
  })
  // 我们也可以使用catch方法来处理错误
  // 在这个例子中,不管是5.2还是5.3的exception都会被这个catch捕获
  .catch(handled_error)
  .finally(final_print);

/**
 * ? 那么问题来了,我们到底应该用fail参数还是应该用catch方法呢?
 *
 * 著名的bluebird库的作者认为:
 * https://github.com/petkaantonov/bluebird/wiki/Promise-anti-patterns#the-thensuccess-fail-anti-pattern
 * 使用then方法的fail参数是一个anti-pattern
 *
 * 这里用上一个例子略作改造说明可能会更清晰一些
 */
await promise_task('5.4')
  // 如果不使用fail参数
  .then(
    (result) => {
      print_success(result);
      return JSON.parse(result);
    },
    (err) => {
      return handled_error(err);
    }
  )
  .finally(final_print)
  //! 虽然5.4的exception被5.4的fail捕获了
  //! 但是在拿到5.4的结果之后,我们常常会做更多的处理
  //! 这种处理的过程也有可能会抛出异常
  //! 因此统一增加catch的处理会保证这里面的其他异常也能被捕获
  .catch(handled_error);

// 另外还有一个很特别的点就是
//? promise中应该reject还是throw呢?
await promise_throw('5.5')
  .then(print_success)
  .catch(handled_error)
  .finally(final_print);
// 当我们直接在promise中throw的时候,这个promise的表现和被reject没什么区别
//! 需要注意的是reject只是一个特殊的回调函数,它本身并不终止代码的执行

//? 但是如果我们在promise中的异步函数里面throw呢?
await promise_throw_in_async_func('5.6')
  .then(print_success)
  .catch(handled_error)
  .finally(final_print);
// 可见在promise中的异步函数中throw会导致代码停止执行
// 后续的所有catch都无法捕获这个异常
