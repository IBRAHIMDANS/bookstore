import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((_, req) => {
  const request = req.switchToHttp().getRequest();
  return request.user;
});
