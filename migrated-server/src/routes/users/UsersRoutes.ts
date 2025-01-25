import express from 'express';
import { validateRequest } from '@middleware/ValidationMiddleware'
import UsersController from '@controllers/users/UsersController'
import  blockUserSchema from '@validation/users/BlockUserSchema'
import followUserSchema from '@validation/users/FollowUserSchema'
import sendFriendRequestSchema from '@validation/users/SendFriendRequestSchema' 
import  friendRequestSchema from '@validation/users/FriendRequestSchema'

const usersRouter = express.Router(); 

usersRouter.post('/block', 
  validateRequest(blockUserSchema),
  UsersController.blockOrUnblock 
)

usersRouter.post('/follow', 
  validateRequest(followUserSchema),
  UsersController.followOrUnfollow 
)

usersRouter.get('/friends', 
  UsersController.getFriendsAndRequests 
)

usersRouter.post('/friendRequest', 
  validateRequest(sendFriendRequestSchema),
  UsersController.sendFriendRequest 
)

usersRouter.post('/friendRequest/accept', 
  validateRequest(friendRequestSchema),
  UsersController.acceptFriendRequest
)

usersRouter.post('/friendRequest/deny', 
  validateRequest(friendRequestSchema),
  UsersController.denyFriendRequest
)


export default usersRouter; 