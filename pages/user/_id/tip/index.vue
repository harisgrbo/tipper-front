<template>
  <div class="tip-page-wrapper">
    <div class="tip-page-wrapper__header">
      <h2>LOGO</h2>
    </div>
    <div class="tip-page-wrapper__content">
      <span>Select tip amount</span>
      <div class="grid grid-cols-4 gap-4 pt-4 pb-4">
        <button v-for="(tip, index) in tip_amount" :class="selected_tip_amount === tip ? 'active' : ''" @click="selectTipAmount(tip)" >
          <p>${{ tip }}</p>
        </button>
      </div>
      <span>Custom Amount</span>
      <input type="number" v-model="selected_tip_amount">
    </div>
<!--    <div class="tip-page-wrapper__payment">-->
<!--      <button>-->
<!--        <p>Payment method</p>-->

<!--        >-->
<!--      </button>-->
<!--    </div>-->
    <div class="tip-page-wrapper__tip-info mt-4">
      <ul>
        <li>
          <span>Tip:</span>
          <span>{{ selected_tip_amount }}</span>
        </li>
        <li>
          <span>People:</span>
          <span>3</span>
        </li>
        <li>
          <span>Fee:</span>
          <span>15%</span>
        </li>
        <li class="total">
          <span class="first">Total</span>
          <span class="second" v-if="selected_tip_amount > 0">${{ parseInt(selected_tip_amount) + (parseInt(selected_tip_amount) * 0.15) }}</span>
        </li>
      </ul>
    </div>
    <button class="submit" @click="submit">
      <p>Submit</p>
    </button>
  </div>
</template>

<script>
export default {
  name: "index.vue",
  data() {
    return {
      tip_amount: [
          4, 6, 8, 10, 15, 20, 25, 50
      ],
      selected_tip_amount: 0,
    }
  },
  methods: {
    selectTipAmount(t) {
      this.selected_tip_amount = t;
    },
    async fetchAuthUserBalance() {
      try {
        let res = await this.$axios.get('/balance');

        this.me = res.data.data.balance[0];

        console.log(this.me)
      } catch (e) {
        console.log(e)
      }
    },
    async submit() {
      try {
        let res = await this.$axios.post('/payout', {
          amount: this.selected_tip_amount
        });

        this.selected_tip_amount = 0;

        await this.fetchAuthUserBalance();
      } catch(e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}
.tip-page-wrapper {
  display: flex;
  flex-direction: column;
  width: 1240px;
  margin: 0 auto;
  min-height: 100vh;
  padding-bottom: 60px;
  background: #F7F8FA;

  @include for-phone-only {
    width: 100%;
    padding: 24px;
  }

  &__header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    h2 {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 800;
      font-size: 38px;
      line-height: 57px;
      color: #000000;
      margin-bottom: 26px;
    }
  }

  &__content {
    span {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 27px;
      letter-spacing: 0.01em;
      color: #000000;
      opacity: 0.4;
      padding-bottom: 28px;
    }

    button {
      width: 77px;
      height: 77px;
      background: #FFFFFF;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;

      p {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 27px;
        letter-spacing: 0.02em;
        color: #000000;
        opacity: 0.6;
      }

      &.active {
        border: 1px solid rgba(0, 0, 0, 0.2);
      }
    }

    input {
      margin-top: 20px;
      background: #fff;
      padding: 0 24px;
      height: 60px;
      border-radius: 14px;
      width: 100%;
    }
  }

  &__payment {
    width: 100%;
    button {
      height: 60px;
      background: #fff;
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      width: 100%;
      margin: 30px 0;

      p {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 27px;
        letter-spacing: 0.02em;
        color: #000000;
        opacity: 0.6;
      }
    }
  }

  &__tip-info {
   ul {
     width: 100%;
     display: flex;
     flex-direction: column;

     li {
       display: flex;
       align-items: center;
       justify-content: space-between;
       padding: 8px 0;

       span {
         font-family: 'Poppins';
         font-style: normal;
         font-weight: 400;
         font-size: 14px;
         line-height: 21px;
         /* identical to box height */

         letter-spacing: 0.01em;

         color: #000000;

         opacity: 0.4;
       }

       &.total {
         padding: 10px 0;
         border-top: 1px solid #ddd;
         border-bottom: 1px solid #ddd;
         span {
           &.first {
             font-family: 'Poppins';
             font-style: normal;
             font-weight: 700;
             font-size: 14px;
             line-height: 21px;
             /* identical to box height */

             letter-spacing: 0.01em;

             color: #000000;

             opacity: 0.4;
           }

           &.second {
             font-family: 'Poppins';
             font-style: normal;
             font-weight: 700;
             font-size: 16px;
             line-height: 24px;
             /* identical to box height */

             text-align: right;
             letter-spacing: 0.01em;

             color: #000000;

             opacity: 0.6;
           }
         }
       }
     }
   }

  }
}

.submit {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  border-radius: 15px;
  background: #fff;
  margin-top: 24px;

  p {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height */

    letter-spacing: 0.02em;

    color: #000000;

    opacity: 0.4;
  }
}
</style>
