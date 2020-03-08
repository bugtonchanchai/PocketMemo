<template>
  <v-btn color="red" @click="btnLogout_click">Logout</v-btn>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Home",

  methods: {
    btnLogout_click() {
      firebase
        .auth()
        .signOut()
        .then(data => {
          this.$router.replace({ name: "Login" });
          console.log(data);
        })
        .catch(err => {
          console.log("error : " + err.message);
        });
    }
  },

  beforeCreate() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.$router.replace({ name: "Login" });
      }
    });
  }
};
</script>
