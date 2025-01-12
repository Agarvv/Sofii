import { Request, Response, NextFunction } from 'express';
//import jwt from 'jsonwebtoken';


const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("Not implemented"); 
  next(); 
};

export default authMiddleware; 