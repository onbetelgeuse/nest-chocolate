import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserDto } from '../../user/dto/user.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles: string[] = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    console.log('roles', roles);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: UserDto = request.user;
    console.log('user', user);
    const hasRole = () =>
      user.roles.some(role => !!roles.find(item => item === role));

    return user && user.roles && hasRole();
  }
}
