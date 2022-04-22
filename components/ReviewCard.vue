<template>
  <div class="review-card">
    <div class="avatar-wrapper">
      <img src="/avatar.svg" alt="">
    </div>
    <h2>Jacob Nampson</h2>
    <span>Designer</span>
    <h2>Perfect</h2>
    <h3>Lorem ipsum amet, adipiscing elit. Libero aenean morbi.</h3>
    <div class="stars">
      <img v-for="i in 5" :key="i" src="/star.svg" class="mr-sm" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "ReviewCard"
}
</script>

<style scoped lang="scss">
.review-card {
  width: 233px;
  height: 350px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background-image: url("/review-bg.png");
  background-color: rgba(198, 125, 101, 0.35);

  .avatar-wrapper {
    height: 60px;
    width: 60px;
    border-radius: 30px;
    background: #C4C4C4;
    overflow: hidden;
    border: 4px solid #fff;
  }

  h2 {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 25px;
    color: #000000;
    margin-top: 16px;
  }

  span {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 19px;
    color: #000000;
  }

  h3 {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 24px;
    /* or 171% */

    letter-spacing: 0.03em;

    color: #000000;
  }

  .stars {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 12px;

    img {
      margin-right: 8px;
    }
  }

}
</style>
