import { Model, DataTypes, Sequelize } from 'sequelize';

import User from './users/User';
import Post from './posts/Post';
import Comment from './posts/comments/Comment';
import Likes from './posts/Likes';
import Follower from './users/Followers';
import Friends from './users/Friends';
import FriendRequest from './users/FriendRequest';
import Notifications from './notifications/Notifications';
import Video from './videos/Video';
import VideoLikes from './videos/VideoLikes';
import VideoComments from './videos/comments/VideoComment';
import SavedVideo from './videos/SavedVideo';
import Chat from './chat/Chat';
import Message from './chat/Message';
import Saved from './posts/SavedPost';
import VideoCommentAwnser from './videos/comments/VideoCommentAwnser';
import CommentAnswer from './posts/comments/CommentAwnser';
import CommentLikes from './posts/comments/CommentLikes';
import CommentDislikes from './posts/comments/CommentDislikes';
import CommentAwnsersLikes from './posts/comments/CommentAwnsersLikes';
import CommentAwnsersDislikes from './posts/comments/CommentAwnsersDislikes';
import VideoCommentLikes from './videos/comments/VideoCommentLikes';
import VideoCommentDislikes from './videos/comments/VideoCommentDislikes';
import VideoCommentAwnsersLikes from './videos/comments/VideoCommentAwnsersLikes';
import VideoCommentAwnsersDislikes from './videos/comments/VideoCommentAwnsersDislikes';
import Blocked from './users/Blocked';
    
User.hasMany(Post, {
  as: 'posts',
  foreignKey: 'user_id'
});
Post.belongsTo(User, {
  as: 'user',
  foreignKey: 'user_id'
});

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
});

CommentAnswer.belongsTo(Comment, {
  foreignKey: 'comment_id',
  as: 'comment'
});

Post.hasMany(CommentAnswer, {
  as: 'comment_awnsers',
  foreignKey: 'post_id'
});

CommentAnswer.belongsTo(Post, {
  as: 'comment_awnser_post',
  foreignKey: 'post_id'
});

User.hasMany(CommentAnswer, {
  as: 'answers',
  foreignKey: 'user_id'
});

CommentAnswer.belongsTo(User, {
  as: 'awnser_user',
  foreignKey: 'user_id'
});

Video.hasMany(VideoCommentAwnser, {
  as: 'comments_awnsers',
  foreignKey: 'video_id'
});

VideoCommentAwnser.belongsTo(Video, {
  as: 'video',
  foreignKey: 'video_id'
});

User.hasMany(VideoCommentAwnser, {
  as: 'comments_awnsers',
  foreignKey: 'user_id'
});

VideoCommentAwnser.belongsTo(User, {
  as: 'comment_awnser_user',
  foreignKey: 'user_id'
});

VideoComments.hasMany(VideoCommentAwnser, {
  as: 'awnsers',
  foreignKey: 'comment_id'
});

VideoCommentAwnser.belongsTo(VideoComments, {
  as: 'comment',
  foreignKey: 'comment_id'
});

Post.hasMany(Likes, {
  as: 'postLikes',
  foreignKey: 'post_id'
});

Likes.belongsTo(Post, {
  as: 'likedPost',
  foreignKey: 'post_id'
});

Post.hasMany(Saved, {
  as: 'saved_post',
  foreignKey: 'post_id'
});

Saved.belongsTo(Post, {
  as: 'saved_post',
  foreignKey: 'post_id'
});

User.belongsToMany(User, {
  through: Follower,
  as: 'followers',
  foreignKey: 'following_id',
  otherKey: 'follower_id'
});

User.belongsToMany(User, {
  through: Follower,
  as: 'following',
  foreignKey: 'follower_id',
  otherKey: 'following_id'
});

User.belongsToMany(User, {
  through: Friends,
  as: 'friends',
  foreignKey: 'friend_one_id',
  otherKey: 'friend_two_id'
});

User.belongsToMany(User, {
  through: Friends,
  as: 'friendsOf',
  foreignKey: 'friend_two_id',
  otherKey: 'friend_one_id'
});

User.hasMany(Friends, {
  foreignKey: 'friend_one_id',
  as: 'friendOne'
});

User.hasMany(Friends, {
  foreignKey: 'friend_two_id',
  as: 'friendTwo'
});

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

FriendRequest.belongsTo(User, {
  as: 'target',
  foreignKey: 'friend_target'
});
User.hasMany(FriendRequest, {
  as: 'receivedRequests',
  foreignKey: 'friend_target'
});

User.hasMany(Notifications, {
  as: 'sentNotifications',
  foreignKey: 'user_id'
});

User.hasMany(Notifications, {
  as: 'receivedNotifications',
  foreignKey: 'user_target'
});

