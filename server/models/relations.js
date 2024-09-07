const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Likes = require('./Likes');
const Follower = require('./Followers');
const Friends = require('./Friends');  
const FriendRequest = require('./FriendRequest')
const Notifications = require('./Notifications')
const Video = require('./Video')
const VideoLikes = require('./VideoLikes')
const VideoComments = require('./VideoComments')
const SavedVideo = require('./SavedVideo')
const Chat = require('./Chat')
const Message = require('./Message')
const Saved = require('./Saved')
// Relación de usuario con posts
const VideoCommentAwnser = require('./VideoCommentAwnser')
const CommentAnswer = require('./CommentAwnser'); // Importa el
const CommentLikes = require('./CommentLikes')
const CommentDislikes = require('./CommentDislikes')
const CommentAwnsersLikes = require('./CommentAwnsersLikes')
const CommentAwnsersDislikes = require('./CommentAwnsersDislikes')
const VideoCommentLikes = require('./VideoCommentLikes')
const VideoCommentDislikes = require('./VideoCommentDislikes')
const VideoCommentAwnsersLikes = require('./VideoCommentAwnsersLikes')
const VideoCommentAwnsersDislikes = require('./VideoCommentAwnsersDislikes')

User.hasMany(Post, { 
  as: 'posts', 
  foreignKey: 'user_id' 
});
Post.belongsTo(User, { 
  as: 'user', 
  foreignKey: 'user_id' 
});

// Relación de usuario con comentarios
User.hasMany(Comment, {
  as: 'userComments',
  foreignKey: 'user_id'
});
Comment.belongsTo(User, {
  as: 'commentUser',
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  as: 'postComments',
  foreignKey: 'post_id'
});
Comment.belongsTo(Post, {
  as: 'commentPost',
  foreignKey: 'post_id'
});

Comment.hasMany(CommentAnswer, {
    foreignKey: 'comment_id',
    as: 'awnsers'
})

CommentAnswer.belongsTo(Comment, {
    foreignKey: 'comment_id',
    as: 'comment'
})

Post.hasMany(CommentAnswer, {
    as: 'comment_awnsers',
    foreignKey: 'post_id'
})

CommentAnswer.belongsTo(Post, {
    as: 'comment_awnser_post',
    foreignKey: 'post_id'
})

User.hasMany(CommentAnswer, {
    as: 'answers',
    foreignKey: 'user_id'
})

CommentAnswer.belongsTo(User, {
    as: 'awnser_user',
    foreignKey: 'user_id'
})

Video.hasMany(VideoCommentAwnser, {
    as: 'comments_awnsers',
    foreignKey: 'video_id'
})

VideoCommentAwnser.belongsTo(Video, {
    as: 'video',
    foreignKey: 'video_id'
})

User.hasMany(VideoCommentAwnser, {
    as: 'comments_awnsers',
    foreignKey: 'user_id'
})

VideoCommentAwnser.belongsTo(User, {
    as: 'comment_awnser_user',
    foreignKey: 'user_id'
})


VideoComments.hasMany(VideoCommentAwnser, {
    as: 'awnsers',
    foreignKey: 'comment_id'
})

VideoCommentAwnser.belongsTo(VideoComments, {
    as: 'comment',
    foreignKey: 'comment_id'
})


// Relación de post con likes
Post.hasMany(Likes, {
  as: 'postLikes',
  foreignKey: 'post_id'
});

Likes.belongsTo(Post, {
  as: 'likedPost',  // Cambié el alias para mayor claridad
  foreignKey: 'post_id'
});

Post.hasMany(Saved, {
    as: 'saved_post',
    foreignKey: 'post_id'
})

Saved.belongsTo(Post, {
    as: 'saved_post',
    foreignKey: 'post_id'
})

// Relación de seguidores y siguiendo
User.belongsToMany(User, {
  through: Follower, // Usamos el nombre del modelo, que es "Follower"
  as: 'followers',  // Alias para los que siguen al usuario
  foreignKey: 'following_id', 
  otherKey: 'follower_id'
});

User.belongsToMany(User, {
  through: Follower, // Usamos el nombre del modelo, que es "Follower"
  as: 'following',  // Alias para los que el usuario sigue
  foreignKey: 'follower_id',
  otherKey: 'following_id'
});

User.belongsToMany(User, {
  through: Friends, // Usamos el nombre del modelo, que es "Follower"
  as: 'friends',  // Alias para los que siguen al usuario
  foreignKey: 'friend_one_id', 
  otherKey: 'friend_two_id'
});





// Relación de amistad
// Relación de amistad (Asegúrate de que el alias coincida)
// Un Usuario puede tener muchas relaciones de amistad como user_one
User.hasMany(Friends, { 
  foreignKey: 'friend_one_id', 
  as: 'friendOne'
});

// Un Usuario puede tener muchas relaciones de amistad como user_two
User.hasMany(Friends, { 
  foreignKey: 'friend_two_id', 
  as: 'friendTwo'
});

// Configura las asociaciones inversas en Friends
Friends.belongsTo(User, { 
  foreignKey: 'friend_one_id', 
  as: 'friendOne'
});

Friends.belongsTo(User, { 
  foreignKey: 'friend_two_id', 
  as: 'friendTwo'
});

FriendRequest.belongsTo(User, {
  as: 'sender',
  foreignKey: 'request_sender_id'
});
User.hasMany(FriendRequest, {
  as: 'sentRequests',
  foreignKey: 'request_sender_id'
});

// Relación de FriendRequest con User (friend target)
FriendRequest.belongsTo(User, {
  as: 'target',
  foreignKey: 'friend_target'
});
User.hasMany(FriendRequest, {
  as: 'receivedRequests',
  foreignKey: 'friend_target'
});

