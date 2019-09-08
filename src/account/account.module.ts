import { Module } from '@nestjs/common';
import { AccountsController } from './accounts/accounts.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AccountsController],
})
export class AccountModule {}
