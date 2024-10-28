import mongoose, {Schema} from 'mongoose'

const tweetSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    likes: {
        type: [Schema.Types.ObjectId],
        default: []
    },
    comment: {
        type: [Schema.Types.ObjectId],
        default: []
    }
},{timestamps: true})


export const Tweet = mongoose.models.Tweet || mongoose.model("Tweet", tweetSchema);