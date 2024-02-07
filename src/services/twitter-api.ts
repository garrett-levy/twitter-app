import axios, { AxiosResponse } from 'axios';
import { Tweet } from '../models/Tweet';
import { filterValidTweets } from './utils';

const API_BASE_URL = 'https://5wt7em4865.execute-api.us-east-1.amazonaws.com/Prod';

export const fetchTweets = async (): Promise<Tweet[]> => {
  try {
    const response: AxiosResponse<Tweet[]> = await axios.get(`${API_BASE_URL}`);
    const tweets: Tweet[] = filterValidTweets(response.data);
    const sortedTweets = tweets.sort((a, b) => b.createdDate - a.createdDate);
    return sortedTweets;
  }
  catch (error) {
    console.error('Error fetching tweets:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const fetchTweetById = async (tweetId): Promise<Tweet> => {
  try {
    const response: AxiosResponse<Tweet> = await axios.get(`${API_BASE_URL}/get/${tweetId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tweets:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const postTweet = async (tweetContent) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, tweetContent, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error posting tweet:', error);
    throw error;
  }
};

export const likeTweet = async (tweetId) => {
  try {
    await axios.put(`${API_BASE_URL}/like/${tweetId}`);
  } catch (error) {
    console.error('Error liking tweet:', error);
    throw error;
  }
};

export const unlikeTweet = async (tweetId) => {
  try {
    await axios.put(`${API_BASE_URL}/unlike/${tweetId}`);
  } catch (error) {
    console.error('Error unliking tweet:', error);
    throw error;
  }
};
