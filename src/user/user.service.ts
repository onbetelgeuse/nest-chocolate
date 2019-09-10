import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';
import { CreateUserDto } from './../auth/dto/create.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly logger: Logger,
  ) {}

  public async findOneById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne(id);
  }

  public async findOneByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ username });
  }

  public async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email });
  }

  public async findOneByExternalId(
    externalId: string,
  ): Promise<User | undefined> {
    return this.userRepository.findOne({ externalId });
  }

  // public async createfromExternal(
  //   profileUserDto: ProfileUserDto,
  // ): Promise<User> {
  //   const newUser = this.userRepository.create();
  //   newUser.username = profileUserDto.username;
  //   newUser.email = profileUserDto.email;
  //   newUser.firstName = profileUserDto.firstName;
  //   newUser.lastName = profileUserDto.lastName;
  //   newUser.setPassword(`==|&|#|${profileUserDto.id}|$|@|==#external`);
  //   newUser.externalId = profileUserDto.id;
  //   newUser.isSuperAdmin = false;

  //   return await this.userRepository.save(newUser);
  // }

  public async create(user: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create();
    newUser.username = user.username;
    newUser.email = user.email;
    newUser.firstName = user.firstName;
    newUser.lastName = user.lastName;
    newUser.setPassword(user.password);
    newUser.externalId = null;
    newUser.roles = user.roles.map(name => {
      const role = new Role();
      role.name = name;
      return role;
    });
    return this.userRepository.save(newUser);
  }
}
