import  User from '../models/users/User'


const findByEmail = async (email: string): Promise<User> => {  
    const user = await User.findOne({ where: { email } });
    
    if(!user) {
        throw new Error("user not found");
    }
    
    return user 
};

export default findByEmail; 