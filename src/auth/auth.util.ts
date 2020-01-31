import * as bcrypt from 'bcrypt';
import { uuid } from 'uuidv4';

const BCRYPT_SALT_ROUNDS = 16;

export class AuthUtil {
  public static generatePassword(password: string): string {
    return bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);
  }

  public static verifyPassword(enteredPassword: string, userHash: string) {
    return bcrypt.compareSync(enteredPassword, userHash);
  }

  public static jitGenerate(): string {
    return uuid();
  }
}
