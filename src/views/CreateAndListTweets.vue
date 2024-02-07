<template>
  <div class="middle-content">
    <div class="create-tweet">
      <div class="identification"> 
        <input id="name" v-model="name" placeholder="Your Name" />
        <input id="username" v-model="username" placeholder="Your Username" />
      </div>
      <label for="tweetText"></label>
      <div class="text-area">
        <textarea id="tweetText" v-model="tweetText" placeholder="What's happening?" maxlength="140" @input="updateCharacterCount"></textarea>
        <p v-if="characterCount < 140" class="character-count">({{ characterCount }} / 140)</p>
        <p v-else class="character-count-max">({{ characterCount }} / 140)</p>
      </div>
      <button @click="createTweet">
        <i class="fa-solid fa-plus"></i>
      </button>
    </div>
    <div class="tweet-list">
      <div>
        <div v-if="loading">
          <div class="loading-card" v-for="item in placeholderArray" :key="item.id">
            <LoadingTweet />
          </div>
        </div>
        <div v-else-if="error">Error: {{ error }}</div>
        <div v-else-if="tweetsData">
          <div class="tweet-card" v-for="item in tweetsData" :key="item.id">
            <Tweet :tweet="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tweet from "./Tweet.vue"; 
import LoadingTweet from "./LoadingTweet.vue";
import { postTweet } from "../services/twitter-api";

export default {
  props: {
    loading: {
      type: Boolean,
      required: true
    },
    tweetsData: {
      type: Array,
      required: true
    },
    error: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      name: "",
      username: "",
      tweetText: "",
      characterCount: 0,
      placeholderArray: Array(20)
        .fill(null)
        .map((_, index) => ({ id: index + 1 })),
    };
  },
  methods: {
    async createTweet() {
      if (this.name === "" || this.username === "" || this.tweetText === "") {
        return;
      }

      const newTweet = {
        authorName: this.name,
        authorUserName: this.username,
        createdDate: Math.floor(Date.now() / 1000), // Current time in seconds
        tweetText: this.tweetText,
        likeCount: 0,
      };

      await postTweet(newTweet);

      // Reset input fields
      this.tweetText = "";

      this.$emit('tweet-created');

      await this.getAllTweets();
    },
    updateCharacterCount() {
      this.characterCount = this.tweetText.length;
    }
  },
  components: {
    Tweet, LoadingTweet
  },
};
</script>


<style scoped>
.middle-content {
  padding-left: 20%;
  padding-right: 20%;
  background: #575757;
  height: 100%;
  top: 0;
}

.create-tweet {
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background: #575757;
  padding: 3px;
  width: 60%;
  z-index: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.tweet-list {
  top: 0;
  padding-top: 215px;
  width: 100%;
  z-index: 1;
}

.tweet-card {
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 5px;
}

.loading-card {
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 5px;
}

.create-tweet textarea {
  width: 85%;
  height: 100px;
  margin-bottom: 1px;
  font-size: 20px;
  margin: 0 auto;
  display: block;
  position: relative;
  font-family: Arial, Helvetica, sans-serif;
}

.character-count {
  position: absolute;
  bottom: 5px;
  right: 10px;
  font-size: 13px;
  color: #888;
}

.character-count-max {
  position: absolute;
  bottom: 5px;
  right: 10px;
  font-size: 13px;
  color: #fd3939;
}

.identification {
    display: flex;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 5px;
}

.identification label,
.identification input {
    font-size: 20px;
    margin-right: 10px;
    width: 35%;
    margin: 0 auto;
    display: block;
}

#username {
  align-content: center;
}

.create-tweet button {
    width: 86%;
    height: 50px;
    background: #74C0FC;
    font-size: 35px;
    margin: 0 auto;
    display: block;
}
</style>
