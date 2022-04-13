<template>
  <div class="w-full flex flex-col">
    <div class="max-w-7xl mx-auto">
      index
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header"
export default {
  components: {
    Header
  },
  layout: 'standard',
  mounted() {
    if(this.$auth.user && this.$auth.user.type === 'employer') {
      this.$router.push('/index-employer');
    } else {
      this.$router.push('/index-employee');
    }
  }
}
</script>
