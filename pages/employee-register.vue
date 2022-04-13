<template>
  <div class="w-full min-h-screen flex flex-col">
    <div class="min-h-full flex auth-wrapper">
      <div class="flex flex-1 bg-white">
      </div>
      <div class="flex-1 flex flex-col justify-center items-center">
        <div class="mx-auto w-full">
          <div class="flex flex-col justify-start items-start title-wrap">
            <h3 @click="$router.push('/')">LOGO</h3>
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
          </div>

          <div class="mt-8 bg-white main-form-wrapper">
            <div class="w-full">
              <div class="space-y-6">
                <h1>Create Account</h1>
                <small>Create a Tipper account to start receiving more in tips.</small>
                <InputField v-model="payload.email" label="Email Address" placeholder="johndoe@gmail.com"></InputField>
                <InputField v-model="payload.username" label="Username" placeholder="johndoe@gmail.com"></InputField>
                <InputField v-model="payload.password" type="password" label="Password" placeholder="*********"></InputField>
                <InputField v-model="payload.confirm_password" type="password" label="Confirm Password" placeholder="*********"></InputField>

                <div>
                  <GlobalButton placeholder="Sign up" @handle-button-action="register"></GlobalButton>
                </div>
                <div class="sign-up">
                  <span>Already Have An Account?</span>
                  <nuxt-link to="/sign-in" class="font-medium text-indigo-600 hover:text-indigo-500">Login</nuxt-link>
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
import InputField from "~/components/inputs/InputField";
export default {
  components: {InputField},
  name: "register-employee",
  data() {
    return {
      password_two: '',
      payload: {
        email: '',
        username: '',
        password: '',
        confirm_password: ''
      }
    }
  },
  methods: {
    async register() {
      if (this.payload.password !== this.payload.confirm_password) {
        alert('Passwords dont match')
      }

      try {
        let res = await this.$axios.post('/employee/register', this.payload);

        if(res.status === 200) {
          window.location.href = res.data.redirect_uri;
        }

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
</style>
