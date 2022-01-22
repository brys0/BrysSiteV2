<template>
  <Project>
    <template v-slot:title>Image Gen
    </template>
    <template v-slot:body
      >Image Generation API for Apollo written in Kotlin</template
    >
    <template v-slot:main>
      <div class="mobile" v-if="mobile">
        <h3 style="text-align: center; color: yellow">
          Not supported for mobile browsers ⚠️
        </h3>
      </div>

      <div class="main-interactable" v-if="!mobile">
        <div class="options">
          <div class="selectable">
            <label for="path"
              >Image Generator
              <div class="gateway">
                <div class="gateway-text">
                  <div :class="`icon ${hostStatus}`" />
                  <input type="text" v-model="host" @input="testURL(host)" />
                </div></div
            ></label>
            <div class="layered">
              <input type="text" name="path" v-model="path" />
              <span><code>/np</code> <code>/add</code></span>
            </div>
          </div>
        </div>
        <div class="interactable-body">
          <span>Request Body</span>
          <div class="interactable-actions">
            <div class="request-body-inputs">
              <div class="input-request">
                <div class="request-body-title"><span>Title: </span></div>
                <input type="text" v-model="data.title" />
              </div>
              <div class="input-request">
                <div class="request-body-title"><span>Author: </span></div>
                <input type="text" v-model="data.author" />
              </div>
              <div class="input-request">
                <div class="request-body-title">
                  <span>Duration: </span>
                </div>
                <input type="number" v-model="data.duration" />
              </div>
              <div class="input-request">
                <div class="request-body-title">
                  <span>Position: </span>
                </div>
                <input type="number" v-model="data.position" />
              </div>
              <div class="input-request">
                <div class="request-body-title">
                  <span>ID: </span>
                </div>
                <input type="text" v-model="data.identifier" />
              </div>
              <div class="input-check">
                <button
                  @click="corsMode = 'no-cors'"
                  v-if="corsMode == 'cors'"
                  :class="`input-check`"
                  off="true"
                >
                  Turn Off CORS
                </button>
                <button
                  @click="corsMode = 'cors'"
                  v-if="corsMode == 'no-cors'"
                  :class="`input-check`"
                  off="false"
                >
                  Turn On CORS
                </button>
              </div>
            </div>
            <div class="img-res-container">
              <button class="req-button" @click="sendRequest">
                {{ sendName }}
              </button>
              <img :src="resIMG" class="img-res" v-if="whenImage" />
              <div class="img-res" v-if="!whenImage" />
              <span class="res-margin">
                {{ response }}
              </span>
            </div>
          </div>
          <div class="src">
            <a href="https://github.com/PhazorWorks/image-gen/tree/kotlin" target="_blank">
              <button class="src-overlay">
                <img :src="require('@/assets/svg/icons8-github.svg')" height="32px" width="32px">
              </button>
            </a>
          </div>
        </div>
      </div>
    </template>
  </Project>
</template>



