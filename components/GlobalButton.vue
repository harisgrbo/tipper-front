<template>
  <button class="global-button" :style="{ 'background': bgColor, 'width': width }" @click="handleButtonAction">
    {{ placeholder }}
  </button>
</template>

<script>
export default {
  name: "GlobalButton",
  props: ['placeholder', 'bgColor', 'width'],
  methods: {
    handleButtonAction() {
      this.$emit('handle-button-action');
    }
  }
}
</script>

<style scoped lang="scss">
.global-button {
  height: 54px;
  background: #F3F3F3;
  border-radius: 12px;
  width: 100%;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  opacity: 0.4;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
}
</style>
