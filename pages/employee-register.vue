<template>
  <div class="w-full min-h-screen flex flex-col">
    <div class="min-h-full flex auth-wrapper">
      <div class="flex flex-1 bg-white image-bg">
      </div>
      <div class="flex-1 flex flex-col justify-center items-center">
        <div class="mx-auto w-full">
          <div class="flex flex-col justify-start items-start title-wrap">
            <img src="/logo.svg" class="mb-4" @click="$router.push('/')" />
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
          </div>

          <form class="mt-8 bg-white main-form-wrapper" @submit.prevent="register">
            <div class="w-full">
              <div class="space-y-6">
                <h1>Create Account</h1>
                <small>Create a Tipper account to start receiving more in tips.</small>
                <div class="employer-dropdown">
                  <div @click="showDropdown = true">
                    <InputField @show-suggests="showSuggests($event)" v-model="selectedEmployer" label="Choose Employer"></InputField>
                  </div>
                  <ul v-show="showDropdown">
                    <li class="flex flex-row items-center justify-between w-full border-gray-300 border-b">
                      <span class="font-bold text-md">List of employers</span>
                      <svg @click="showDropdown = false" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </li>
                    <li v-for="(employer, index) in employers" :key="index" @click="selectEmployer(employer)">{{ employer.username }}</li>
                  </ul>
                </div>
                <InputField v-model="payload.email" label="Email Address" placeholder="johndoe@gmail.com"></InputField>
                <InputField v-model="payload.username" label="Username" placeholder="johndoe@gmail.com"></InputField>
                <InputField v-model="payload.password" type="password" label="Password" placeholder="*********"></InputField>
                <InputField v-model="payload.confirm_password" type="password" label="Confirm Password" placeholder="*********"></InputField>
                <div>
                  <GlobalButton placeholder="Sign up" @handle-button-action="register" bg-color="#C67D65" txt-color="#fff"></GlobalButton>
                </div>
                <div class="sign-up">
                  <span>Already Have An Account?</span>
                  <nuxt-link to="/sign-in" class="font-medium text-indigo-600 hover:text-indigo-500">Login</nuxt-link>
                </div>
              </div>
            </div>
          </form>
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
      showDropdown: false,
      searchTerm: '',
      password_two: '',
      payload: {
        email: '',
        username: '',
        password: '',
        confirm_password: '',
        employer_id: 0,
      },
      employers: [],
      selectedEmployer: ''
    }
  },
  methods: {
    selectEmployer(e) {
      console.log(e)
      this.payload.employer_id = e.id;
      this.selectedEmployer = e.username;
      this.showDropdown = false;
    },
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
    },
    async showSuggests(e) {
      try {
        let res = await this.$axios.get(`/employers?q=${e}`);

        this.employers = res.data.data;
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
    margin-top: 70px;

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

.employer-dropdown {
  position: relative;
  display: flex;
  flex-direction: column;

  ul {
    position: absolute;
    top: 97px;
    left: 0;
    right: 0;
    height: fit-content;
    background: #fff;
    z-index: 10;
    border-radius: 16px;
    max-height: 200px;
    overflow: scroll;
    box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.18);
    -webkit-box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.18);
    -moz-box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.18);

    li {
      font-size: 14px;
      font-weight: 400;
      width: 100%;
      padding: 12px 24px;

      &:hover {
        cursor: pointer;
        background: #f1f1f1;
      }

      &:first-child {
        padding: 0px 24px;
        min-height: 50px;
      }
    }
  }
}

.image-bg {
  background: url(/login-bg.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
