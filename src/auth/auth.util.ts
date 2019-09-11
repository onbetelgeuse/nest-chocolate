import * as bcrypt from 'bcrypt';
import { isNumber, isString } from '../common/common.util';
import * as ms from 'ms';

const BCRYPT_SALT_ROUNDS = 16;

export class AuthUtil {
  public static generatePassword(password: string): string {
    return bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);
  }

  public static verifyPassword(enteredPassword: string, userHash: string) {
    return bcrypt.compareSync(enteredPassword, userHash);
  }

  public static toIntervalNumber(value: string | number): number | undefined {
    let interval;

    if (isNumber(value)) {
      return value;
    }
    if (isString(value)) {
      interval = parseInt(value, 10);
      if (isNaN(interval)) {
        interval = ms(value) / 1000;
      }
      return interval;
    }
    return undefined;
  }
}
