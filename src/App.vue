<template>
  <v-app>
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :clipped="primaryDrawer.clipped"
      :floating="primaryDrawer.floating"
      :mini-variant="primaryDrawer.mini"
      :permanent="primaryDrawer.type === 'permanent'"
      :temporary="primaryDrawer.type === 'temporary'"
      app
      overflow
    >
      <v-list dense>
        <v-list-item v-for="(menu, i) in menus" :key="i" :to="menu.link" link>
          <v-list-item-action>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> {{ menu.text }} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="primaryDrawer.clipped" app>
      <v-app-bar-nav-icon
        v-if="primaryDrawer.type !== 'permanent'"
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      />
      <v-toolbar-title>PocketMemo</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer :inset="footer.inset" app>
      <span class="px-4">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBZhHFEnBJaKpu2EZnjPBR1IEe9HiUllZM",
  authDomain: "pocketmemo-1b609.firebaseapp.com",
  databaseURL: "https://pocketmemo-1b609.firebaseio.com",
  projectId: "pocketmemo-1b609",
  storageBucket: "pocketmemo-1b609.appspot.com",
  messagingSenderId: "325435825243",
  appId: "1:325435825243:web:41cb658726e93cb57b337e",
  measurementId: "G-T3Q33FKT3F"
};
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

export default {
  name: "App",

  data: () => ({
    drawers: ["Default (no property)", "Permanent", "Temporary"],
    primaryDrawer: {
      model: null,
      type: "default (no property)",
      clipped: false,
      floating: false,
      mini: false
    },
    footer: {
      inset: false
    },
    menus: []
  }),

  methods: {
    getMmenu() {
      let arr = [];
      db.collection("mmenus")
        .where("status", "==", true)
        // .orderBy("status")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(function(doc) {
            arr.push(doc.data());
            console.log(doc.data());
          });
        });
      return arr;
    }
  },

  created() {
    this.menus = this.getMmenu();
    // this.$vuetify.theme.dark = true;
    // db.collection("mmenus").onSnapshot(querySnapshot => {
    //   querySnapshot.forEach(doc => {
    //     this.menus.push(doc.data());
    //     console.log(doc.data());
    //   });
    // });
  },

  components: {}
};
</script>
