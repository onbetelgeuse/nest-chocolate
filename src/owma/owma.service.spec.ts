import { Test, TestingModule } from '@nestjs/testing';
import { OwmaService } from './owma.service';
import { HttpService } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { mock, instance } from 'ts-mockito';

describe('OwmaService', () => {
  let service: OwmaService;
  let httpService: HttpService;
  let configService: ConfigService;

  beforeEach(async () => {
    httpService = mock(HttpService);
    configService = mock(ConfigService);
    service = new OwmaService(instance(httpService), instance(configService));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
