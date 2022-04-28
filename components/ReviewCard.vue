<template>
  <div class="review-card" @click="$emit('open-review-card-modal')">
    <div class="avatar-wrapper">
      <img :src="user.avatar || '/noimage.png'" alt="">
    </div>
    <h2>{{ user.name }}</h2>
    <span>Developer</span>
    <h2>{{ user.description }}</h2>
    <h3>{{ user.description }}</h3>
    <div class="stars">
      <star-rating :star-size="15" :increment="1" :inline="true" read-only="true" inactive-color="#F0EBE4" :show-rating="true" active-color="#C67D65" v-model="user.rating"></star-rating>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReviewCard",
  props: ['user']
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

  &:hover {
    cursor: pointer;
  }

  .avatar-wrapper {
    height: 60px;
    width: 60px;
    min-height: 60px;
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
