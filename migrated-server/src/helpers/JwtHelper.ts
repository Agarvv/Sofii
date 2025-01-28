import jwt from 'jsonwebtoken';

class JwtHelper { 
    private static readonly SECRET = process.env.JWT_SECRET || '!+()@3*+25#34+€(€(#!)#82+!"9#(;_*'; 
    private static readonly EXPIRATION = '1h';

    public static generateToken(payload: object): string { 
        return jwt.sign(payload, this.SECRET, { expiresIn: this.EXPIRATION }); 
    }

    public static verifyToken(token: string): any { 
        try { 
            return jwt.verify(token, this.SECRET); 
        } catch (error) { 
            throw new Error('Invalid or expired token'); 
        } 
    } 
}

export default JwtHelper;