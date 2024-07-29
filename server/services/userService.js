const User = require('../models/User')
const tokenController = require('../controllers/tokenController')

const handleProfilePictureChange = async (file, token) => {
  try {
    console.log('Token recibido en la función:', token);
    const jwtuser = await tokenController.verifyJwtToken(token);
    if (!jwtuser || !jwtuser.user_id) {
      console.log('Error al verificar el token JWT o id ausente');
      throw new Error('Invalid token or user ID');
    }

    console.log('Usuario JWT en el método:', jwtuser);

    const user = await User.findOne({ where: { id: jwtuser.user_id } });
    if (!user) {
      console.log('Usuario no encontrado');
      return { error: 'User not found' };
    }

    // Aquí maneja el archivo subido (file)
    console.log('Archivo recibido:', file); // Aquí puedes ver los detalles del archivo

    // Implementa la lógica para guardar la imagen de perfil o cualquier otra operación necesaria

    return user;
  } catch (e) {
    console.error('Error en handleProfilePictureChange:', e);
    throw new Error(e.message);
  }
};



module.exports = {
	handleProfilePictureChange
}