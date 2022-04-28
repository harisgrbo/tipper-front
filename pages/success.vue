<template>
  <div class="success-page-wrapper">
    <div class="success-page-wrapper__content">
      <div class="image-wrapper"></div>
      <h3>Thank You</h3>
      <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit auctor purus tempus</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "success",
  layout: 'standard'
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}
.success-page-wrapper {
  display: flex;
  flex-direction: column;
  width: 1240px;
  margin: 0 auto;
  min-height: 100vh;
  padding-bottom: 60px;

  @include for-phone-only {
    width: 100%;
    padding: 24px;
    background: #F7F8FA;
  }

  &__header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    h2 {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 800;
      font-size: 38px;
      line-height: 57px;
      color: #000000;
      margin-bottom: 26px;
    }
  }

  &__content {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 230px);

    .image-wrapper {
      height: 154px;
      width: 154px;
      background: #fff;
      border-radius: 78px;
      margin-bottom: 56px;
    }
    span {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      /* or 167% */

      text-align: center;
      letter-spacing: 0.02em;

      color: #000000;

      opacity: 0.4;
    }

    h3 {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 34px;
      line-height: 51px;
      /* identical to box height */

      text-align: center;
      margin-bottom: 18px;
      color: #000000;
    }
  }
}
</style>
