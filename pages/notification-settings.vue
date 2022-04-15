<template>
  <div class="review-wrapper">
    <div class="w-full flex flex-row items-center justify-start">
      <button @click="$router.go(-1)">
        <img src="/static/arrow-left.png" alt="">
      </button>
      <div>
        <h2>Notification Settings</h2>
        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
      </div>
    </div>
    <div class="settings-wrapper">
      <span>Setting Manually</span>

      <ul class="w-full">
        <li>
          <p>Sender send tip</p>
          <input type="radio">
        </li>
        <li>
          <p>Employee received tip</p>
          <input type="radio">
        </li>
        <li>
          <p>Add bank account</p>
          <input type="radio">
        </li>
        <li>
          <p>Remove bank account</p>
          <input type="radio">
        </li>
        <li>
          <p>Welcome email</p>
          <input type="radio">
        </li>
        <li>
          <p>User removesd as employee</p>
          <input type="radio">
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
import InputField from "~/components/inputs/InputField";
export default {
  name: "notification-settings",
  components: {InputField},
  layout: 'standard',
}
</script>

<style scoped lang="scss">
.review-wrapper {
  width: 1240px;
  margin: 0 auto;
  min-height: 100vh;
  padding-bottom: 60px;

  button {
    height: 54px;
    width: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1.5px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    border-radius: 15px;
    margin-right: 27px;
  }

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

  .settings-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 44px;

    span {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 21px;
      letter-spacing: 0.01em;
      color: #1B1A1A;
      opacity: 0.4;
      margin-bottom: 20px;
    }

    ul {
      display: flex;
      flex-direction: column;

      li {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 15px;
        margin-bottom: 10px;
        padding: 0 24px;
        background: #fff;

        p {
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 21px;
          /* identical to box height */

          letter-spacing: 0.01em;

          color: #161616;

          opacity: 0.6;
        }
      }
    }
  }
}
</style>