User.hasMany(Notifications, {
    as: 'sentNotifications', // Notificaciones que este usuario ha enviado (ha generado)
    foreignKey: 'user_id'
});

User.hasMany(Notifications, {
    as: 'receivedNotifications', // Notificaciones donde este usuario es el objetivo
    foreignKey: 'user_target'
});

Notifications.belongsTo(User, {
    as: 'sender', // El usuario que envió/generó la notificación
    foreignKey: 'user_id'
});

Notifications.belongsTo(User, {
    as: 'targetUser', // El usuario objetivo (el que recibe la acción)
    foreignKey: 'user_target'
});

Notifications.belongsTo(User, {
    as: 'notifications',
    foreignKey: 'user_id'
})

User.hasMany(Video, {
    as: 'videos',
    foreignKey: 'video_user_id'
})

Video.belongsTo(User, {
    as: 'user_video',
    foreignKey: 'video_user_id'
})

Video.hasMany(VideoComments, {
    as: 'video_comments',
    foreignKey: 'video_id'
})

VideoComments.belongsTo(Video, {
    as: 'video',
    foreignKey: 'video_id'
})

User.hasMany(VideoComments, {
    as: 'video_comment_user',
    foreignKey: 'user_id'
})

VideoComments.belongsTo(User, {
    as: 'video_comment_user',
    foreignKey: 'user_id'
})

// VIDEO LIKES

Video.hasMany(VideoLikes, {
    as: 'video_likes',
    foreignKey: 'video_id'
});
VideoLikes.belongsTo(Video, {
    as: 'likedVideo',
    foreignKey: 'video_id'
});
//EXAMPLE OF USE:
// await Video.findOne({
//   include: [
//       Model: VideoLikes,
//        as: 'liked'
//   ]
// })
// THIS CAN BE USED FOR COUNTING THE LIKED'S LENGTH AND SET THE VIDEO LIKES.
//
//
//

User.hasMany(SavedVideo, {
    as: 'saved_videos',
    foreignKey: 'user_id'
})

SavedVideo.belongsTo(User, {
    as: 'saved_video_user',
    foreignKey: 'user_id'
})

Video.hasMany(SavedVideo, {
    as: 'videos_saved',
    foreignKey: 'video_id'
})

SavedVideo.belongsTo(Video, {
    as: 'saved_video_video',
    foreignKey: 'video_id'
})

Chat.belongsTo(User, { as: 'Sender', foreignKey: 'sender_id' })

Chat.belongsTo(User, { as: 'Receiver', foreignKey: 'receiver_id' })

Chat.hasMany(Message, {
    as: 'messages',
    foreignKey: 'message_room_id'
})

Message.belongsTo(Chat, {
    as: 'chat_room',
    key: 'message_room_id'
})


// User.hasMany(Chat, { as: 'SentChats', foreignKey: 'sender_id' })

// User.hasMany(Chat, { as: 'ReceivedChats', foreignKey: 'receiver_id' })


User.hasMany(Message, {
    as: 'user_messages',
    foreignKey: 'message_user_id' // Cambié 'key' por 'foreignKey'
});

Message.belongsTo(User, {
    as: 'message_user',
    foreignKey: 'message_user_id' // Cambié 'key' por 'foreignKey'
});

Comment.hasMany(CommentLikes, {
    foreignKey: 'comment_id',
    as: 'comment_likes'
})

CommentLikes.belongsTo(Comment, {
    foreignKey: 'comment_id',
    as: 'comment'
})

Comment.hasMany(CommentDislikes, {
    foreignKey: 'comment_id',
    as: 'comment_dislikes'
})

CommentDislikes.belongsTo(Comment, {
    foreignKey: 'comment_id',
    as: 'comment'
})

CommentAnswer.hasMany(CommentAwnsersLikes, {
    foreignKey: 'awnser_id',
    as: 'awnser_likes'
})

CommentAwnsersLikes.belongsTo(CommentAnswer, {
    foreignKey: 'awnser_id',
    as: 'awnser_like'
})

CommentAnswer.hasMany(CommentAwnsersDislikes, {
    foreignKey: 'awnser_id',
    as: 'awnser_dislikes'
})

CommentAwnsersDislikes.belongsTo(CommentAnswer, {
    foreignKey: 'awnser_id',
    as: 'awnser_dislike'
})



VideoComments.hasMany(VideoCommentLikes, {
    foreignKey: 'comment_id',
    as: 'comment_likes'
})

VideoCommentLikes.belongsTo(VideoComments, {
    foreignKey: 'comment_id',
    as: 'comment'
})

VideoComments.hasMany(VideoCommentDislikes, {
    foreignKey: 'comment_id',
    as: 'comment_dislikes'
})

VideoCommentDislikes.belongsTo(VideoComments, {
    foreignKey: 'comment_id',
    as: 'comment'
})

VideoCommentAwnser.hasMany(VideoCommentAwnsersLikes, {
    foreignKey: 'awnser_id',
    as: 'awnser_likes'
})

VideoCommentAwnsersLikes.belongsTo(VideoCommentAwnser, {
    foreignKey: 'awnser_id',
    as: 'awnser_like'
})

VideoCommentAwnser.hasMany(VideoCommentAwnsersDislikes, {
    foreignKey: 'awnser_id',
    as: 'awnser_dislikes'
})

VideoCommentAwnsersDislikes.belongsTo(VideoCommentAwnser, {
    foreignKey: 'awnser_id',
    as: 'awnser_dislike'
})



module.exports = { User, Post, Comment, Likes, Follower, Friends, FriendRequest, Video, Chat};