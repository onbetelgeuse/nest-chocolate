import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { FileModule } from './files/file.module';
import { TokenModule } from './tokens/token.module';
import { EventsModule } from './events/events.module';
import { OwmaModule } from './owma/owma.module';
import { ConfigService } from './config/config.service';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { ImportModule } from './import/import.module';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    UserModule,
    TokenModule,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
