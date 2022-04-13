<template>
  <div class="notification-box-wrapper">
    <img src="/wallet.png" alt="">
    <b>You got the $10 tips</b>
    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique risus iaculis ante habitant ut non ac in. Sed dapibus lorem porttitor.</span>
  </div>
</template>

<script>
export default {
  name: "Notification"
}
</script>

<style scoped lang="scss">
.notification-box-wrapper {
  display: flex;
  flex-display: row;
  align-items: center;
  justify-content: flex-start;
  height: 60px;
  background: #FFFFFF;
  border-radius: 10px;
  padding: 0 24px;
  max-height: 60px;
  margin-bottom: 8px;

  img {
    margin-right: 18px;
  }

  b {
    margin-right: 22px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.01em;
    color: #000000;
    opacity: 0.4;
  }

  span {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.01em;
    color: #161616;
    opacity: 0.3;
  }
}
</style>
