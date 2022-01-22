<template>
  <div class="external-action">
    <a :href="src" target="_blank">
      <img :src="icon" height="100px" width="100px" class="external-img" />
    </a>
  </div>
</template>


<script>
export default {
  name: "external-link",
  props: {
    icon: Object,
    src: String,
  },
};
</script>

<style lang="scss">
.external-action:hover {
  transform: translateY(-6px);
  transition: all 0.2s ease-in-out;
}
@media screen and (max-width: 550px) {
  .external-img {
      height: 64px;
      width: 64px;
  }
}
</style>