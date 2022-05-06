<template>
  <div class="review-wrapper">
    <div class="w-full flex flex-row items-center justify-start">
      <button @click="$router.go(-1)">
        <img src="/arrow-left.svg" alt="">
      </button>
      <div>
        <h2>Employee Settings</h2>
        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
      </div>
    </div>
    <div class="settings-wrapper">
      <div class="flex flex-row w-full">
        <div class="form-wrapper">
          <InputField placeholder="John Doe" label="Employee Nickname" v-model="userInfo.nickname" class="mb-6"></InputField>
          <InputField placeholder="Johndoe@gmail.com" label="Email" v-model="userInfo.email" class="mb-6"></InputField>
          <InputField type="password" placeholder="****" label="Password" v-model="userInfo.password"></InputField>
        </div>
        <div class="logo-wrapper" :style="{ 'backgroundImage': `url(\'${this.$auth.user.avatar_url !== null ? this.$auth.user.avatar_url : '/noimage.png'}\')`, 'backgroundRepeat': 'no-repeat', 'backgroundSize': 'cover', 'backgroundPosition': 'center' }">
          <label for="file-upload" class="custom-file-upload">
            Choose Image
          </label>
          <input id="file-upload" type="file" @change="updateAvatar"/>
        </div>
      </div>
      <button @click="saveSettings()">Save settings</button>
    </div>
  </div>
</template>

<script>
import InputField from "~/components/inputs/InputField";
export default {
  name: "employee-settings",
  components: {InputField},
  layout: 'standard',
  data() {
    return {
      avatarUrl: '',
      userInfo: {
        nickname: '',
        job_title: '',
        name: '',
        password: '',
        email: '',
      }
    }
  },
  created() {
    this.userInfo.nickname = this.$auth.user.nickname !== null ? this.$auth.user.nickname : '';
    this.userInfo.email = this.$auth.user.email;
  },
  methods: {
    async updateAvatar(event) {
      if (event.target.files.length) {
        let image = event.target.files[0];
        let formData = new FormData();
        formData.append('avatar', image);

        try {
          await this.$axios.post('/avatar', formData, {
            'headers': {
              'Content-Type': 'multipart/form-data'
            }
          })

          await this.$auth.fetchUser();

          this.avatarUrl = this.$auth.user.avatar_url;
        } catch (e) {
          alert("Avatar nije moguce postaviti")
        }
      }
    },
    async saveSettings() {
      try {
        let payload = {};
        for (let key in this.userInfo) {
          if(this.userInfo[key] !== '' && this.userInfo[key] !== null) {
            payload[key] = this.userInfo[key];
          }
        }
        await this.$axios.put('/me', payload);

        this.$toast.open({
          message: 'Settings saved successfully',
          type: 'success',
        });

      } catch(e) {
        console.log(e.response)
          this.$toast.open({
              message: Object.values(e.response.data.errors).join(" "),
              type: 'error',
          });

      }
    }
  }
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
    border: 2px solid rgba(216, 205, 188, 0.3);
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
    background: #fff;
    padding: 24px;

    .form-wrapper {
      display: flex;
      flex-direction: column;
      width: 766px;
      margin-right: 52px;
      min-width: 766px;


    }

    .logo-wrapper {
      height: 518px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #F6F8FA;
      border: 2px dashed rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
      border-radius: 10px;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 800;
      font-size: 38px;
      line-height: 57px;
      color: #000000;
      width: 100%;
      position: relative;
      margin-top: 12px;

      input[type="file"] {
        display: none;
      }

      .custom-file-upload {
        display: flex;
        cursor: pointer;
        position: absolute;
        bottom: 24px;
        left: 24px;
        right: 24px;
        backdrop-filter: blur(5px);
        background: rgba(255, 255, 255, 0.42);
        font-size: 15px;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #C67D65;
        border: 1px solid #C67D65;
        border-radius: 30px;
      }
    }
  }
}

button {
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border-radius: 15px;
  margin-right: 27px;
  min-width: fit-content;
  padding: 0 24px;
}
</style>
