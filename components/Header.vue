<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="relative header">
    <div class="flex flex-row items-center">
      <img src="/logo.svg" class="logo" @click="$router.push('/')"/>
      <div class="search-input">
        <img src="/search.png" alt="">
        <input type="text">
      </div>
    </div>

    <div class="flex flex-row items-center">
      <div class="date">

      </div>
      <div class="auth" v-if="$auth.user">
        <button v-if="$auth.user.type === 'employer'" class="logout" @click="$router.push('/pools')">
          Pools
        </button>
        <button class="logout" @click="$auth.logout();">
          Logout
        </button>
        <button @click="$router.push('/notification')">
          <img src="/notification-bing.svg" alt="">
        </button>
        <button @click="handleClick">
          <img src="/group.svg" alt="">
        </button>
        <button @click="$router.push('/user/' + $auth.user.id)">
          <img src="/avatar.svg" alt="">
        </button>
      </div>
      <div class="auth logged-out" v-else>
        <button @click="$router.push('/sign-in')">
          Login
        </button>
        <button @click="$router.push('/register')">
          Sign up as employer
        </button>
        <button @click="$router.push('/employee-register')">
          Sign up as employee
        </button>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Header",
  methods: {
    handleClick() {
      if(this.$auth.user && this.$auth.user.type === 'employer') {
        this.$router.push('/employer-settings');
      } else {
        this.$router.push('/employee-settings');
      }
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  background: #F7F8FA;
  margin: 0 auto;
  max-width: 1240px;
  width: 100%;
  height: 134px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 800;
    font-size: 38px;
    line-height: 57px;
    color: #000000;
  }

  .search-input {
    height: 60px;
    background: rgba(216, 205, 188, 0.2);
    border-radius: 14px;
    padding: 0 21px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 334px;
    margin-left: 60px;

    img {
      height: 20px;
      width: 20px;
    }

    input {
      height: 100%;
      width: 100%;
      background: transparent;
      margin-left: 14px;

      &:focus {
        outline: none
      }
    }
  }

  .auth {
    display: flex;
    align-items: center;

    button {
      background: rgba(216, 205, 188, 0.2);
      border-radius: 14px;
      height: 60px;
      width: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 14px;

      &:last-child {
        margin-right: 0;
      }

      &.logout {
        padding: 0 24px;
        min-width: fit-content;
        width: fit-content;
      }
    }

    &.logged-out {

      button {
        width: fit-content;
        min-width: fit-content;
        padding: 0 24px;
      }
    }
  }
}
</style>
