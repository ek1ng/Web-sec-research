<template>
  <v-container>
    <v-card
        class="mx-auto"
        max-width="500"
        min-height="500"
    >
      <v-row
        justify="center"
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
              label="文件名"
              outlined
              v-model="filename"
              disabled
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row
          align="center"
          justify="space-around"
      >
        <v-btn
            color="primary"
            @click="download"
        >
          打开文件
        </v-btn>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'GetFile',
    watch: {
      "$route": {
        immediate: true,
        handler: async function(newRoute) {
          if(newRoute.query.filename) {
            this.filename = newRoute.query.filename
          } else {
            this.$router.push('?filename=1.txt')
          }
        }
      }
    },
    data: () => ({
      filename: '',
      axios,
    }),
    methods: {
      download() {
        axios.get('http://127.0.0.1:3000/file?filename='+this.filename, {
          responseType: 'blob',
        }).then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          document.body.appendChild(link);
          link.click();
        }).catch(error => {
          console.log('error:' + JSON.stringify(error))
        });
      },
    },
  }
</script>
