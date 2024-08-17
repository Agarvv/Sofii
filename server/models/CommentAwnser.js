const sequelize = require('../config/database'); // Asegúrate de que la ruta sea correcta
const { DataTypes } = require('sequelize');

// Definición del modelo CommentAnswer (nombre corregido)
const CommentAnswer = sequelize.define('CommentAnswer', {
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comment_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    answer_content: { // Cambio: 'awnser_content' a 'answer_content'
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'comment_answers', // Nombre de la tabla en la base de datos
    timestamps: true // Incluye createdAt y updatedAt automáticamente
});

module.exports = CommentAnswer;