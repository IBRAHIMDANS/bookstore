import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  baseUrl: `${process.env.BASE_URL}`,
  port: `${process.env.PORT}`,
  host: `${process.env.HOST}`,
}));
