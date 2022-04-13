<template>
  <div class="flex flex-col w-full main-layout">
    <Header></Header>
    <nuxt></nuxt>
  </div>
</template>

<script>
import Header from "@/components/Header"
export default {
  name: "standard",
  components: {Header}
}
</script>

<style scoped lang="scss">
.main-layout {
  background: #F7F8FA;
}
</style>
