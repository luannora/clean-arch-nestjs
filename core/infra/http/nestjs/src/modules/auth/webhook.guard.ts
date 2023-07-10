import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class WebHookGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    return this.validateToken(token)
  }

  validateToken(token: string) {
    if (token === process.env.WEB_HOOK_TOKEN) {
      return true
    } else {
      return false
    }
  }
}