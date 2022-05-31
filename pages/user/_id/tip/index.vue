<template>
    <div class="tipping-wrapper">
        <div class="flex flex-col" v-if="loaded">
            <div class="flex flex-row items-center justify-start mb-6">
                <button @click="$router.go(-1)" class="back">
                    <img src="/arrow-left.svg" alt="">
                </button>
                <img src="/logo.svg" class="logo" @click="$router.push('/')"/>
            </div>
            <h3>Send Tip to:</h3>

            <div class="staff-block" v-if="user">
                <img class="avatar" :src="user.avatar_url !== null ? user.avatar_url : '/noimage.png'" alt="">
                <div class="flex flex-col items-start w-full justify-start">
                    <p v-if="user.type === 'employee'">{{ user.display_name }}</p>
                    <p v-else>{{ user.username }}</p>
                    <p v-if="$route.query.type === 'pool'">{{ user.name }}</p>
                    <p class="sub" v-if="user.department">
                        {{ user.department.name }}
                    </p>
                </div>
            </div>
            <div class="tipping-wrapper-content">
                <h3>Select tip amount</h3>
                <div class="grid grid-cols-4 gap-4 pt-4 pb-4">
                    <button v-for="(tip, index) in tip_amount" :key="index"
                            :class="selected_tip_amount === tip ? 'active' : ''" @click="selectTipAmount(tip); fetchFee();">
                        <p>${{ tip }}</p>
                    </button>
                </div>
                <h3>Custom Amount</h3>
                <div class="input-wrapper">
                    <p>$</p>
                    <input type="number" v-model="selected_tip_amount" @input="fetchFee();">
                </div>
            </div>
            <div class="tipping-wrapper-info mt-4">
                <ul>
                    <li>
                        <span>Tip:</span>
                        <span>${{ selected_tip_amount + '.00' }}</span>
                    </li>
                    <li>
                        <span>Fee:</span>
                        <span v-if="loadingFee">
            <img src="/loader2.svg" alt="">
          </span>
                        <span v-else>{{ '$' + fee.fee }}</span>
                    </li>
                    <li class="total">
                        <span class="first">Total</span>
                        <span class="second" v-if="selected_tip_amount > 0">${{
                                (parseInt(selected_tip_amount) + fee.fee).toFixed(2)
                            }}</span>
                    </li>
                </ul>
            </div>
            <div class="review-block">
                <img src="/review.svg" alt="">
                <star-rating :star-size="25" :increment="1" :inline="true" :rounded-corners="true" padding="2"
                             inactive-color="#F0EBE4" :show-rating="false" active-color="#F9C52D"
                             v-model="rating"></star-rating>
                <h2>Give rating and review!</h2>
                <textarea v-model="description" placeholder="Leave a review (Optional)" rows="10"></textarea>
            </div>
            <button class="submit" @click="submit">
                Next
            </button>
            <div class="flex flex-row justify-start mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure Payment</span>
            </div>
            <div class="warning-block">
                By continuing, you confirm that you have read and agreed to our


                <a href="https://www.thetippercompany.com/terms-and-conditions" target="_blank">Terms and Conditions</a>

                and

                <a href="https://www.thetippercompany.com/privacy-policy">Privacy Policy.</a>
            </div>
        </div>
        <Loader v-else></Loader>
    </div>
</template>

<script>
import Loader from "@/components/Loader"
import InputField from "~/components/inputs/InputField";

