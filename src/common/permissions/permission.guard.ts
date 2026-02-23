import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUIRE_PERMISSIONS_KEY } from './permissions.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      REQUIRE_PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('User is not authenticated');
    }

    if (!user.role) {
      throw new ForbiddenException('User role is not assigned');
    }

    const permissions = user.role.permissions;

    if (!permissions) {
      throw new InternalServerErrorException(
        'Role permissions configuration is missing',
      );
    }

    if (permissions.all === true) {
      return true;
    }

    for (const permission of requiredPermissions) {
      const [resource, action] = permission.split('.');

      if (!resource || !action) {
        throw new InternalServerErrorException(
          `Invalid permission format: ${permission}`,
        );
      }

      const resourcePermissions = permissions[resource];

      if (!resourcePermissions || resourcePermissions[action] !== true) {
        throw new ForbiddenException({
          message: 'Action is not allowed for your role',
          code: 'ROLE_RESTRICTED',
          ownedPermissions: permissions,
        });
      }
    }

    return true;
  }
}
