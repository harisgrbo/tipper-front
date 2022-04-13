<template>
  <div class="notification-wrapper">
    <div class="w-full flex flex-row items-center justify-start">
      <div>
        <h2>Notification</h2>
        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
      </div>
    </div>
    <div class="notification-list-wrapper">
     <Notification v-for="i in 6" :key="i"></Notification>
    </div>
  </div>
</template>

<script>
export default {
  name: "notification",
  layout: 'standard',
}
</script>

<style scoped lang="scss">
.notification-wrapper {
  width: 1240px;
  margin: 0 auto;
  min-height: 100vh;
  padding-bottom: 60px;

  h2 {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 45px;
    color: #1B1A1A;
  }

  span {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    margin-top: 8px;
    letter-spacing: 0.01em;
    color: #161616;
    opacity: 0.3;
  }

  .notification-list-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 44px;
  }
}
</style>
