<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="flex flex-col items-center sm:w-full sm:p-4 test">

    <canvas ref="canvas" />

    <a :href="`https://tipper-front.herokuapp.com/user/${this.$route.params.id}/tip`">Test</a>

    <div class="md:flex md:items-center md:justify-between md:space-x-5 w-7xl max-w-7xl w-full mx-auto mt-6">
      <div class="flex items-start spacerelative header-x-5">
        <div class="flex-shrink-0">
          <div class="relative">
            <img class="h-16 w-16 rounded-full" src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" alt="">
            <span class="absolute inset-0 shadow-inner rounded-full" aria-hidden="true"></span>
          </div>
        </div>
        <!--
          Use vertical padding to simulate center alignment when both lines of text are one line,
          but preserve the same layout if the text wraps without making the image jump around.
        -->
        <div class="pt-1.5">
          <h1 class="text-2xl font-bold text-gray-900">{{ this.$auth.user.nickname }}</h1>
          <p class="text-sm font-medium text-gray-500">{{ this.$auth.user.job_title }}</p>
        </div>
        <div class="bg-gray-100 rounded-md px-2 py-2" v-if="me !== null">
          <h1 class="text-2xl font-bold text-gray-900">Balance available for payout: {{ (me.amount / 100) + ' ' + me.currency }}</h1>
        </div>
      </div>
      <div class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
        <button @click="showTipModal = true" type="button" class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">Payout</button>
      </div>
    </div>

    <div class="custom-modal" v-if="showTipModal">
      <div class="custom-modal-inner">
        <div class="flex flex-row items-center justify-between">
          <span>Payout</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" @click="showTipModal = false">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div class="mt-6 grid grid-cols-4 gap-y-6 gap-x-4">

          <div class="col-span-3">
            <label class="block text-sm font-medium text-gray-700">Amount</label>
            <div class="mt-1">
              <input type="number" v-model="payload.amount" class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
          </div>

          <div>
            <label for="cvc" class="block text-sm font-medium text-gray-700">Currency</label>
            <div class="mt-1">
              <input type="text" disabled name="cvc" v-model="currency" id="cvc" autocomplete="csc" class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
          </div>
        </div>
        <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-center w-full font-medium rounded-md shadow-sm text-white bg-gray-900 min-w-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="payout">Tip User</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "User",
  layout: 'standard',
  middleware: 'auth',
  data() {
    return {
      me: null,
      showTipModal: false,
      currency: 'USD',
      payload: {
        amount: 0,
      }
    }
  },
  async created() {
    await this.fetchAuthUserBalance();
  },
  async mounted() {
    if (process.browser) {
      let QRCode = require('qrcode');
      QRCode.toCanvas(this.$refs.canvas, `https://tipper-front.herokuapp.com/user/${this.$route.params.id}/tip`, function (error) {
        if (error) console.error(error)
        console.log('success!');
      })
    }
  },
  methods: {
    async fetchAuthUserBalance() {
      try {
        let res = await this.$axios.get('/balance');

        this.me = res.data.data.balance[0];

        console.log(this.me)
      } catch (e) {
        console.log(e)
      }
    },
    async payout() {
      try {
        let res = await this.$axios.post('/payout', this.payload);

        this.payload.amount = 0;
        this.showTipModal = false;

        await this.fetchAuthUserBalance();
      } catch(e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.custom-modal {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .custom-modal-inner {
    width: 600px;
    height: fit-content;
    border-radius: 10px;
    background: #fff;
    padding: 16px;

    input {
      height: 40px;
      border: 1px solid #f1f4f5;
      padding: 0 16px;
    }

    button {
      width: 100%;
      min-width: 100%;
      text-align: center;
      display: flex;
      justify-content: center;
      margin-top: 24px;
    }
  }
}

.test {
  padding: 24px;
}
</style>
