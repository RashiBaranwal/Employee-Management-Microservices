import { HonoRequest } from 'hono';

declare module 'hono' {
  interface HonoRequest {
    userId?: string;
  }
}
