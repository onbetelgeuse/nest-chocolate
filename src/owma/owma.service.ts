import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { AxiosResponse } from 'axios';

@Injectable()
export class OwmaService {
  private readonly baseUrl: string = `${this.configService.getOwmaUrl}/data/${
    this.configService.getOwmaVersion
  }`;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  public async find(query: string): Promise<AxiosResponse<any>> {
    const params: any = {
      type: 'like',
      sort: 'population',
      ctn: '10',
      appid: this.configService.getOwmaApiKey2,
    };
    return this.httpService
      .get(`${this.baseUrl}/find?q=${query}`, { params })
      .toPromise();
  }
}
