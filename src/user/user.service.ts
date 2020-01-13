import { Injectable, Logger } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';
import { CreateUserDto } from './../auth/dto/create.dto';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  public async findOneById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne(id, { relations: ['roles'] });
  }

  public async findOneByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ username }, { relations: ['roles'] });
  }

  public async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email }, { relations: ['roles'] });
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
    const entity: User = CreateUserDto.toEntity(user);
    const roles: Role[] = await this.roleRepository.find({
      where: { name: In(user.roles) },
    });
    entity.roles = roles;
    return this.userRepository.save(entity);
  }
}
