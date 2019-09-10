import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;
  const path = './environments/development.env';

  beforeEach(async () => {
    service = new ConfigService(path);
  });

  it('should be defined', () => {
    // verify
    expect(service).toBeDefined();
  });
});
