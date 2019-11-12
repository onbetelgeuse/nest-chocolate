import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { mock, instance, when, verify, anything, deepEqual } from 'ts-mockito';
import { Logger } from '@nestjs/common';

class UserRepository extends Repository<User> {}

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;
  let logger: Logger;

  beforeEach(async () => {
    repository = mock(UserRepository);
    logger = mock(Logger);
    service = new UserService(instance(repository), instance(logger));
  });

  describe('A) Normal case', () => {
    it('1) Should be defined', () => {
      expect(service).toBeDefined();
    });

    it('2) When findOneById is called', async () => {
      // prepare
      const userId = 2;
      const user: User = new User();
      user.id = userId;
      user.username = 'username' + userId;
      user.firstName = 'firstName' + userId;
      user.lastName = 'lastName' + userId;

      when(
        repository.findOne(userId, deepEqual({ relations: ['roles'] })),
      ).thenResolve(user);
      // execute
      const result: User = await service.findOneById(userId);
      // verify
      verify(
        repository.findOne(anything(), deepEqual({ relations: ['roles'] })),
      ).once();
      expect(result).toBeTruthy();
      expect(result.id).toBe(userId);
      expect(result).toStrictEqual(user);
    });

    it('3) When findOneByUsername is called', async () => {
      // prepare
      const userId = 1;
      const user: User = new User();
      user.id = userId;
      user.username = 'username' + userId;
      user.firstName = 'firstName' + userId;
      user.lastName = 'lastName' + userId;
      const username: string = user.username;

      when(
        repository.findOne(anything(), deepEqual({ relations: ['roles'] })),
      ).thenResolve(user);
      // execute
      const result: User = await service.findOneByUsername(username);
      // verify
      verify(
        repository.findOne(anything(), deepEqual({ relations: ['roles'] })),
      ).once();
      expect(result).toBeTruthy();
      expect(result.username).toBe(username);
      expect(result).toStrictEqual(user);
    });
  });
});
