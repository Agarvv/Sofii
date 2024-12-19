import { User } from '@models/users/User'
import { CustomError } from './CustomError'

const findByEmail = async (email: string): Promise<User> => {  
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new CustomError('User not found with that email.', 404);
    }

    return user;
};

export default findByEmail; 