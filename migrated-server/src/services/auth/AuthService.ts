import bcrypt from 'bcryptjs';
import User from '../../models/users/User'; 
import userRepository from '../../repositories/user/UserRepository';
import CustomError from '../../outils/CustomError';
import JwtHelper from '../../helpers/JwtHelper';

class AuthService {
    
  public static async registerUser(username: string, email: string, password: string): Promise<void> {
    if (await userRepository.existsByEmail(email)) {
      throw new CustomError("That email is already taken.", 409);
    }

    const hashedPassword = await this.hashPassword(password);

    await User.create({
      username: username,
      email: email,
      password: hashedPassword
    });
  }

  public static async loginUser(email: string, password: string): Promise<string> {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new CustomError("That email doesn't exist.", 400);
    }

    await this.ensurePasswordMatch(password, user.password);

    const jwtPayload = this.generateJwtPayload(user);

    return JwtHelper.generateToken(jwtPayload);
  }

  private static async hashPassword(rawPassword: string): Promise<string> {
    return await bcrypt.hash(rawPassword, 10);
  }

  private static async ensurePasswordMatch(original: string, hashed: string): Promise<void> {
    const isMatch = await bcrypt.compare(original, hashed);
    if (!isMatch) {
      throw new CustomError("Wrong Password", 400);
    }
  }

  private static generateJwtPayload(user: User): object {
    return {
      user_id: user.id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      banner: user.banner,
      bio: user.bio,
      civilStatus: user.civil_status,
      gender: user.gender,
      nativeCity: user.native_city,
      ubication: user.ubication,
      job: user.job
    };
  }
}

export default AuthService;