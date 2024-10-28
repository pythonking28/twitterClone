import express from 'express';
import { CreateTweet, DeleteTweet, GetAllTweets, GetFollowingTweet, LikeOrDislike } from '../controllers/tweetController.js';
import isAuthenticated from '../config/isAuthenticated.js';

const Router = express.Router();

Router.route('/create').post(isAuthenticated,CreateTweet)
Router.route('/delete/:id').delete(DeleteTweet)
Router.route('/like/:id').put(LikeOrDislike)
Router.route('/getalltweets/:id').get(GetAllTweets)
Router.route('/getfollowingtweets/:id').get(GetFollowingTweet)


export default Router;