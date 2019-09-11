export interface JwtPayload {
  id: number;
  username: string;
  email: string;
  roles: string[];
  iat?: number;
  exp?: number;
  aud?: string;
  iss?: string;
}
