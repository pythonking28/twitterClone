import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";

export const Register = async (req, res) => {
  const { name, username, email, password } = req.body;
  if (!name || !username || !email || !password) {
    return res.status(401).json({
      message: "All Fields Required",
      success: false,
    });
  }
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      message: "User Already exists",
      success: false,
    });
  }
  const hashedPassword = await bcryptjs.hash(password, 16);
  try {
    const userCreated = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    if (!userCreated) {
      return res.status(500).json({
        message: "Failed to create user",
        success: false,
      });
    }
    return res.status(200).json({
      message: "User Created Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error)
  }
};
export const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({
      message: "All Fields Required",
      success: false,
    });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "User don't exists",
      success: false,
    });
  }
  const isMatch = await bcryptjs.compare(password, user.password);
  if(!isMatch){
    return res.status(401).json({
        message: "Invalid Password",
        success: false
    })
  }
  const tokenData = {
    user_ID : user._id
  }
  const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn:'1d'});
  if(!token){
    return res.status(500).json({
        message: "SignIn Unsuccessfull",
        success: false
    })
  }
  return res.status(201).cookie("token", token, {expiresIn: '1d', httpOnly:true}).json({
    message: "Signed In Successfully",
    userId: user._id,
    success: true
  })
};


export const Logout = (req,res) => {
      return res.cookie("token","", {expiresIn: new Date(Date.now())}).status(201).json({
        message: "Logged Out Successfully",
        success: true
      })
}

export const Bookmark = async(req, res) => {
  const userId = req.body.id;
  const tweetID = req.params.id;
  const user = await User.findById(userId);
  if(user.bookmark.includes(tweetID)){
      //remove
      await User.findByIdAndUpdate(userId, {$pull : {bookmark: tweetID}})
      return res.status(200).json({
          message: "You removed the tweet from bookmark",
          success: true
      })
  }else{
      //add
      await User.findByIdAndUpdate(userId, {$push : {bookmark: tweetID}})
      return res.status(200).json({
          message: "You added the tweet to bookmark",
          success: true
      })
  }
}

export const MyProfile = async(req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).select("-password");
  if(!user){
    return res.status(400).json({
      message: "No such user exist",
      success: false
    })
  }
  return res.status(200).json({
    user
  })
}

export const OtherProfile = async(req, res) => {
  const userId = req.params.id;
  const otherUsers = await User.find({_id: {$ne: userId}}).select("-password");
  if(otherUsers.length === 0){
    return res.status(200).json({
      message: "Currently no users available",
      success: true
    })
  }

  return res.status(200).json({
    otherUsers
  })
}

export const followUnfollow = async(req, res)=> {
    const loggedInUserId = req.body.id;
    const userId = req.params.id;
    if(loggedInUserId === userId){
      return res.status(400).json({
        message: "Please don't follow yourself",
        success: false
      })
    }
    const loggedInUser = await User.findById(loggedInUserId)
    const user = await User.findById(userId)

    if(user.follower.includes(loggedInUserId)){
      await user.updateOne({$pull: {follower: loggedInUserId}})
      await loggedInUser.updateOne({$pull: {following: userId}})
      await user.save()
      await loggedInUser.save()
      return res.status(200).json({
        message: `${loggedInUser.name} unfollowed ${user.name}`,
        success: true
      })
    }else{
      await user.updateOne({$push: {follower: loggedInUserId}})
      await loggedInUser.updateOne({$push: {following: userId}})
      await user.save()
      const checking = await loggedInUser.save()
      return res.status(200).json({
        message: `${loggedInUser.name} followed ${user.name}`,
        success: true
      })
    }
}


