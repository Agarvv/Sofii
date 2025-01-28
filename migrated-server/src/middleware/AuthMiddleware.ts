import { Request, Response, NextFunction, RequestHandler } from 'express';
import JwtHelper from '@helpers/JwtHelper';

const authMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const jwtToken = req.cookies.jwt;

  if (!jwtToken) {
    res.status(401).json({
      error: "Please log in."
    });
  }

  try {
    const decoded = JwtHelper.verifyToken(jwtToken);
    console.log(decoded);
    req.account = decoded;

    next();  
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Please log in."
    });  
  }
};

export default authMiddleware; 