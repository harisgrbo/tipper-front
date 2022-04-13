<template>
  <div class="review-wrapper">
    <div class="w-full flex flex-row items-center justify-start">
      <button @click="$router.go(-1)">
        <img src="/static/arrow-left.png" alt="">
      </button>
      <div>
        <h2>Employee Settings</h2>
        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
      </div>
    </div>
    <div class="settings-wrapper">
      <div class="form-wrapper">
        <InputField placeholder="John Doe" label="Employee Nickname" bg-color="#fff" class="mb-6"></InputField>
        <InputField placeholder="John Doe" label="Job Title" bg-color="#fff" class="mb-6"></InputField>
        <InputField placeholder="John Doe" label="Bank Account" bg-color="#fff" class="mb-6"></InputField>
        <InputField placeholder="John Doe" label="Additional code" bg-color="#fff" class="mb-6"></InputField>
      </div>
      <div class="mb-6">
        <h2>Payment Settings</h2>
        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
      </div>
      <div class="form-wrapper">
        <InputField placeholder="John Doe" label="Card Number" bg-color="#fff" class="mb-6"></InputField>
        <InputField placeholder="John Doe" label="Card Holder Name" bg-color="#fff" class="mb-6"></InputField>
        <div class="grid grid-cols-2 gap-6">
          <InputField placeholder="" label="Expires On" bg-color="#fff" class="mb-6"></InputField>
          <InputField placeholder="John Doe" label="3 - Digit CVV" bg-color="#fff" class="mb-6"></InputField>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputField from "~/components/inputs/InputField";
export default {
  name: "employee-settings",
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

    .form-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-right: 52px;
      min-width: 766px;
    }

    .logo-wrapper {
      height: 518px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #F6F8FA;
      border: 1px dashed rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
      border-radius: 10px;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 800;
      font-size: 38px;
      line-height: 57px;
      color: #000000;
      width: 100%;
    }
  }
}
</style>
