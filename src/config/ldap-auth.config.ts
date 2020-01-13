import { Injectable } from '@nestjs/common';

@Injectable()
export class LdapAuthOptions {
  constructor(
    public url: string,
    public bindDN?: string,
    public bindCredentials?: string,
    public searchBase?: string,
    public searchFilter?: string,
    public searchAttributes?: string | string[],
  ) {}
}
