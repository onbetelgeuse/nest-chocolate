import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { ConfigService } from '../config/config.service';
import { mock, instance, when } from 'ts-mockito';
import { UserDto } from '../user/dto/user.dto';
import { AccessToken } from './interfaces/access-token.interface';
import * as jwt from 'jsonwebtoken';

const privatekey: string =
  '-----BEGIN RSA PRIVATE KEY-----\n' +
  'MIICXgIBAAKBgQCkW5FYi1uuyt8D74P/xnDnrFWoEWzYAyM+2l8g9xsjzYURtvbN\n' +
  'YHRSZrQomSMmjTIbqKULS/ZGTxpbR7g+YJCz7mjYELHRkpI0j8ASzDwiMVurW6Et\n' +
  '+eT64QHoex2IAeC4nBSgQI7oTd45mC7X79O/HbujMMlQrEHZbwtySAKMoQIDAQAB\n' +
  'AoGBAJDwdzKAYq+4FAdidyNeGj8TyM3X4AZ2beSFqpJll7dxDEJc+TSQNMRd8c5D\n' +
  'ja33ohKmHDXkHSBPrcyFaMMJYVEAn1rJLGqtnPVWgOlYI0rDTmYNgpBrhYSoN5q2\n' +
  'xnl2MlqQSZ+TP1p8LUfYiUjHvfVNp11xiZL3GyZqmm7OxLQpAkEA3lBLNvEROxRj\n' +
  'sHSPraDLRhQkNG0RJnpIHbYGtzLDpJEKK/o18n2TGWDKikcePrmsMjPwdA20hIRB\n' +
  'W/by7wEjMwJBAL1DHtz2pD/kfziDbB3nc9dZqk5m8jajcJG4UkhNLB5lJL0kAp1g\n' +
  '8QLhXSId1KLxGuLT2IIbphMJV06eNITQ0NsCQBvGdF885yY2ee4F4h2TRVJQGeXi\n' +
  '6o2gIXp0z4n78a2R4W91J2BQiBxXl3aHRCQaFoV/L7+QJsmXrILM67UoszkCQQCm\n' +
  'osA7wJThBGfW9C9vLOfbhcDjAtTjsodcZbNcoUXlBRyRw3Dh7AaHiLEdZrJfPHV1\n' +
  'nRwVgg542FKcj8Kh5dDdAkEA0fe1YL/lzvvIq/qCjvQMfc1HuJCbNItvrh7O51+6\n' +
  'egVMfyUolDOj+iVx0mKxAgC4C34Vi4irueMsKWSGvlc2fA==\n' +
  '-----END RSA PRIVATE KEY-----';

const publickey: string =
  '-----BEGIN PUBLIC KEY-----\n' +
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCkW5FYi1uuyt8D74P/xnDnrFWo\n' +
  'EWzYAyM+2l8g9xsjzYURtvbNYHRSZrQomSMmjTIbqKULS/ZGTxpbR7g+YJCz7mjY\n' +
  'ELHRkpI0j8ASzDwiMVurW6Et+eT64QHoex2IAeC4nBSgQI7oTd45mC7X79O/Hbuj\n' +
  'MMlQrEHZbwtySAKMoQIDAQAB\n' +
  '-----END PUBLIC KEY-----';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let configService: ConfigService;

  beforeEach(async () => {
    userService = mock(UserService);
    configService = mock(ConfigService);
    service = new AuthService(instance(configService), instance(userService));
  });
  describe('AuthService', () => {
    it('1) Should be defined', () => {
      // verify
      expect(service).toBeDefined();
    });

    it('When login is called', async () => {
      // prepare
      const expiresIn = 3600;
      const iss = 'http://call-me';
      const aud = 'http://myserver';

      when(configService.jwtPrivateKey).thenReturn(privatekey);
      when(configService.jwtExpire).thenReturn(expiresIn);
      when(configService.jwtAudience).thenReturn(aud);
      when(configService.jwtIssuer).thenReturn(iss);
      const user: UserDto = new UserDto(
        1,
        'username',
        'firstName',
        'lastName',
        'username@email.com',
        [],
      );
      // execute
      const result: AccessToken = await service.login(user);
      const verifyOptions = {
        issuer: iss,
        audience: aud,
        expiresIn,
        algorithm: ['RS256'],
      };
      const userVerified = jwt.verify(
        result.token,
        publickey,
        verifyOptions,
      ) as {
        id: number;
        username: string;
        aud: string;
        iss: string;
        email: string;
        roles: string[];
      };
      // verify
      expect(service).toBeDefined();
      expect(result.expiresIn).toBe(expiresIn);
      expect(result.token).toBeDefined();
      expect(userVerified).toBeDefined();
      expect(userVerified.id).toBe(user.id);
      expect(userVerified.username).toBe(user.username);
      expect(userVerified.aud).toBe(aud);
      expect(userVerified.iss).toBe(iss);
      expect(userVerified.email).toBe(user.email);
      expect(userVerified.roles).toStrictEqual(user.roles);
    });
  });
});
