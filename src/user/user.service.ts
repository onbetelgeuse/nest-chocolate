import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ProfileUserDto } from './dto/profile-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly logger: Logger,
  ) {
    // this.userRepository
    //   .findAndCount({ email: 'tabitha.reynolds@onbetelgeuse.com' })
    //   .then(res => {
    //     const userCount = res[1];
    //     if (userCount !== 0) {
    //       return;
    //     }
    //     const initialSuperAdmin = this.userRepository.create();
    //     initialSuperAdmin.email = 'tabitha.reynolds@onbetelgeuse.com';
    //     initialSuperAdmin.fistName = 'Tabitha';
    //     initialSuperAdmin.lastName = 'Reynolds';
    //     initialSuperAdmin.setPassword('tabitha');
    //     initialSuperAdmin.isSuperAdmin = true;
    //     this.userRepository.save(initialSuperAdmin).then(() => {
    //       this.logger.log('Created initial superuser');
    //     });
    //   });
  }

  public async findOneById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne(id);
  }

  public async findOneByUsername(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ username });
  }

  public async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ email });
  }

  public async findOneByExternalId(
    externalId: string,
  ): Promise<User | undefined> {
    return await this.userRepository.findOne({ externalId });
  }

  public async createfromExternal(
    profileUserDto: ProfileUserDto,
  ): Promise<User> {
    const newUser = this.userRepository.create();
    newUser.username = profileUserDto.username;
    newUser.email = profileUserDto.email;
    newUser.firstName = profileUserDto.firstName;
    newUser.lastName = profileUserDto.lastName;
    newUser.setPassword(`==|&|#|${profileUserDto.id}|$|@|==#external`);
    newUser.externalId = profileUserDto.id;
    newUser.isSuperAdmin = false;

    return await this.userRepository.save(newUser);
  }

  public async create(registerUserDto: RegisterUserDto): Promise<User> {
    const newUser = this.userRepository.create();
    newUser.username = registerUserDto.username;
    newUser.email = registerUserDto.email;
    newUser.firstName = registerUserDto.firstName;
    newUser.lastName = registerUserDto.lastName;
    newUser.setPassword(registerUserDto.password);
    newUser.externalId = null;
    newUser.isSuperAdmin = registerUserDto.isSuperAdmin || false;

    return await this.userRepository.save(newUser);
  }
}