<script>
import Project from "@/components/projects";
import { timeoutResponse } from "@/utils/Rest";
import _ from "lodash";
let state;
function testURLBackend(URL) {
  timeoutResponse(100, fetch(URL))
    .then(async (res) => {
      state.hostStatus = "online";
    })
    .catch((err) => {
      state.hostStatus = "offline";
    });
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default {
  name: "ImageGen",
  components: { Project },
  mounted() {
    this.mobile = this.isMobile();
    state = this;
    testURLBackend(this.host);
  },
  methods: {
    async sendRequest(e) {
      const ctx = this;
      try {
        ctx.$axios.interceptors.request.use(
          function (config) {
            config.metadata = { startTime: new Date() };
            return config;
          },
          function (error) {
            return Promise.reject(error);
          }
        );
        ctx.$axios.interceptors.response.use(
          function (response) {
            response.config.metadata.endTime = new Date();
            response.duration =
              response.config.metadata.endTime -
              response.config.metadata.startTime;
            return response;
          },
          function (error) {
            error.config.metadata.endTime = new Date();
            error.duration =
              error.config.metadata.endTime - error.config.metadata.startTime;
            return Promise.reject(error);
          }
        );
        const req = await ctx.$axios({
          timeout: 5000,
          url: `${this.host}${this.path}`,
          method: "POST",
          headers: {
            "Content-Type": 'application/json'
          },
          mode: this.corsMode,
          crossdomain: true,
          data: JSON.stringify(this.data),
          responseType: "blob",
        });
        if (req.status === 200) {
          let base = URL.createObjectURL(req.data);
          this.resIMG = base;
          this.whenImage = true;
          this.response = req.duration + "ms";
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    testURL: _.debounce((e) => {
      testURLBackend(e);
    }, 150),
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  data() {
    return {
      host: "http://localhost:3002",
      hostStatus: "loading",
      whenImage: false,
      response: "No String Data",
      sendName: "Send",
      data: {
        title: "Never Gonna Give You Up",
        author: "Rick Astley",
        duration: 100,
        position: 50,
        identifier: "dQw4w9WgXcQ",
      },
      resIMG: "null",
      path: "/np",
      test: false,
      mobile: false,
      corsMode: "cors",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/main.scss";
.projects-path {
  display: flex;
  justify-content: center;
}
.main-interactable {
  background: $background;
  padding: 10px;
  border-radius: 15px;
  margin-top: 10px;
}
.selectable {
  display: flex;
  width: fit-content;
  justify-content: center;
  flex-direction: column;
  label {
    font-weight: bold;
    font-size: 24px;
    padding-bottom: 5px;
  }
  input {
    border: 0;
    outline: 0;
    background: $background-secondary;
    color: white;
    padding: 5px;
    width: 50%;
    height: 30px;
    font-size: 24px;
    border-radius: 10px;
  }
  .layered {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    span {
      margin-left: 10px;
      font-size: 20px;
      code {
        background: rgb(49, 49, 49);
        padding: 5px;
        border-radius: 5px;
      }
    }
  }
}
.v-select {
  width: 200px;
  margin-left: 10px;
  background: $background-secondary;
  color: white !important;
}
.gateway {
  font-size: 16px;
  color: rgb(97, 97, 97);
  display: flex;
  flex-direction: row;
}
.gateway-text {
  display: inline-flex;
  flex-direction: row-reverse;
  justify-content: left;
  width: 100%;
  input {
    background: rgb(27, 27, 27);
    width: 55% !important;
    border-radius: 5px;
    height: 20px;
    font-size: 18px;
    color: gray;
  }
}
.icon {
  height: 8px;
  width: 8px;
  &.online {
    background-color: rgb(74, 207, 81);
  }
  &.loading {
    background: rgb(88, 88, 88);
  }
  &.offline {
    background: rgb(255, 57, 57);
  }
  border-radius: 50%;
  margin-left: 5px;
}
.interactable-body {
  margin-top: 15px;
  font-weight: bold;
}

.input-request {
  margin-top: 5px;
  span {
    width: 200px;
  }
  input {
    background: $background-secondary;
    color: white;
    padding: 5px;
    border: 0;
    outline: 0;
  }
}
.img-res-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
}
.img-res {
  width: 500px;
  height: 250px;
  margin: 10px;
  border: $secondary 2px solid;
  border-radius: 5px;
}
.interactable-actions {
  display: flex;
  flex-direction: row;
}
.res-margin {
  margin-top: 20px;
}
.req-button {
  @include button;
  cursor: pointer;
  font-size: 24px;
  width: 128px;
  margin-top: -55px;
}
.input-check {
  button[off="true"] {
    @include button($error);
    color: black;
    font-weight: bold;
    margin-top: 20px;
  }
  button[off="false"] {
    @include button($secondary);
    color: black;
    font-weight: bold;
    margin-top: 20px;
  }
  font-size: 22px;
  cursor: pointer;
}
.slide-leave-active,
.slide-enter-active {
  transition: 200ms;
}
.slide-enter {
  transform: translate(-100%, 0);
}
.slide-leave-to {
  transform: translate(100%, 0);
}
.src {
  margin-top: 10px;
  display: flex;
  justify-content: right;
}
.src-overlay {
  @include button;
  margin-right: 3px;
  margin-left: 3px;
  &.already-in {
    opacity: 0.6;
    cursor:not-allowed;
    pointer-events: none;
  }
}
</style>