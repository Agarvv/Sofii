import { Request, Response, NextFunction, RequestHandler } from 'express';
import JwtHelper from '@helpers/JwtHelper';

const authMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const jwtToken = req.cookies.jwt; 

  if (!jwtToken) {
    return next(new Error("No JWT Found."));
  }

  try {
    const decoded = JwtHelper.verifyToken(jwtToken);  
    req.user = decoded;  
    
    next();  
  } catch (error) {
    return next(new Error("Invalid or expired token.")); 
  }
};

export default authMiddleware;