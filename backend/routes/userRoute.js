import express from 'express';
import {Register, Login, Logout, Bookmark, MyProfile, OtherProfile, followUnfollow} from '../controllers/userController.js';
import isAuthenticated from '../config/isAuthenticated.js';

const router = express.Router();

router.route('/register').post(Register)
router.route('/login').post(Login)
router.route('/logout').get(Logout)
router.route('/bookmark/:id').put(isAuthenticated, Bookmark)
router.route('/myprofile/:id').get(isAuthenticated, MyProfile)
router.route('/otherusers/:id').get(isAuthenticated, OtherProfile)
router.route('/follow/:id').post(isAuthenticated, followUnfollow)


export default router;