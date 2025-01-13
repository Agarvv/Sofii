import User from 'models/users/User';  
import { Op } from 'sequelize';

class UserRepository {
    async findByEmail(email: string): Promise<User | null> {
        return User.findOne({
            where: {
                email: email
            }
        });
    }
    
    async existsByEmail(email: string): Promise<boolean> {
        const count = await User.count({
          where: { email: { [Op.eq]: email } }
        });
       return count > 0;
    }
}

export default new UserRepository();