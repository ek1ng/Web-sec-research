<template>
  <v-app>
    <v-main class="d-flex justify-center align-center">
      <v-card class="pa-16">
        <v-form>
          <v-text-field
            label="URL"
            v-model="url"
            :readonly="true"
          ></v-text-field>
          <v-text-field label="Username" v-model="username"></v-text-field>
          <v-btn @click="search">Search</v-btn>
        </v-form>
        <v-row>
          <v-col>
            <v-textarea
              v-model="text1"
              :readonly="true"
              label="vulnerable"
              auto-grow
            ></v-textarea>
          </v-col>
          <v-col>
            <v-textarea
              v-model="text2"
              :readonly="true"
              label="not vulnerable"
              auto-grow
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "App",

  data: () => ({
    url: "http://127.0.0.1:8080",
    username: "",
    text1: "",
    text2: "",
  }),
  methods: {
    search() {
      axios
        .get("/query_vul?username=" + this.username)
        .then((v) => {
          this.text1 = "State code: 200\n" + JSON.stringify(v.data);
        })
        .catch((e) => {
          this.text1 = `State code: ${e.response.status}\n ${JSON.stringify(
            e.response.data
          )}`;
        });
      axios
        .get("/query?username=" + this.username)
        .then((v) => {
          this.text2 = `State code: 200\n ${JSON.stringify(v.data)}`;
        })
        .catch((e) => {
          this.text2 = `State code: ${e.response.status}\n ${JSON.stringify(
            e.response.data
          )}`;
        });
    },
  },
};
</script>
