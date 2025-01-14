"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./users/User"));
const Post_1 = __importDefault(require("./posts/Post"));
const Comment_1 = __importDefault(require("./posts/comments/Comment"));
const Likes_1 = __importDefault(require("./posts/Likes"));
const Followers_1 = __importDefault(require("./users/Followers"));
const Friends_1 = __importDefault(require("./users/Friends"));
const FriendRequest_1 = __importDefault(require("./users/FriendRequest"));
const Notifications_1 = __importDefault(require("./notifications/Notifications"));
const Video_1 = __importDefault(require("./videos/Video"));
const VideoLikes_1 = __importDefault(require("./videos/VideoLikes"));
const VideoComment_1 = __importDefault(require("./videos/comments/VideoComment"));
const SavedVideo_1 = __importDefault(require("./videos/SavedVideo"));
const Chat_1 = __importDefault(require("./chat/Chat"));
const Message_1 = __importDefault(require("./chat/Message"));
const SavedPost_1 = __importDefault(require("./posts/SavedPost"));
const VideoCommentAwnser_1 = __importDefault(require("./videos/comments/VideoCommentAwnser"));
const CommentAwnser_1 = __importDefault(require("./posts/comments/CommentAwnser"));
const CommentLikes_1 = __importDefault(require("./posts/comments/CommentLikes"));
const CommentDislikes_1 = __importDefault(require("./posts/comments/CommentDislikes"));
const CommentAwnsersLikes_1 = __importDefault(require("./posts/comments/CommentAwnsersLikes"));
const CommentAwnsersDislikes_1 = __importDefault(require("./posts/comments/CommentAwnsersDislikes"));
const VideoCommentLikes_1 = __importDefault(require("./videos/comments/VideoCommentLikes"));
const VideoCommentDislikes_1 = __importDefault(require("./videos/comments/VideoCommentDislikes"));
const VideoCommentAwnsersLikes_1 = __importDefault(require("./videos/comments/VideoCommentAwnsersLikes"));
const VideoCommentAwnsersDislikes_1 = __importDefault(require("./videos/comments/VideoCommentAwnsersDislikes"));
const Blocked_1 = __importDefault(require("./users/Blocked"));
User_1.default.hasMany(Post_1.default, {
    as: 'posts',
    foreignKey: 'user_id'
});
Post_1.default.belongsTo(User_1.default, {
    as: 'user',
    foreignKey: 'user_id'
});
User_1.default.hasMany(Comment_1.default, {
    as: 'userComments',
    foreignKey: 'user_id'
});
Comment_1.default.belongsTo(User_1.default, {
    as: 'commentUser',
    foreignKey: 'user_id'
});
Post_1.default.hasMany(Comment_1.default, {
    as: 'postComments',
    foreignKey: 'post_id'
});
Comment_1.default.belongsTo(Post_1.default, {
    as: 'commentPost',
    foreignKey: 'post_id'
});
Comment_1.default.hasMany(CommentAwnser_1.default, {
    foreignKey: 'comment_id',
    as: 'awnsers'
});
CommentAwnser_1.default.belongsTo(Comment_1.default, {
    foreignKey: 'comment_id',
    as: 'comment'
});
Post_1.default.hasMany(CommentAwnser_1.default, {
    as: 'comment_awnsers',
    foreignKey: 'post_id'
});
CommentAwnser_1.default.belongsTo(Post_1.default, {
    as: 'comment_awnser_post',
    foreignKey: 'post_id'
});
User_1.default.hasMany(CommentAwnser_1.default, {
    as: 'answers',
    foreignKey: 'user_id'
});
CommentAwnser_1.default.belongsTo(User_1.default, {
    as: 'awnser_user',
    foreignKey: 'user_id'
});
Video_1.default.hasMany(VideoCommentAwnser_1.default, {
    as: 'comments_awnsers',
    foreignKey: 'video_id'
});
VideoCommentAwnser_1.default.belongsTo(Video_1.default, {
    as: 'video',
    foreignKey: 'video_id'
});
User_1.default.hasMany(VideoCommentAwnser_1.default, {
    as: 'comments_awnsers',
    foreignKey: 'user_id'
});
VideoCommentAwnser_1.default.belongsTo(User_1.default, {
    as: 'comment_awnser_user',
    foreignKey: 'user_id'
});
VideoComment_1.default.hasMany(VideoCommentAwnser_1.default, {
    as: 'awnsers',
    foreignKey: 'comment_id'
});
VideoCommentAwnser_1.default.belongsTo(VideoComment_1.default, {
    as: 'comment',
    foreignKey: 'comment_id'
});
Post_1.default.hasMany(Likes_1.default, {
    as: 'postLikes',
    foreignKey: 'post_id'
});
Likes_1.default.belongsTo(Post_1.default, {
    as: 'likedPost',
    foreignKey: 'post_id'
});
Post_1.default.hasMany(SavedPost_1.default, {
    as: 'saved_post',
    foreignKey: 'post_id'
});
SavedPost_1.default.belongsTo(Post_1.default, {
    as: 'saved_post',
    foreignKey: 'post_id'
});
User_1.default.belongsToMany(User_1.default, {
    through: Followers_1.default,
    as: 'followers',
    foreignKey: 'following_id',
    otherKey: 'follower_id'
});
User_1.default.belongsToMany(User_1.default, {
    through: Followers_1.default,
    as: 'following',
    foreignKey: 'follower_id',
    otherKey: 'following_id'
});
User_1.default.belongsToMany(User_1.default, {
    through: Friends_1.default,
    as: 'friends',
    foreignKey: 'friend_one_id',
    otherKey: 'friend_two_id'
});
User_1.default.belongsToMany(User_1.default, {
    through: Friends_1.default,
    as: 'friendsOf',
    foreignKey: 'friend_two_id',
    otherKey: 'friend_one_id'
});
User_1.default.hasMany(Friends_1.default, {
    foreignKey: 'friend_one_id',
    as: 'friendOne'
});
User_1.default.hasMany(Friends_1.default, {
    foreignKey: 'friend_two_id',
    as: 'friendTwo'
});
Friends_1.default.belongsTo(User_1.default, {
    foreignKey: 'friend_one_id',
    as: 'friendOne'
});
Friends_1.default.belongsTo(User_1.default, {
    foreignKey: 'friend_two_id',
    as: 'friendTwo'
});
FriendRequest_1.default.belongsTo(User_1.default, {
    as: 'sender',
    foreignKey: 'request_sender_id'
});
User_1.default.hasMany(FriendRequest_1.default, {
    as: 'sentRequests',
    foreignKey: 'request_sender_id'
});
FriendRequest_1.default.belongsTo(User_1.default, {
    as: 'target',
    foreignKey: 'friend_target'
});
User_1.default.hasMany(FriendRequest_1.default, {
    as: 'receivedRequests',
    foreignKey: 'friend_target'
});
User_1.default.hasMany(Notifications_1.default, {
    as: 'sentNotifications',
    foreignKey: 'user_id'
});
User_1.default.hasMany(Notifications_1.default, {
    as: 'receivedNotifications',
    foreignKey: 'user_target'
});
Notifications_1.default.belongsTo(User_1.default, {
    as: 'sender',
    foreignKey: 'user_id'
});
Notifications_1.default.belongsTo(User_1.default, {
    as: 'targetUser',
    foreignKey: 'user_target'
});
Notifications_1.default.belongsTo(User_1.default, {
    as: 'notifications',
    foreignKey: 'user_id'
});
User_1.default.hasMany(Video_1.default, {
    as: 'videos',
    foreignKey: 'video_user_id'
});
Video_1.default.belongsTo(User_1.default, {
    as: 'user_video',
    foreignKey: 'video_user_id'
});
Video_1.default.hasMany(VideoComment_1.default, {
    as: 'video_comments',
    foreignKey: 'video_id'
});
VideoComment_1.default.belongsTo(Video_1.default, {
    as: 'video',
    foreignKey: 'video_id'
});
User_1.default.hasMany(VideoComment_1.default, {
    as: 'video_comment_user',
    foreignKey: 'user_id'
});
VideoComment_1.default.belongsTo(User_1.default, {
    as: 'video_comment_user',
    foreignKey: 'user_id'
});
Video_1.default.hasMany(VideoLikes_1.default, {
    as: 'video_likes',
    foreignKey: 'video_id'
});
VideoLikes_1.default.belongsTo(Video_1.default, {
    as: 'likedVideo',
    foreignKey: 'video_id'
});
User_1.default.hasMany(SavedVideo_1.default, {
    as: 'saved_videos',
    foreignKey: 'user_id'
});
SavedVideo_1.default.belongsTo(User_1.default, {
    as: 'saved_video_user',
    foreignKey: 'user_id'
});
Video_1.default.hasMany(SavedVideo_1.default, {
    as: 'videos_saved',
    foreignKey: 'video_id'
});
SavedVideo_1.default.belongsTo(Video_1.default, {
    as: 'saved_video_video',
    foreignKey: 'video_id'
});
Chat_1.default.belongsTo(User_1.default, { as: 'Sender', foreignKey: 'sender_id' });
Chat_1.default.belongsTo(User_1.default, { as: 'Receiver', foreignKey: 'receiver_id' });
Chat_1.default.hasMany(Message_1.default, {
    as: 'messages',
    foreignKey: 'message_room_id'
});
Message_1.default.belongsTo(Chat_1.default, {
    as: 'chat_room',
    foreignKey: 'message_room_id'
});
User_1.default.hasMany(Message_1.default, {
    as: 'user_messages',
    foreignKey: 'message_user_id'
});
Message_1.default.belongsTo(User_1.default, {
    as: 'message_user',
    foreignKey: 'message_user_id'
});
Comment_1.default.hasMany(CommentLikes_1.default, {
    foreignKey: 'comment_id',
    as: 'comment_likes'
});
CommentLikes_1.default.belongsTo(Comment_1.default, {
    foreignKey: 'comment_id',
    as: 'comment'
});
Comment_1.default.hasMany(CommentDislikes_1.default, {
    foreignKey: 'comment_id',
    as: 'comment_dislikes'
});
CommentDislikes_1.default.belongsTo(Comment_1.default, {
    foreignKey: 'comment_id',
    as: 'comment'
});
CommentAwnser_1.default.hasMany(CommentAwnsersLikes_1.default, {
    foreignKey: 'awnser_id',
    as: 'awnser_likes'
});
CommentAwnsersLikes_1.default.belongsTo(CommentAwnser_1.default, {
    foreignKey: 'awnser_id',
    as: 'awnser_like'
});
CommentAwnser_1.default.hasMany(CommentAwnsersDislikes_1.default, {
    foreignKey: 'awnser_id',
    as: 'awnser_dislikes'
});
CommentAwnsersDislikes_1.default.belongsTo(CommentAwnser_1.default, {
    foreignKey: 'awnser_id',
    as: 'awnser_dislike'
});
VideoComment_1.default.hasMany(VideoCommentLikes_1.default, {
    foreignKey: 'comment_id',
    as: 'comment_likes'
});
VideoCommentLikes_1.default.belongsTo(VideoComment_1.default, {
    foreignKey: 'comment_id',
    as: 'comment'
});
VideoComment_1.default.hasMany(VideoCommentDislikes_1.default, {
    foreignKey: 'comment_id',
    as: 'comment_dislikes'
});
VideoCommentDislikes_1.default.belongsTo(VideoComment_1.default, {
    foreignKey: 'comment_id',
    as: 'comment'
});
VideoCommentAwnser_1.default.hasMany(VideoCommentAwnsersLikes_1.default, {
    foreignKey: 'awnser_id',
    as: 'awnser_likes'
});
VideoCommentAwnsersLikes_1.default.belongsTo(VideoCommentAwnser_1.default, {
    foreignKey: 'awnser_id',
    as: 'awnser_like'
});
VideoCommentAwnser_1.default.hasMany(VideoCommentAwnsersDislikes_1.default, {
    foreignKey: 'awnser_id',
    as: 'awnser_dislikes'
});
VideoCommentAwnsersDislikes_1.default.belongsTo(VideoCommentAwnser_1.default, {
    foreignKey: 'awnser_id',
    as: 'awnser_dislike'
});
User_1.default.hasMany(Blocked_1.default, {
    foreignKey: 'blocker_id',
    as: 'users_blocked'
});
User_1.default.hasMany(Blocked_1.default, {
    foreignKey: 'blocked_id',
    as: 'users_blocked_me'
});
