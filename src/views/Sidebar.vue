<template>
  <div>
    <div class="left-sidebar">
      <div class="sidebar-filter">
        <button @click="applyFilter('latest')" :class="{ active: filter === 'latest' }">Latest</button>
        <button @click="applyFilter('popular')" :class="{ active: filter === 'popular' }">Popular</button>
        <div class="date-filter">
        <div class="scrolling-container">
          <button v-for="dateFilter in dateFilters" :key="dateFilter.value" @click="applyFilter(dateFilter.value)" :class="{ active: filter === dateFilter.value }">{{ dateFilter.label }}</button>
        </div>
      </div>
      </div>
    </div>
    <div class="right-sidebar"></div>
    <CreateAndListTweets :tweetsData="filteredTweets" :error="error" :loading="loading" @tweet-created="getAllTweets" />
  </div>
</template>

<script>
import { fetchTweets } from "../services/twitter-api";
import CreateAndListTweets from './CreateAndListTweets.vue';

export default {
  data() {
    return {
      filter: 'latest',
      allTweets: null,
      filteredTweets: null,
      loading: true,
      error: null,
      dateFilters: [
        { label: 'Today', value: 'today' },
        { label: 'This Week', value: 'this-week' },
        { label: 'This Month', value: 'this-month' },
      ],
    };
  },
  methods: {
    getAllTweets() {
      this.loading = true;
      this.error = null;
      this.allTweets = null;
      this.filteredTweets = null;

      fetchTweets()
        .then((response) => {
          this.allTweets = [...response]; // Create a new array instance
          this.filteredTweets = [...response]; // Create a new array instance
        })
        .catch((error) => {
          this.error = error.message || "An error occurred.";
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getTodayTimestamp() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Math.floor(today.getTime() / 1000);
    },
    getThisWeekTimestamp() {
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setHours(0, 0, 0, 0);
      startOfWeek.setDate(today.getDate() - today.getDay());
      return Math.floor(startOfWeek.getTime() / 1000);
    },
    getThisMonthTimestamp() {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        startOfMonth.setHours(0, 0, 0, 0);
        return Math.floor(startOfMonth.getTime() / 1000);
    },
    filterTweetsByDate(startDate) {
      this.filteredTweets = this.allTweets.filter(tweet => tweet.createdDate >= startDate);
    },
    applyFilter(filter) {
      this.filter = filter;
      if (this.filter === 'latest' && this.allTweets) {
        this.filteredTweets = this.allTweets.sort((a, b) => b.createdDate - a.createdDate);
      } else if (this.filter === 'popular' && this.allTweets) {
        this.filteredTweets = this.allTweets.sort((a, b) => b.likeCount - a.likeCount);
      } else if (this.filter === 'today') {
        this.filterTweetsByDate(this.getTodayTimestamp());
      } else if (this.filter === 'this-week') {
        this.filterTweetsByDate(this.getThisWeekTimestamp());
      } else if (this.filter === 'this-month') {
        this.filterTweetsByDate(this.getThisMonthTimestamp());
      }
    },
  },
  created() {
    this.getAllTweets();
  },
  components: {
    CreateAndListTweets
  }
};
</script>

<style scoped>
.left-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 20%;
  height: 100%;
  background-color: #333;
  color: #fff;
  z-index: 2;
}

.sidebar-filter {
  display: flex;
  flex-direction: column;
  padding: 25px;
}

.right-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 20%;
  height: 100%;
  background: #333;
  z-index: 100;
}

button {
  background-color: #555;
  color: #fff;
  border: none;
  padding: 10px;
  margin-bottom: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #777;
}

button.active {
  background-color: #74C0FC;
  color: #333;
}

.date-filter {
  margin-top: 20px;
}

.scrolling-container {
  display: flex;
  overflow-x: auto;
}

.scrolling-container button {
  white-space: nowrap;
  margin-right: 10px;
}
</style>
