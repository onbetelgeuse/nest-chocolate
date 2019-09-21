import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { FileModule } from './file/file.module';
import { TokensModule } from './tokens/tokens.module';
import { EventsModule } from './events/events.module';
import { OwmaModule } from './owma/owma.module';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    UserModule,
    TokensModule,
    EventsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'chocolate',
      password: 'chocolate',
      database: 'chocolate',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: ['info', 'log'],
      logger: 'advanced-console',
    }),
    CommonModule,
    FileModule,
    OwmaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
