<template>
  <div class="chatty-projects">
    <div class="header"></div>
    <div class="body">
      <button
        class="submit-button"
        @click="addRelease = true"
        v-if="!addRelease && !loading && !failed"
      >
        <img
          src="@/assets/svg/file_upload_white_24dp.svg"
          height="42px"
          width="42px"
        />
      </button>
      <div class="loading-container" v-if="loading">
        <h2>Loading...</h2>
        <img src="@/assets/source.gif" height="258px" width="auto" />
      </div>
      <div class="failed-container" v-if="failed">
        <h2>That didn't work :(</h2>
        <img src="@/assets/loadfailed.png" height="265px" width="auto" />
        <button @click="retry">
          <img src="@/assets/refresh_white_24dp.svg" height="32px" /> Try Again
        </button>
      </div>
      <div class="release-items" v-if="!loading && !failed">
        <Release v-if="addRelease" v-on:close="addRelease = false" blank/>
        <Release
          v-for="(release, index) in releases"
          :key="index"
          :r="release"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Release from "@/components/chatty/Release.vue";
import { timeoutResponse } from "../../utils/Rest";
export default {
  name: "chatty",
  mounted() {
    this.retry();
  },
  data() {
    return {
      time: "",
      access: false,
      addRelease: false,
      releases: [
        {
          tag: "Loading...",
          title: "Releases are loading...",
          description: "Releases are loading...",
          msi: null,
        },
      ],
      loading: true,
      failed: false,
    };
  },
  components: { Release },
  methods: {
    retry(e) {
      this.loading = true;
      this.failed = false;
      timeoutResponse(2000, fetch(`${this.$api}/releases`))
        .then(async (res) => {
          let json = await res.json();
          this.loading = false;
          this.failed = false;
          this.releases = json;
        })
        .catch((err) => {
          this.failed = true;
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/main.scss";
.failed-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  flex-direction: column;
  button {
    @include button;
    display: flex;
    flex-direction: row;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 24px;
  }
}
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  flex-direction: column;
}
.submit-button {
  @include button($background-darker);
  color: $secondary;
  font-weight: bold;
  font-family: $font-ubuntu;
  padding: 5px;
  width: 177px;
  margin-top: 20px;
}
.header {
  display: flex;
  justify-content: left;
  align-items: center;
  flex-direction: row;
  color: $primary;
  h4 {
    margin-left: auto;
    color: white;
    opacity: 0.6;
  }
}
.release-items {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  padding: 5px;
  flex-direction: column;
}
.body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>