Notifications.belongsTo(User, {
  as: 'sender',
  foreignKey: 'user_id'
});

Notifications.belongsTo(User, {
  as: 'targetUser',
  foreignKey: 'user_target'
});

Notifications.belongsTo(User, {
  as: 'notifications',
  foreignKey: 'user_id'
});

User.hasMany(Video, {
  as: 'videos',
  foreignKey: 'video_user_id'
});

Video.belongsTo(User, {
  as: 'user_video',
  foreignKey: 'video_user_id'
});

Video.hasMany(VideoComments, {
  as: 'video_comments',
  foreignKey: 'video_id'
});

VideoComments.belongsTo(Video, {
  as: 'video',
  foreignKey: 'video_id'
});

User.hasMany(VideoComments, {
  as: 'video_comment_user',
  foreignKey: 'user_id'
});

VideoComments.belongsTo(User, {
  as: 'video_comment_user',
  foreignKey: 'user_id'
});

Video.hasMany(VideoLikes, {
  as: 'video_likes',
  foreignKey: 'video_id'
});
VideoLikes.belongsTo(Video, {
  as: 'likedVideo',
  foreignKey: 'video_id'
});

User.hasMany(SavedVideo, {
  as: 'saved_videos',
  foreignKey: 'user_id'
});

SavedVideo.belongsTo(User, {
  as: 'saved_video_user',
  foreignKey: 'user_id'
});

Video.hasMany(SavedVideo, {
  as: 'videos_saved',
  foreignKey: 'video_id'
});

SavedVideo.belongsTo(Video, {
  as: 'saved_video_video',
  foreignKey: 'video_id'
});

Chat.belongsTo(User, { as: 'Sender', foreignKey: 'sender_id' });
Chat.belongsTo(User, { as: 'Receiver', foreignKey: 'receiver_id' });

Chat.hasMany(Message, {
  as: 'messages',
  foreignKey: 'message_room_id'
});

Message.belongsTo(Chat, {
  as: 'chat_room',
  foreignKey: 'message_room_id'
});

User.hasMany(Message, {
  as: 'user_messages',
  foreignKey: 'message_user_id'
});

Message.belongsTo(User, {
  as: 'message_user',
  foreignKey: 'message_user_id'
});

Comment.hasMany(CommentLikes, {
  foreignKey: 'comment_id',
  as: 'comment_likes'
});

CommentLikes.belongsTo(Comment, {
  foreignKey: 'comment_id',
  as: 'comment'
});

Comment.hasMany(CommentDislikes, {
  foreignKey: 'comment_id',
  as: 'comment_dislikes'
});

CommentDislikes.belongsTo(Comment, {
  foreignKey: 'comment_id',
  as: 'comment'
});

CommentAnswer.hasMany(CommentAwnsersLikes, {
  foreignKey: 'awnser_id',
  as: 'awnser_likes'
});

CommentAwnsersLikes.belongsTo(CommentAnswer, {
  foreignKey: 'awnser_id',
  as: 'awnser_like'
});

CommentAnswer.hasMany(CommentAwnsersDislikes, {
  foreignKey: 'awnser_id',
  as: 'awnser_dislikes'
});

CommentAwnsersDislikes.belongsTo(CommentAnswer, {
  foreignKey: 'awnser_id',
  as: 'awnser_dislike'
});

VideoComments.hasMany(VideoCommentLikes, {
  foreignKey: 'comment_id',
  as: 'comment_likes'
});

VideoCommentLikes.belongsTo(VideoComments, {
  foreignKey: 'comment_id',
  as: 'comment'
});

VideoComments.hasMany(VideoCommentDislikes, {
  foreignKey: 'comment_id',
  as: 'comment_dislikes'
});

VideoCommentDislikes.belongsTo(VideoComments, {
  foreignKey: 'comment_id',
  as: 'comment'
});

VideoCommentAwnser.hasMany(VideoCommentAwnsersLikes, {
  foreignKey: 'awnser_id',
  as: 'awnser_likes'
});

VideoCommentAwnsersLikes.belongsTo(VideoCommentAwnser, {
  foreignKey: 'awnser_id',
  as: 'awnser_like'
});

VideoCommentAwnser.hasMany(VideoCommentAwnsersDislikes, {
  foreignKey: 'awnser_id',
  as: 'awnser_dislikes'
});

VideoCommentAwnsersDislikes.belongsTo(VideoCommentAwnser, {
  foreignKey: 'awnser_id',
  as: 'awnser_dislike'
});

User.hasMany(Blocked, {
  foreignKey: 'blocker_id',
  as: 'users_blocked'
});

User.hasMany(Blocked, {
  foreignKey: 'blocked_id',
  as: 'users_blocked_me'
});

