<template>
  <div class="testcomponent">
    <v-row>
      <v-col cols="12" md="2">
        <v-text-field label="NAME" v-model="name"></v-text-field
      ></v-col>
      <v-col cols="12" md="2"
        ><v-text-field label="TEL" v-model="tel"></v-text-field
      ></v-col>
      <v-col cols="12" md="2"
        ><v-btn color="primary" @click="insertToContact(tel, name)">Add</v-btn>
      </v-col>
    </v-row>

    <v-list-item two-line :key="key" v-for="(contact, key) in contacts">
      <v-list-item-content>
        <v-list-item-title
          >{{ contact.name }}
          <v-btn x-small="" color="red" @click="deleteContact(contact.id)"
            >Delete</v-btn
          ></v-list-item-title
        >
        <v-list-item-subtitle>Tel : {{ contact.tel }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <!-- <ul :key="key" v-for="(contact, key) in contacts">
      <li v-if="updateKey === key">
        <v-btn small="" @click="updateContact(updateTel, updateName)"
          >Save</v-btn
        >
        <input type="text" v-model="updateName" placeholder="NAME" />
        <input type="text" v-model="updateTel" placeholder="TEL" />
      </li>
      <li v-else>
        <v-btn small="" @click="setUpdateContact(key, contact)">Update</v-btn>
        <v-btn small="" @click="deleteContact(contact.id)">Delete</v-btn>
        {{ contact.name }} : {{ contact.tel }}
      </li>
    </ul> -->
  </div>
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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

var db = firebase.firestore();

export default {
  name: "TestComponent",

  data: () => ({
    contacts: {},
    tel: "",
    name: "",
    updateTel: "",
    updateName: "",
    updateKey: ""
  }),

  methods: {
    insertToContact(tel, name) {
      let data = {
        tel: tel,
        name: name
      };
      db.collection("contacts").add(data);

      this.tel = "";
      this.name = "";
    },
    setUpdateContact(key, contact) {
      this.updateKey = key;
      this.updateTel = contact.tel;
      this.updateName = contact.name;
    },
    updateContact(tel, name) {
      // contactRef.child(this.updateKey).update({
      //   tel: tel,
      //   name: name
      //  });

      console.log(tel + name);

      this.updateKey = "";
      this.updateTel = "";
      this.updateName = "";
    },
    deleteContact(key) {
      // console.log(key);
      db.collection("contacts")
        .doc(key)
        .delete()
        .then(function() {
          console.log("Document successfuly deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    }
  },
  mounted() {
    // db.collection("contacts")
    //   .get()
    //   .then(querySnapshot => {
    //     // this.contacts = querySnapshot.docs;
    //     // console.log(this.contacts);
    //     let arr = [];
    //     querySnapshot.forEach(doc => {
    //       arr.push(doc.data());
    //     });
    //     this.contacts = arr;
    //   });

    db.collection("contacts").onSnapshot(querySnapshot => {
      let arr = [];
      querySnapshot.forEach(doc => {
        let item = {
          id: doc.id,
          name: doc.data().name,
          tel: doc.data().tel
        };
        arr.push(item);
      });
      this.contacts = arr;
      console.log(this.contacts);
    });
  }
};
</script>
