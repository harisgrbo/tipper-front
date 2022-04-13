<template>
  <div class="review-card">
    <div class="avatar-wrapper">

    </div>
    <h2>Jacob Nampson</h2>
    <span>Designer</span>
    <h2>Perfect</h2>
    <h3>Lorem ipsum amet, adipiscing elit. Libero aenean morbi.</h3>
    <div class="stars">
      <img v-for="i in 5" :key="i" src="/star.png" class="mr-sm" alt="">
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
  background: #fff;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  .avatar-wrapper {
    height: 60px;
    width: 60px;
    border-radius: 30px;
    background: #C4C4C4;
    opacity: 0.4;
  }

  h2 {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 27px;
    color: #1B1A1A;
    opacity: 0.4;
  }

  span {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    color: #1B1A1A;
    opacity: 0.4;
    margin-bottom: 20px;
  }

  h3 {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.03em;
    color: #1B1A1A;
    opacity: 0.3;
  }

  .stars {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

}
</style>
