import { useSelector } from "react-redux";
import TweetInstance from "./TweetInstance";


const Tweet = () => {
  const {tweets} = useSelector(store=> store.tweet)
  const {profile} = useSelector(store=> store.user)
  return (
    <div>
      {tweets?.map(tweet => (
      <TweetInstance key={tweet._id} tweet={tweet} profile={profile} /> 
    ))}
    </div>
  );
};
export default Tweet;
