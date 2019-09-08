import { Controller, Post, Body } from '@nestjs/common';
import { RegisterUserDto } from '../../user/dto/register-user.dto';
import { UserService } from '../../user/user.service';

@Controller('accounts')
export class AccountsController {
  constructor(private userService: UserService) {}

  @Post('register')
  public async register(@Body() register: RegisterUserDto): Promise<void> {
    await this.userService.create(register);
  }
}