export default {
    name: "index.vue",
    components: {InputField, Loader},
    layout: 'standard',
    data() {
        return {
            loaded: false,
            tip_amount: [
                5, 10, 15, 20
            ],
            selected_tip_amount: 0,
            fee: null,
            loadingFee: false,
            rating: 0,
            name: '',
            description: '',
            user: null
        }
    },
    async created() {
        this.loaded = false;
        await this.fetchFee();
        await this.fetchUser();
        this.loaded = true;
    },
    methods: {
        selectTipAmount(t) {
            this.selected_tip_amount = t;
        },
        async fetchUser() {
            if(this.$route.query.type === 'user') {
                try {
                    let res = await this.$axios.get('/users/' + this.$route.query.id)

                    this.user = res.data.data;
                } catch(e) {
                    console.log(e)
                }
            } else if(this.$route.query.type === 'pool'){
                try {
                    let res = await this.$axios.get('/pools/' + this.$route.query.id)

                    this.user = res.data.data;
                    console.log(this.user, 'imal ga')
                } catch(e) {
                    console.log(e)
                }
            }

        },
        async fetchAuthUserBalance() {
            try {
                let res = await this.$axios.get('/balance');

                this.me = res.data.data.balance[0];
            } catch (e) {
                console.log(e)
            }
        },
        async fetchFee() {
            this.loadingFee = true;

            try {
                let res = await this.$axios.post('/fee', {
                    amount: this.selected_tip_amount
                });

                this.fee = res.data.data;

                this.loadingFee = false;
            } catch (e) {
                console.log(e)
            }
        },
        async submit() {
          if(this.$route.query.type === 'user') {
              try {
                  let res = await this.$axios.post('/users/' + this.$route.query.id + '/tips', {
                      amount: this.selected_tip_amount,
                      currency: 'usd',
                      rating: this.rating,
                      name: this.name,
                      description: this.description,
                  });

                  location.href = res.data.redirect_uri;

                  this.selected_tip_amount = 0;
                  this.rating = 0;
                  this.name = '';
                  this.description = ''

                  await this.fetchAuthUserBalance();
              } catch (e) {
                  console.log(e)
              }
          } else {
              try {
                  let res = await this.$axios.post('/pools/' + this.$route.query.id + '/tips', {
                      amount: this.selected_tip_amount,
                      currency: 'usd',
                      rating: this.rating,
                      name: this.name,
                      description: this.description,
                  });

                  location.href = res.data.redirect_uri;

                  this.selected_tip_amount = 0;
                  this.rating = 0;
                  this.name = '';
                  this.description = ''

                  await this.fetchAuthUserBalance();
              } catch (e) {
                  console.log(e)
              }
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

.tipping-wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    background: #fff;
    width: 400px;
    margin: 0 auto;
    min-height: fit-content;
    padding: 20px;
    flex-direction: column;
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

    .tipping-wrapper-content {
        span {
            font-style: normal;
            font-weight: 700;
            font-size: 18px;
            line-height: 25px;
            letter-spacing: 0.01em;
            color: #000000;
        }

        button {
            width: 77px;
            height: 77px;
            background: #FFFFFF;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #B45F4B;

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
                background: #B45F4B;
                border: none;

                p {
                    color: #fff !important;
                    opacity: 1 !important;
                }
            }
        }

        .input-wrapper {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-top: 20px;
            padding: 0 24px;
            height: 60px;
            border-radius: 14px;
            width: 100%;
            min-height: 60px !important;
            height: 60px;
            background: rgba(216, 205, 188, 0.2);
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding: 0 24px;

            input {
                width: 100%;
                margin-left: 4px;
                height: 100%;
                background: transparent;

                &:focus {
                    outline: none;
                }
            }
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

    .tipping-wrapper-info {
        ul {
            width: 100%;
            display: flex;
            flex-direction: column;

            li {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 8px 0;
                height: 40px;

                img {
                    height: 30px;
                }

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
                    padding: 20px 0;
                    border-top: 1px solid #ddd;
                    border-bottom: 1px solid #ddd;
                    min-height: fit-content;
                    height: fit-content;

                    span {
                        &.first {
                            font-family: 'Poppins';
                            font-style: normal;
                            font-weight: 500;
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
                            font-weight: 500;
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
    background: #C67D65;
    margin-top: 24px;

    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.02em;
    color: #FFFFFF;
}

.review-block {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    img {
        margin: 60px auto 20px auto;
    }

    h2 {
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 25px;
        margin-top: 20px;
        /* identical to box height */

        text-align: center;
        letter-spacing: 0.01em;

        color: rgba(0, 0, 0, 0.60);
    }
}

.stripe-payment {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    padding: 0 24px;
    height: 60px;
    min-height: 60px !important;
    background: rgba(216, 205, 188, 0.2);
    border-radius: 14px;
    width: 100%;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.6);
}

textarea {
    margin-top: 20px;
    height: 137px;
    border-radius: 14px;
    width: 100%;
    min-height: 60px !important;
    background: rgba(216, 205, 188, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 24px;

    &:focus {
        outline: none
    }
}

::placeholder {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0.02em;
    color: #D8CDBC;
}

.back {
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

.staff-block {
    border: 1px solid #d7d7d7;

    border-radius: 14px;
    height: 97px;
    padding: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: 0.3s all ease;
    margin-bottom: 12px;

    &:hover {
        box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.05);
    }


    p {
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 19px;
        letter-spacing: 0.01em;
        color: #000000;

        &.sub {
            font-style: normal;
            font-weight: 400;
            font-size: 10px;
            line-height: 16px;
            letter-spacing: 0.03em;
            color: #000000;
            opacity: 0.8;
        }
    }

    img {
        &.avatar {
            height: 57px;
            width: 57px;
            border: 2px solid #fff;
            border-radius: 25px;
            overflow: hidden;
            min-width: 57px;
            margin-right: 20px;
        }

        &.staff {
            margin-left: 20px;
        }
    }
}

h3 {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
    letter-spacing: 0.01em;
    color: #000000;
    opacity: 0.8;
    margin: 31px 0;
}

.warning-block {
    margin-top: 16px;
    text-align: left;
    font-size: 13px;
    font-weight: 500;
    color: #565656;

    a {
        font-size: 13px;
        font-weight: 600;
        color: #948f2c;
        min-width: fit-content;
        width: fit-content;
        margin: 0 2px;
    }
}
</style>
