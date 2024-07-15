const User = require('../models/User')

const createUser = async (name, email, hashedPassword) => {
    try {
        const newUser = await User.create({
            username: name,
            email: email,
            password: hashedPassword // Aquí debería ser solo `password`, no `hashedPassword`
        })
        return newUser; // Si necesitas retornar algo, por ejemplo el usuario creado
    } catch (e) {
        console.log(e)
        throw e; // Asegúrate de manejar el error apropiadamente
    }
}

module.exports = {
    createUser
}