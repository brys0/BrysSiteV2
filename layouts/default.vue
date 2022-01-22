<template>
  <div class="app-layout">
    <Nav
      :targets="[
        {
          icon: require('@/assets/svg/folder_white_24dp.svg'),
          path: '/projects',
        },
        {
          icon: require('@/assets/svg/dashboard_white_24dp.svg'),
          path: '/chatty',
          align: 'left',
          color: 'blue',
        },
        {
          icon: require('@/assets/svg/login_white_24dp.svg'),
          path: '/login',
          align: 'right',
          color: 'blue',
        },
      ]"
    />
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: "default",
  components: { Nav: () => import("@/components/global/Nav") },
};
</script>

<style lang="scss" scoped>
</style>