<template>
  <div class="project">
    <div class="header">
      <div class="title">
        <slot name="title" class="title" />
      </div>
      <div class="body">
        <slot name="body" />
      </div>
    </div>
    <div class="main">
      <slot name="main" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../../assets/main.scss";
.project {
  @include project;
  width: 85%;
  padding: 5px;
  margin-top: 20px;
  max-width: fit-content;
}
.header {
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}
.title {
  font-size: 32px;
  font-weight: bold;
}

.body {
  padding: 10px;
  background: #222222;
  border-radius: 15px;
  margin-top: 10px;
  color: #bb86fc;
  width: 75%;
  align-items: center;
  text-align: center;
}
@keyframes fadeIn {
  0% {
    opacity: 0%;
  }
  100% {
    opacity: 100%;
  }
}
</style>