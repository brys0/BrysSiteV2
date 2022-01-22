<template>
  <div class="projects-path">
    <ImageGen v-motion-slide-top />
    <Updater v-motion-slide-top/>
    <Project v-motion-slide-top>
      <template v-slot:title> More Coming Soon... </template>
      <template v-slot:body>💖</template>
    </Project>
  </div>
</template>
<script>
import Project from "../components/projects/index.vue";
import Updater from "../components/projects/d/Updater.vue";
export default {
  name: "projects",
  components: {
    ImageGen: () => import("../components/projects/d/ImageGen.vue"),
    Project,
    Updater
},
  head() {
    return {
      title: "Brys's Site 🡲 Projects",
      meta: [
        { hid: "og:title", property: "og:title", content: "My Projects C:" },
        {
          hid: "og:url",
          property: "og:url",
          content: "https://feuer.tech/projects",
        },
        {
          name: "theme-color",
          content: "#ffbe69",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.projects-path {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>