import { Module, HttpModule } from '@nestjs/common';
import { OwmaService } from './owma.service';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        ({
          timeout: configService.get('HTTP_TIMEOUT'),
          maxRedirects: configService.get('HTTP_MAX_REDIRECTS'),
        } as any),
      inject: [ConfigService],
    }),
  ],
  providers: [OwmaService],
  exports: [OwmaService],
})
export class OwmaModule {}
