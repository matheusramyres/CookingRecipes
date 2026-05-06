import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

interface JwtPayload {
  sub: number;
  login: string;
}

interface AuthRequest extends Request {
  user: JwtPayload;
}

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    const authHeader = request.headers.authorization;

    if (!authHeader) return false;

    const token = authHeader.split(' ')[1];

    try {
      const payload = this.jwtService.verify<JwtPayload>(token);
      request.user = payload;
      return true;
    } catch {
      return false;
    }
  }
}
