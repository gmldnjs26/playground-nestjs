import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    sub: string;
    refreshToken?: string;
  };
}
