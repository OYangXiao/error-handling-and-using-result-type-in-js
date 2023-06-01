export function print_new_line() {
  console.log('\n');
}

export function print_success(result?: string) {
  console.log('print_success', result);
  return result;
}

export function handled_error(err: any) {
  console.error('HANDLED ERROR:', err);
  console.log('typeof err', typeof err);
  return 'error handled: ' + err;
}

export function final_print(result?: string) {
  console.log('final_print', result, '\n\n');
}
