import { promise_task } from "./tasks";


// 最简单的使用方式,直接调用then
promise_task('4.1').then(console.log);

// 我们也可以在then中返回下一个promise来完成链式调用
promise_task('4.2')
  .then((result) => {
    console.log(result);
    return promise_task('4.3');
  })
  // 这里then的就是上一个promise_gen(3)的结果
  .then(console.log);
