import { Tweet } from "@/models/Tweet";

export function filterValidTweets(tweets: Tweet[]) {
  // Filter out any tweets that don't have all the required fields
  return tweets.filter(tweet => 
      tweet.authorName !== undefined &&
      tweet.createdDate !== undefined &&
      tweet.authorUserName !== undefined &&
      tweet.likeCount !== undefined &&
      tweet.id !== undefined &&
      tweet.tweetText !== undefined
    );
  }

