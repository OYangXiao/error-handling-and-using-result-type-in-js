import { promise_task } from '../utils/promise';

const mod_name = 'await w/o catch';

async function async_task() {
  const result = await promise_task();
  // const result = await promise_task().catch(
  //   (error) => 'promise return error: ' + error
  // );

  console.log(mod_name, 'result', result);
}

try {
  async_task();
} catch (e) {
  console.log(mod_name, 'error', e, typeof e);
}
