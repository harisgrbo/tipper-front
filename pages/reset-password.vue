<template>
  <div class="w-full min-h-screen flex flex-col">
    <div class="min-h-full flex auth-wrapper">
      <div class="flex flex-1 bg-white forgot-bg">
      </div>
      <div class="flex-1 flex flex-col justify-center items-center">
        <div class="mx-auto w-full">
          <div class="flex flex-col justify-start items-start title-wrap">
            <img src="/logo.svg" class="mb-4" @click="$router.push('/')"/>
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
          </div>

          <div class="mt-8 bg-white main-form-wrapper">
            <div class="w-full">
              <div class="space-y-6">
                <h1>Forgot Password</h1>
                <small>Enter your email and we’ll send a link to reset it.</small>
                <InputField v-model="email" label="Enter email Address" placeholder="johndoe@gmail.com"></InputField>
                <div>
                  <GlobalButton placeholder="Reset" @handle-button-action="reset" bg-color="#C67D65" txt-color="#fff"></GlobalButton>
                </div>
                <div class="sign-up">
                  <span>Not a member yet? </span>
                  <nuxt-link to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">Sign up</nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "~/components/Header";
import InputField from "~/components/inputs/InputField";
export default {
  components: {InputField, Header},
  name: "password-reset",
  data() {
    return {
      email: ''
    }
  },
  methods: {
    async reset() {
      try {
        await this.$axios.post('/send-password-reset', {
          email: this.email
        })

        this.$toast.open({
          message: 'We have sent instructions for password reset. Please check your email',
          type: 'success',
        });
      } catch(e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.auth-wrapper {
  min-height: 100vh;
  background: #F7F8FA;
  padding: 15px;

  .main-form-wrapper {
    display: flex;
    margin-left: 53px;
    margin-right: 134px;
    padding: 32px;

    h1 {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 30px;
      line-height: 45px;
      color: #1B1A1A;
    }

    small {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 21px;
      letter-spacing: 0.01em;
      color: #1B1A1A;
      opacity: 0.6;
    }
  }

  .title-wrap {
    display: flex;
    margin-left: 53px;
    margin-right: 134px;

    h3 {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: bold;
      font-size: 38px;
      line-height: 57px;
      color: #000000;
    }

    span {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0.01em;
      color: #161616;
      opacity: 0.3;
    }
  }

  a {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #1B1A1A;
    opacity: 0.4;
  }
}

.sign-up {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-top: 24px;

  span {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 22px;
    color: #1B1A1A;
    opacity: 0.4;
  }

  a {
    font-family: 'Poppins';
    margin-left: 4px;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 22px;
    color: #1B1A1A;
    opacity: 0.6;
  }
}

button {
  margin-top: 240px
}

.forgot-bg {
  background: url(/forgot-bg.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
}
</style>
