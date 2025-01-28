import { Request, Response, NextFunction, RequestHandler } from 'express';
import JwtHelper from '@helpers/JwtHelper';

const authMiddleware: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const jwtToken = req.cookies.jwt;

  if (!jwtToken) {
   res.status(401).json({
      error: "Please log in."
    });
  }

  const result = await JwtHelper.verifyToken(jwtToken);

  if (!result.success) {
    res.status(401).json({
      error: result.message || "Please log in."
    });
  }

  req.account = result.userDecoded; 
  next();
};

export default authMiddleware;
