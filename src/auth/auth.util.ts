import * as bcrypt from 'bcrypt';
import { isNumber, isString } from '../common/common.util';
import * as ms from 'ms';
import * as uuid from 'uuid';

const BCRYPT_SALT_ROUNDS = 16;

export class AuthUtil {
  public static generatePassword(password: string): string {
    return bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);
  }

  public static verifyPassword(enteredPassword: string, userHash: string) {
    return bcrypt.compareSync(enteredPassword, userHash);
  }

  public static toIntervalNumber(value: string | number): number | undefined {
    let interval: number;
    const pattern = /^\d+$/;

    if (isNumber(value)) {
      interval = value;
    } else if (isString(value)) {
      if (pattern.test(value)) {
        interval = parseInt(value, 10);
      } else {
        interval = ms(value) / 1000;
      }
    }
    return interval;
  }

  public static jitGenerate(): string {
    return uuid.v1();
  }
}
