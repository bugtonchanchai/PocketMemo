<template>
  <v-app>
    <v-app-bar :clipped-left="primaryDrawer.clipped" app>
      <v-app-bar-nav-icon
        v-if="primaryDrawer.type !== 'permanent'"
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      />
      <v-toolbar-title>PocketMemo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="btnLogoutModel" small color="error" @click="btnLogout_click"
        >LOGOUT</v-btn
      >
    </v-app-bar>

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
        <v-list-item
          v-for="(menu, i) in mainMenu"
          :key="i"
          :to="menu.link"
          link
        >
          <v-list-item-action>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> {{ menu.text }} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

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
import firebase from "firebase";
import { getMainMenu } from "./js/getMainMenu";

export default {
  name: "App",

  components: {},

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
    mainMenu: [],
    btnLogoutModel: false
  }),

  methods: {
    btnLogout_click() {
      this.mainMenu = [];
      this.btnLogoutModel = false;
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

  created() {},

  beforeCreate() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.mainMenu = getMainMenu();
        this.btnLogoutModel = true;
      }
    });
  }
};
</script>
