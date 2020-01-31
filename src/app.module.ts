import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { FileModule } from './documents/file.module';
import { TokenSessionModule } from './token-session/token-session.module';
import { EventsModule } from './events/events.module';
import { OwmaModule } from './owma/owma.module';
import { ConfigService } from './config/config.service';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { ImportModule } from './import/import.module';
import { CommuneModule } from './communes/commune.module';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    UserModule,
    TokenSessionModule,
    EventsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres' as 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: ['info', 'log', 'query', 'error', 'schema'] as LoggerOptions,
        logger: 'advanced-console' as 'advanced-console',
      }),
    }),
    CommonModule,
    FileModule,
    OwmaModule,
    ImportModule,
    CommuneModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
