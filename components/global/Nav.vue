<template>
  <div class="nav-bar">
    <div class="nav-bar-actions">
        <!-- <div class="extensions">
        <button :class="`nav-sw-button`">
          <img src="@/assets/svg/dash.svg" width="32px" height="32px">
        </button>
      </div> -->
      <div class="nav-button-container center">
        <NuxtLink to="/" :class="`nav-button center ${'/' == $nuxt.$route.path ? 'already-in' : ''}`">
          <img
            :src="require('@/assets/svg/home_white_24dp.svg')"
            width="32px"
            height="32px"
          />
        </NuxtLink>
      </div>
      <div class="separator" />
      <NuxtLink
        :to="target.path"
        v-for="(target, index) in targets"
        :key="index"
        :align="target.align"
        :color="target.color"
        :class="`nav-button center ${target.path == $nuxt.$route.path ? 'already-in' : ''}`"
        v-motion
        :initial="{y: -100}"
        :enter="{y: 0}"
        :delay="50 + (index + 35)"
      >
        <img :src="target.icon" width="32px" height="32px" />
        <span v-if="target.name">{{ target.name }}</span>
      </NuxtLink>
     
    </div>
   
  </div>
</template>

<script>
export default {
  props: {
    targets: {
      type: Array,
    },
  },
  setup() {},
  methods: {},
};
</script>

<style lang="scss">
@import "../../assets/main.scss";

:root {
  --background-modifier-hover: rgba(79, 84, 92, 0.16);
  --background-modifier-active: rgba(79, 84, 92, 0.24);
  --background-modifier-selected: rgba(79, 84, 92, 0.32);
  --background-modifier-accent: hsla(0, 0%, 100%, 0.06);
}
.nav-button {
  @include transparent-button;
  margin-right: 3px;
  margin-left: 3px;
  padding-top: 4px;
  padding-bottom: 4px;
  &.already-in {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }
  &[align="right"] {
    margin-left: auto;
  }
  &[color="blue"] {
    background: $secondary;
  }
}

.nav-bar-actions {
  display: flex;
  flex-direction: row;
  padding: 5px;
}
.nav-bar {
  background: $background-secondary-transparent;
  padding: 5px;
  border-radius: 15px;
}
.separator {
  width: 10px;
  height: 39px;
  background: var(--background-modifier-accent);
  border-radius: 25px;
  margin-right: 5px;
  margin-left: 5px;
  margin-top: auto;
  margin-bottom: auto;
}
.extensions {
  display: flex;
  flex-direction: column;
  justify-content: right;
  align-items: center;
  margin-top: auto;
  margin-bottom: auto;
}
.nav-sw-button {
  border-radius: 5px;
  padding: 1px;
  min-width: 38px;
  min-height: 38px;
  background: transparent;
  border: none;
  outline: none;
}
@media screen and (max-width: 550px) {
  .nav-bar-actions {
    align-items: center;
    justify-content: center;
  }
  .separator {
    display: none;
  }
}

</style>