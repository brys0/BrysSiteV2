<template>
  <div class="main-self">
    <div class="center video-container">
      <video
        :src="require('@/assets/retrowave.mp4')"
        autoplay
        type="video/mp4"
        muted
        loop
        v-if="!$mobile || $mobile && $bypass"
      />
    </div>
    <Profile/>

    <div class="actions-container">
      <div class="actions">
        <ExternalLink
          :icon="require('../assets/svg/icons8-github.svg')"
          src="https://github.com/Brys0"
        />
        <ExternalLink
          :icon="require('../assets/br4d.vip.png')"
          src="https://br4d.vip"
        />
        <ExternalLink
          :icon="require('../assets/svg/icons8-discord.svg')"
          src="https://discord.com/users/443166863996878878"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  components: {
    ExternalLink: () => import("../components/ExternalLink.vue"),
    Profile: () => import("../components/Profile.vue"),
  },
  head() {
    return {
      title: "Brys's Site 🡲 Home",
      meta: [
        {
          hid: "og:title",
          property: "og:title",
          content: "Brys's Site 🡲 Home",
        },
      ],
    };
  },

  mounted() {
  },
  methods: {
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/main.scss";
.main-self {
  overflow: hidden;
}
.main-self video {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
    filter: blur(5px);
}
.video-container {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
  opacity: 0.2;
}
.actions-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  border-radius: 15px;
}
.actions {
  background: transparent;
  display: flex;
  flex-direction: row;
  padding-left: 15%;
  padding-right: 15%;
  border-radius: 22px;
}
.__layout {
  background: black;
}
// @media screen and (max-width: 550px) {
//   .actions {

//   }
// }
</style>
