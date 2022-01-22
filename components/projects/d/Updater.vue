<template>
  <Project>
    <template v-slot:title>Updater</template>
    <template v-slot:body
      ><b>NUC</b> (Native Updater Component) for Chatty</template
    >
    <template v-slot:main>
      <div class="main-interactable">
          <div class="update-options center">
              <button class="options-button">Start</button>
          </div>
          <div class="compound-progress center" :style="`width: ${complete}%`">
              <div class="inner-progress"/>
          </div>
          
      </div>
    </template>
  </Project>
</template>

<script>
import Project from "@/components/projects";
export default {
  name: "updater",
  components: { Project },
  props: {
    
  },
  mounted() {
    let ctx = this;
  
  },
  data() {
    return {
      complete: 20
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/main.scss";
.main-interactable {
  background: $background;
  padding: 10px;
  border-radius: 15px;
  margin-top: 10px;
}
.compound-progress {
  width: 0%;
    height: 20px;
    border-radius: 15px;
    .inner-progress {
        width: 100%;
        height: inherit;
        background: linear-gradient(90deg, #8E2DE2 0%, #4A00E0 100%);
        border-radius: 15px;
        transition: all 100ms ease-in-out;
    }
}
.update-options {
    .options-button {
        @include button($secondary);
        font-weight: bold;
        font-size: 25px;
        width: 125px;
    }
}
</style>