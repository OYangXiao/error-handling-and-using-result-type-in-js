export function print_new_line() {
  console.log('\n');
}

export function print_success(result?: string) {
  console.log('print success', result);
  return result;
}

export function handled_error(err: any) {
  console.error('handle_error function, error is:', err);
  return 'error handled: ' + err;
}

export function final_print(result?: string) {
  console.log('final print', result, '\n\n');
}
