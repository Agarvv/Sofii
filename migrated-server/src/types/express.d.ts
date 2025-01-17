import * as express from 'express';
import Account from './Account';

declare global {
  namespace Express {
    interface Request {
      account: Account; 
    }
  }
}