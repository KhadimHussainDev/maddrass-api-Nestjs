import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUserId = createParamDecorator(
  (data: never, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    return request.userId;
  },
);
