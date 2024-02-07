<template>
  <div class="tweet">
    <div class="tweet-header">
      <div class="author-info">
        <span class="author-name">{{ tweet.authorName }}</span>
        <span class="author-username">@{{ tweet.authorUserName }}</span>
      </div>
      <span class="created-date">{{ convertDateToString(tweet.createdDate) }}</span>
    </div>
    <div class="tweet-content">
      {{ tweet.tweetText }}
    </div>
    <div class="tweet-footer">
      <span class="like-button">
        <i v-if="isLiked" class="fa-solid fa-heart" @click="like"></i>
        <i v-else class="fa-regular fa-heart" @click="like"></i>
      </span>
      <span class="like-count">{{ tweet.likeCount }} Likes</span>
    </div>
  </div>
</template>

<script>
import { likeTweet, unlikeTweet } from "../services/twitter-api";

export default {
  props: {
    tweet: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      isLiked: false,
    }
  },
  methods: {
    convertDateToString(date) {
      // Convert the date from epoch time to a string
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'  
      };

      const convertedDate = new Date(date * 1000);
      const formattedDate = convertedDate.toLocaleDateString(undefined, options);
      
      return formattedDate;
    },
    async like() {
      if (!this.isLiked) {
        this.isLiked = true;
        this.tweet.likeCount = parseInt(this.tweet.likeCount, 10) + 1;
        likeTweet(this.tweet.id)
      } else {
        this.isLiked = false;
        this.tweet.likeCount = parseInt(this.tweet.likeCount, 10) - 1;
        unlikeTweet(this.tweet.id)
      }
    }
  },
};
</script>

<style scoped>
.tweet {
  border: 1px solid #e5e5e5;
  padding: 10px;
  margin-bottom: 1px;
  background: #ffffff;
  font-family: Arial, Helvetica, sans-serif;
  width: 98%;
}

.tweet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.author-info {
  display: flex;
  align-items: center;
}

.author-name {
  font-weight: bold;
  margin-right: 5px; /* Adjust spacing between name and username if needed */
}

.author-username {
  color: #959595;
}

.created-date {
  color: #888;
}

.tweet-content {
  margin-bottom: 10px;
}

.tweet-footer {
  color: #888;
}

.like-count {
    color: rgb(245, 103, 127)
}
.like-button {
    color: rgb(245, 103, 127);
    padding-right: 10px;
}
</style>
