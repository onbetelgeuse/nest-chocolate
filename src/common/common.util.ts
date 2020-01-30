import * as ms from 'ms';

export class Utils {
  public static isString(value: any): value is string {
    return typeof value === 'string';
  }

  public static isNumber(value: any): value is number {
    return typeof value === 'number';
  }

  public static toSeconds(value: string | number): number | undefined {
    return Utils.isNumber(value)
      ? value
      : isNaN(Number(value))
      ? ms(value) / 1000
      : Number(value);
  }
}
