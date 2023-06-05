export class Result<Ok, Err> {
  type: 'ok' | 'err';
  value: Ok | Err;

  constructor(type: 'ok' | 'err', value: Ok | Err) {
    this.type = type;
    this.value = value;
  }

  static ok<Ok, Err>(value: Ok): Result<Ok, Err> {
    return new Result<Ok, Err>('ok', value);
  }

  static err<Ok, Err>(value: Err): Result<Ok, Err> {
    return new Result<Ok, Err>('err', value);
  }

  public is_ok(): boolean {
    return this.type === 'ok';
  }

  public is_err(): boolean {
    return this.type === 'err';
  }

  public unwrap(): Ok {
    if (this.is_ok()) return this.value as Ok;
    else
      throw new Error(
        'called `Result.unwrap()` on an `Err` value: ' + this.value
      );
  }

  public unwrap_err(): Err {
    if (this.is_err()) return this.value as Err;
    else
      throw new Error(
        'called `Result.unwrap_err()` on an `Ok` value: ' + this.value
      );
  }

  public and<NewOk>(
    action_on_ok: (value: Ok) => Result<NewOk, Err>
  ): Result<NewOk, Err>;
  public and<NewOk>(ok_value: Ok): Result<NewOk, Err>;
  public and(callback_or_ok_value: any): any {
    if (this.is_ok())
      return typeof callback_or_ok_value === 'function'
        ? callback_or_ok_value(this.value as Ok)
        : Result.ok(callback_or_ok_value as Ok);
    else return Result.err(this.value as Err);
  }

  public or<NewErr>(
    action_on_err: (value: Err) => Result<Ok, NewErr>
  ): Result<Ok, NewErr>;
  public or<NewErr>(err_value: Err): Result<Ok, NewErr>;
  public or(callback_or_err_value: any): any {
    if (this.is_err())
      return typeof callback_or_err_value === 'function'
        ? callback_or_err_value(this.value as Err)
        : Result.err(callback_or_err_value as Err);
    else return Result.ok(this.value as Ok);
  }
}

