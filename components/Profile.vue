<template>
  <div class="profile-container" :class="onceProfile ? '' : 'hidden'">
    <div class="profile-avatar-container center">
      <img
        src="@/assets/profile.gif"
        height="265px"
        width="265px"
        class="profile-img"
        @load="onceProfile = true"
        v-if="!$mobile || $mobile && $bypass"
      />
      <img
        src="@/assets/svg/warning.svg"
        height="265px"
        width="265px"
        class="profile-img fallback"
        @load="onceProfile = true"
        v-if="$mobile && !$bypass"
      />
      <span class="profile-avatar-name ta">Brys#7692</span>
    </div>
    <div class="profile-bio center">
      <span class="ta"> Hi! I'm Brys and I make things :p </span>
      <div class="detailed-bio">
        <span class="detailed-bio-data ta">
          I know a few languages I suppose<br />
          I like to talk to a few people I suppose<br />
          I'm on a few platforms I suppose
          <div class="detailed-bio-mobile-fallback" v-if="$mobile">
            <span v-if="$bypass" bypass="true">Bypass enabled</span>
             <button class="notice-accept" @click="removeBypass" v-if="$bypass">
                <img
                  src="@/assets/svg/refresh_white_24dp.svg"
                  height="22px"
                  width="22px"
                />
              </button>
            <div class="notBypass detailed-bio-mobile-fallback" v-if="!$bypass">
              <span
                ><b class="notice">1.</b> The background video is disabled to
                reduce data usage</span
              >
              <span
                ><b class="notice">2.</b> The profile icon is disabled to reduce
                data usage</span
              >
              <span class="button-explanation"
                >Tap to reload with images enabled</span
              >
              <button class="notice-accept" @click="bypassFallback">
                <img
                  src="@/assets/svg/refresh_white_24dp.svg"
                  height="22px"
                  width="22px"
                />
              </button>
            </div>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mobile: Boolean,
  },
  methods: {
    bypassFallback() {
      localStorage.setItem("bypass", true);
      location.reload();
    },
    removeBypass() {
      localStorage.setItem("bypass", false);
      location.reload();
    }
  },
  data() {
    return {
      onceProfile: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/main.scss";

.profile-avatar-name {
  font-weight: bold;
  color: $primary;
  margin-top: 40px;
  font-size: 250%;
}
.profile-avatar-container {
  margin-top: 40px;
  flex-direction: column;
}
.profile-img {
  border-radius: 50%;
  border: $secondary 5px solid;
  transition: 200ms all ease-in-out;
  object-fit: cover;
}
.profile-img:hover {
  border-color: $primary;
}
.profile-bio {
  margin-top: 35px;
  color: $secondary;
  font-size: 150%;
  display: flex;
  flex-direction: column;
}
.detailed-bio {
  background: $background-secondary;
  padding: 15px;
  border-radius: 15px;
  color: rgb(172, 172, 172);
  margin-top: 25px;
}
.detailed-bio-mobile-fallback {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: $primary;
  span[bypass="true"] {
    color: #f1ff28;
  }
  .notice {
    font-size: 22px;
    color: $error;
  }
  .notice-accept {
    @include button(#272a38);
    font-weight: bold;
    color: rgb(68, 253, 130);
    font-size: 24px;
    img {
      margin: auto;
      vertical-align: middle;
      margin-bottom: 3px;
    }
  }
}
.button-explanation {
  margin-top: 10px;
  color: $secondary;
  margin-bottom: 5px;
}
</style>