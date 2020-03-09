<template>
  <h1>Home</h1>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Home",

  beforeCreate() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.$router.replace({ name: "Login" });
      }
    });
  }
};
</script>
