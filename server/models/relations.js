const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Likes = require('./Likes');
const Followers = require('./Followers');
const Friends = require('./Friends');  
const FriendRequest = require('./FriendRequest')
const Notifications = require('./Notifications')
const Video = require('./Video')
const VideoLikes = require('./VideoLikes')
const VideoComments = require('./VideoComments')
const SavedVideo = require('./SavedVideo')
const Chat = require('./Chat')
const Message = require('./Message')

// Relación de usuario con posts


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

// Relación de post con comentarios
Post.hasMany(Comment, {
  as: 'postComments',
  foreignKey: 'post_id'
});
Comment.belongsTo(Post, {
  as: 'commentPost',
  foreignKey: 'post_id'
});

// Relación de post con likes
Post.hasMany(Likes, {
  as: 'postLikes',
  foreignKey: 'post_id'
});
Likes.belongsTo(Post, {
  as: 'likedPost',  // Cambié el alias para mayor claridad
  foreignKey: 'post_id'
});

// Relación de seguidores y siguiendo
User.belongsToMany(User, {
  through: Followers,
  as: 'followers',
  foreignKey: 'following_id',
  otherKey: 'follower_id'
});
User.belongsToMany(User, {
  through: Followers,
  as: 'following',
  foreignKey: 'follower_id',
  otherKey: 'following_id'
});

// Relación de amistad
User.belongsToMany(User, {
  through: Friends,
  as: 'friends',
  foreignKey: 'friend_one_id',
  otherKey: 'friend_two_id',
  unique: false  // Permite relaciones duplicadas (amigos mutuos)
});
User.belongsToMany(User, {
  through: Friends,
  as: 'friendsOf',
  foreignKey: 'friend_two_id',
  otherKey: 'friend_one_id',
  unique: false  // Permite relaciones duplicadas (amigos mutuos)
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
    as: 'notifications',
    foreignKey: 'user_id'
})

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
    key: 'message_user_id'
})

Message.belongsTo(User, {
    as: 'message_user',
    key: 'id'
})






module.exports = { User, Post, Comment, Likes, Followers, Friends, FriendRequest, Video, Chat};