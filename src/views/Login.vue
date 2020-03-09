<template>
  <v-card class="mx-auto" max-width="450" outlined>
    <v-form v-model="valid">
      <v-container>
        <v-text-field
          v-model="form.email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          v-model="form.password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          hint="At least 8 characters"
          counter
          @click:append="show1 = !show1"
        ></v-text-field>
      </v-container>
    </v-form>
    <v-card-actions>
      <v-btn text color="primary" @click="btnLogin_click">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      valid: false,
      show1: false,
      form: {
        email: "admin@pocketmemo.com",
        password: "123456"
      },
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 6 || "Min 6 characters",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  methods: {
    btnLogin_click() {
      if (!this.valid) {
        return;
      }
      // console.log("valid : " + this.valid);

      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          this.$router.replace({ name: "Home" });
          console.log(data);
        })
        .catch(err => {
          alert(err.message);
        });
    }
  }
};
</script>

<style></style>
