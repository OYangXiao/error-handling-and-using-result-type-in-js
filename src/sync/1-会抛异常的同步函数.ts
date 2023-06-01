import { handled_error, print_success } from '../utils/print';
import { sync_task, sync_task_throws_string} from './tasks';

/**
 * 调用一个可能会抛出异常的函数
 * 注意观察，如果函数抛出异常，else部分的代码并不会被执行
 */

const res = sync_task('1.1');
// const res = sync_task_throws_string('1.2');

res.includes('success')
  ? print_success(res)
  : //! 如果之前的代码中throw了,那么这里的代码永远不会被执行到
    handled_error(res);


// 我们可以观察同样throw string和Error的情况下在浏览器和node中的表现