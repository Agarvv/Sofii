import User from '../../models/users/User';  

class UserRepository {
    async findByEmail(email: string): Promise<User | null> {
        return User.findOne({
            where: {
                email: email
            }
        });
    }
}

export default new UserRepository();