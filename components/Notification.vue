<template>
  <div class="notification-box-wrapper">
    <img :src="notification.img + '.svg'" alt="">
    <b>{{ notification.amount + ' ' + notification.currency }}</b>
    <span>{{ notification.text }}</span>
  </div>
</template>

<script>
export default {
  name: "Notification",
  props: ['notification']
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
  margin-bottom: 10px;
  width: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);


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
    color: #C67D65;
    min-width: fit-content;
  }

  span {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.01em;
    color: #000;
    opacity: 0.4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
