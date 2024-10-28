import mongoose from "mongoose";
import { Tweet } from "../models/tweetModel.js";
import { User } from "../models/userModel.js";

export const CreateTweet = async (req, res) => {
  const { description, userId } = req.body;
  if (!description || !userId) {
    return res.status(400).json({
      message: "All fields are required",
      success: false,
    });
  }
  const tweet = await Tweet.create({
    description,
    userId,
  });

  if (!tweet) {
    return res.status(500).json({
      message: "Tweet Creation Failed",
      success: false,
    });
  }

  return res.status(200).json({
    message: "Tweet Created Successfully",
    success: true,
  });
};

export const DeleteTweet = async (req, res) => {
  const { id } = req.params;
  const isDeleted = await Tweet.findByIdAndDelete({ _id: id });
  if (!isDeleted) {
    return res.status(500).json({
      message: "Failed to delte the tweet",
      success: false,
    });
  }

  return res.status(200).json({
    message: "Tweet Deleted Successfully",
    success: true,
  });
};

export const LikeOrDislike = async (req, res) => {
  const userId = req.body.id;
  const tweetID = req.params.id;
  const tweet = await Tweet.findById(tweetID);

  if (tweet?.likes?.includes(userId)) {
    //remove
    await Tweet.findByIdAndUpdate(tweetID, { $pull: { likes: userId } });
    return res.status(200).json({
      message: "You disliked the tweet",
      success: true,
    });
  } else {
    //add
    await Tweet.findByIdAndUpdate(tweetID, { $push: { likes: userId } });
    return res.status(200).json({
      message: "You liked the tweet",
      success: true,
    });
  }
};

export const GetAllTweets = async (req, res) => {
  const userId = req.params.id;
  // const tweets = await Tweet.find({userId: userId})
  const tweets = await Tweet.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "tweetuser",
      },
    },
  ]);

  const user = await User.findById(userId);
  const followings = user.following;
  await Promise.all(
    followings.map(async (following) => {
      // tweets.push(await Tweet.find({userId: following}))
      tweets.push(
        ...(await Tweet.aggregate([
          {
            $match: {
              userId: new mongoose.Types.ObjectId(following),
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "tweetuser",
            },
          },
        ]))
      );
    })
  );
  if (!tweets) {
    return res.status(400).json({
      message: "You have no tweets",
      success: false,
    });
  }
  return res.status(200).json({
    tweets,
  });
};

export const GetFollowingTweet = async (req, res) => {
  const userId = req.params.id;
  let tweets = [];
  const user = await User.findById(userId);
  const followings = user.following;
  await Promise.all(
    followings.map(async (following) => {
      tweets.push(
        ...(await Tweet.aggregate([
          {
            $match: {
              userId: new mongoose.Types.ObjectId(following),
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "tweetuser",
            },
          },
        ]))
      );
    })
  );
  if (!tweets) {
    return res.status(400).json({
      message: "You have no following tweets",
      success: false,
    });
  }
  return res.status(200).json({
    tweets,
  });
};
