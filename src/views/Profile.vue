<template>
  <div id="profile">
    <h2>{{ user.name }}</h2>
    <p>Email: {{ user.email }}</p>
    <p>Username: {{ user.username }}</p>
    <!-- Add more profile information as needed -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        username: 'johndoe',
        // Add more user information as needed
      },
    };
  },
};
</script>

<style scoped>
#profile {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-left: 500px; /* Adjust the margin-left property */
}

h2 {
  color: #333;
}

/* Add more styling as needed */
</style>
