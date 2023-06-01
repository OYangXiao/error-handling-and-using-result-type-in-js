import { error_msg, success_msg } from '../utils';
import { is_ok } from '../utils/is_ok';

export function callback_task(
  callback: (error: string | null, result?: string) => void
) {
  setTimeout(() => {
    if (is_ok()) callback(error_msg);
    else callback(null, success_msg);
  }, 0);
}

// 为了方便展示,我们制造一个promise任务生成器
export const promise_task = (id: string) =>
  new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (is_ok()) reject(`promise ${id} --- ${error_msg}`);
      else resolve(`promise ${id} --- ${success_msg}`);
    }, 0);
  });

export const promise_error = (id: string) =>
  new Promise<string>((_, reject) => {
    setTimeout(() => {
      reject(new Error(`promise error ${id} --- ${error_msg}`));
      //   console.warn('I PRINT BEFORE REJECT')
    }, 0);
  });

export const promise_success = (id: string) =>
  new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`promise success ${id} --- ${success_msg}`);
    }, 0);
  });

export const promise_throw = (id: string) =>
  new Promise<string>(() => {
    throw new Error(`promise throw ${id} --- ${error_msg}`);
      console.warn('I PRINT AFTER REJECT')
  });

export const promise_throw_in_async_func = (id: string) =>
  new Promise<string>(() => {
    setTimeout(() => {
      throw new Error(`promise throw ${id} --- ${error_msg}`);
    }, 0);
  });
