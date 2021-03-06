import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';
import { LdapAuthOptions } from './ldap-auth.config';
import { OpenIdConnectAuthOptions } from './oidc-auth.config';

export interface EnvConfig {
  [key: string]: string;
}

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    const config = fs.existsSync(filePath)
      ? dotenv.parse(fs.readFileSync(filePath))
      : {};
    // CMD DOS LINUX
    // ssh-keygen -t rsa -b 4096 -f jwtRS256.key
    // ssh-keygen -f jwtRS256.key.pub -e -m pkcs8 >  jwtRS256.key.pub.pem

    this.envConfig = this.validateInput({ ...config, ...process.env });
  }

  //    Ensures all needed variables are set, and returns the validated JavaScript object
  //    including the applied default values.

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test'])
        .default('development'),
      PORT: Joi.number().default(3000),
      API_AUTH_ENABLED: Joi.boolean().required(),

      JWT_PRIVATE_KEY: Joi.string().required(),
      JWT_PUBLIC_KEY: Joi.string().required(),
      JWT_SECRET_KEY: Joi.string().required(),
      JWT_EXPIRES_IN: Joi.alternatives()
        .try(Joi.number(), Joi.string())
        .required(),
      JWT_ISSUER: Joi.string().required(),
      JWT_AUDIENCE: Joi.string().required(),
      JWT_ALGORITHM: Joi.string().required(),

      DB_TYPE: Joi.string().required(),
      DB_HOST: Joi.string().required(),
      DB_PORT: Joi.number().required(),
      DB_USER: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_DATABASE: Joi.string().required(),

      LDAP_SERVER_URL: Joi.string().required(),
      LDAP_BIND_DN: Joi.string().required(),
      LDAP_PASSWORD: Joi.string().required(),
      LDAP_SEARCHBASE: Joi.string().required(),
      LDAP_SEARCHFILTER: Joi.string().required(),
      LDAP_SEARCHATTRIBUTES: Joi.empty(),

      OIDC_ISSUER: Joi.string().required(),
      OIDC_AUTHORIZATION_URL: Joi.string().required(),
      OIDC_USERINFO_URL: Joi.string().required(),
      OIDC_TOKEN_URL: Joi.string().required(),
      OIDC_CLIENT_ID: Joi.string().required(),
      OIDC_CLIENT_SECRET: Joi.string().required(),
      OIDC_CALLBACK_URL: Joi.string().required(),

      OWMA_URL: Joi.string().required(),
      OWMA_VERSION: Joi.string().required(),
      OWMA_APIKEY: Joi.string().required(),
      OWMA_APIKEY2: Joi.string().required(),

      MULTER_DEST: Joi.string().required(),

      REDIS_HOST: Joi.string().default('localhost'),
      REDIS_PORT: Joi.number().default(6379),
      REDIS_DB: Joi.number().default(0),

      CLEANUP_TOKEN_SESSION_SCHEDULE_CRON_JOB: Joi.string().required(),
      CLEANUP_TOKEN_SESSION_JOB_MAX_RETRY: Joi.number().default(1),
    }).options({ allowUnknown: true, convert: true });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  public get<T extends string | number | boolean = string>(key: string): T {
    return this.envConfig[key] as T;
  }

  public get jwtSecret(): string {
    return this.envConfig.JWT_SECRET_KEY;
  }

  public get jwtExpire(): number | string {
    if (!isNaN(parseInt(this.envConfig.JWT_EXPIRES_IN, 10))) {
      return this.envConfig.JWT_EXPIRES_IN;
    }
    return Number(this.envConfig.JWT_EXPIRES_IN);
  }

  public get jwtPublicKey(): string {
    const path = `${process.env.HOME}/.ssh/${this.envConfig.JWT_PUBLIC_KEY}`;
    const publicKey = fs.readFileSync(path, 'utf8');
    return publicKey;
  }

  public get jwtPrivateKey(): string {
    const path = `${process.env.HOME}/.ssh/${this.envConfig.JWT_PRIVATE_KEY}`;
    const privateKey = fs.readFileSync(path, 'utf8');
    return privateKey;
  }

  public get jwtAlgorithm(): string {
    return this.envConfig.JWT_ALGORITHM;
  }

  public get jwtAudience(): string {
    return this.envConfig.JWT_AUDIENCE;
  }

  public get jwtIssuer(): string {
    return this.envConfig.JWT_ISSUER;
  }

  public getDatabase(): string {
    return this.envConfig.DB_DATABASE;
  }

  public get getOwmaUrl(): string {
    return this.envConfig.OWMA_URL;
  }

  public get getOwmaVersion(): string {
    return this.envConfig.OWMA_VERSION;
  }

  public get getOwmaApiKey(): string {
    return this.envConfig.OWMA_APIKEY;
  }
  public get getOwmaApiKey2(): string {
    return this.envConfig.OWMA_APIKEY2;
  }

  public get cleanupTokenSessionCronJob(): string {
    return String(this.envConfig.CLEANUP_TOKEN_SESSION_SCHEDULE_CRON_JOB);
  }

  public get cleanupTokenSessionMaxRetry(): number {
    return Number(this.envConfig.CLEANUP_TOKEN_SESSION_JOB_MAX_RETRY);
  }

  public get ldapAuthOptions(): LdapAuthOptions {
    return new LdapAuthOptions(
      this.envConfig.LDAP_SERVER_URL,
      this.envConfig.LDAP_BIND_DN,
      this.envConfig.LDAP_PASSWORD,
      this.envConfig.LDAP_SEARCHBASE,
      this.envConfig.LDAP_SEARCHFILTER,
      this.envConfig.LDAP_SEARCHATTRIBUTES || [],
    );
  }

  public get oidcAuthOptions(): OpenIdConnectAuthOptions {
    return new OpenIdConnectAuthOptions(
      this.envConfig.OIDC_ISSUER,
      this.envConfig.OIDC_AUTHORIZATION_URL,
      this.envConfig.OIDC_USERINFO_URL,
      this.envConfig.OIDC_TOKEN_URL,
      this.envConfig.OIDC_CLIENT_ID,
      this.envConfig.OIDC_CLIENT_SECRET,
      this.envConfig.OIDC_CALLBACK_URL,
    );
  }
}
