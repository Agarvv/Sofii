import jwt from 'jsonwebtoken';

class JwtHelper {
  private static readonly SECRET = process.env.JWT_SECRET || '!+()@3*+25#34+€(€(#!_)#82+_!"9#(;_*';
  private static readonly EXPIRATION = '1h';

  public static generateToken(payload: object): string {
    return jwt.sign(payload, this.SECRET, { expiresIn: this.EXPIRATION });
  }

  public static verifyToken(token: string): { success: boolean, userDecoded?: any, message?: string } {
    try {
      const userDecoded = jwt.verify(token, this.SECRET);
      return { success: true, userDecoded: userDecoded };
    } catch (error) {
      return { success: false, message: 'Invalid or expired token' };
    }
  }
}

export default JwtHelper;
