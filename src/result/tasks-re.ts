import { is_ok } from '../utils/is_ok';
import { Result } from './result';

export function sync_task() {
  return is_ok() ? Result.ok('sync_task') : Result.err('sync_task');
}

export function async_task() {
  return new Promise<Result<string, string>>((resolve) => {
    setTimeout(() => {
      if (is_ok()) resolve(Result.ok('async_task'));
      else resolve(Result.err('async_task'));
    }, 0);
  });
}

const res1 = sync_task();
if (res1.is_ok()) console.log(res1.unwrap());
else console.log(res1.unwrap_err());

const res2 = await async_task();
if (res2.is_ok()) console.log(res2.unwrap());
else console.log(res2.unwrap_err());

