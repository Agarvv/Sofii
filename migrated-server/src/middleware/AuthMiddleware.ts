import { Request, Response, NextFunction, RequestHandler } from 'express';
import JwtHelper from '@helpers/JwtHelper';

const authMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const jwtToken = req.cookies.jwt; 

  if (!jwtToken) {
    return next(new Error("No JWT Found."));
    console.log("no jwt")
  }

  try {
    const decoded = JwtHelper.verifyToken(jwtToken);  
    console.log(decoded);
    req.account = decoded; 
    
    next();  
  } catch (error) {
    console.log(error)
   return next(new Error("Invalid or expired token.")); 
  }
};

export default authMiddleware;