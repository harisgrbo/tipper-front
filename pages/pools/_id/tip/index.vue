<template>
    <div class="tipping-wrapper">
        <div class="profile-block">
            <img :src="$auth.user.avatar_url !== null ? $auth.user.avatar_url : '/noimage.png'" alt="">
            <div class="flex flex-col justify-between">
                <h2>Warren Hotel</h2>
                <span v-if="$auth.user.address_1.length && $auth.user.state.length">{{ $auth.user.address_1 + $auth.user.state }}</span>
                <span v-else>Placeholder address & state</span>
            </div>
        </div>

        <h3>Send a tip to . . .</h3>

        <div class="staff-wrapper">
            <div class="staff-block">
                <img class="avatar" src="/noimage.png" alt="">
                <div class="flex flex-col items-start justify-start">
                    <p>Entire Staff</p>
                    <p class="sub">
                        send one tip to be evenly split among entire staff.
                    </p>
                </div>
                <img class="staff" src="/staff.svg" alt="">
            </div>
            <div class="staff-block">
                <img class="avatar" src="/noimage.png" alt="">
                <div class="flex flex-col items-start w-full justify-start">
                    <p>Entire Staff</p>
                </div>
                <img class="staff" src="/staff-right.svg" alt="">
            </div>
            <div class="staff-block">
                <img class="avatar" src="/noimage.png" alt="">
                <div class="flex flex-col items-start w-full justify-start">
                    <p>Entire Staff</p>
                </div>
                <img class="staff" src="/staff-right.svg" alt="">
            </div>
            <div class="staff-block">
                <img class="avatar" src="/noimage.png" alt="">
                <div class="flex flex-col items-start w-full justify-start">
                    <p>Entire Staff</p>
                </div>
                <img class="staff" src="/staff-right.svg" alt="">
            </div>
            <div class="staff-block">
                <img class="avatar" src="/noimage.png" alt="">
                <div class="flex flex-col items-start w-full justify-start">
                    <p>Entire Staff</p>
                </div>
                <img class="staff" src="/staff-right.svg" alt="">
            </div>

        </div>
        <div class="tip-page-wrapper__content">
            <span>Select tip amount</span>
            <div class="grid grid-cols-4 gap-4 pt-4 pb-4">
                <button v-for="(tip, index) in tip_amount" :key="index"
                        :class="selected_tip_amount === tip ? 'active' : ''" @click="selectTipAmount(tip); fetchFee();">
                    <p>${{ tip }}</p>
                </button>
            </div>
            <span>Custom Amount</span>
            <input type="number" v-model="selected_tip_amount" @input="fetchFee();">
        </div>
        <div class="tip-page-wrapper__tip-info mt-4">
            <ul>
                <li>
                    <span>Tip:</span>
                    <span>{{ selected_tip_amount }}</span>
                </li>
                <li>
                    <span>Fee:</span>
                    <span v-if="loadingFee">
            <img src="/loader2.svg" alt="">
          </span>
                    <span v-else>{{ fee.fee + 'USD' }}</span>
                </li>
                <li class="total">
                    <span class="first">Total</span>
                    <span class="second" v-if="selected_tip_amount > 0">${{
                            parseInt(selected_tip_amount) + fee.fee
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
            <textarea v-model="description" placeholder="Leave a text review" rows="10"></textarea>
        </div>
        <button class="submit" @click="submit">
            Next
        </button>
    </div>
</template>

<script>
import InputField from "~/components/inputs/InputField";

export default {
    name: "index.vue",
    components: {InputField},

    layout: 'standard',
    data() {
        return {
            tip_amount: [
                4, 6, 8, 10, 15, 20, 25, 50
            ],
            selected_tip_amount: 0,
            fee: null,
            loadingFee: false,
            rating: 0,
            name: '',
            description: ''
        }
    },
    async created() {
        await this.fetchFee();
    },
    methods: {
        selectTipAmount(t) {
            this.selected_tip_amount = t;
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
            try {
                let res = await this.$axios.post('/pools/' + this.$route.params.id + '/tips', {
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
    width: 400px;
    margin: 0 auto;
    min-height: 100vh;
    padding-bottom: 60px;
    background: #fff;
    padding: 36px;

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
            border: 1px solid rgba(0, 0, 0, 0.2);

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
                background: #D8CDBC;
                border: none;
            }
        }

        input {
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

            &:focus {
                outline: none;
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

    .profile-block {
        display: flex;
        background: #B45F4B;
        border-radius: 20px;
        height: 97px;
        width: 100%;
        padding: 20px;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;

        img {
            height: 55px;
            width: 55px;
            border: 1px solid #fff;
            border-radius: 13px;
            overflow: hidden;
            margin-right: 20px;
        }

        h2 {
            font-style: normal;
            font-weight: 600;
            font-size: 20px;
            line-height: 27px;
            letter-spacing: 0.01em;
            color: #FFFFFF;
        }

        span {
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 16px;
            letter-spacing: 0.01em;
            color: #FFFFFF;
            opacity: 0.8;
            margin-top: 6px;
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

    .staff-wrapper {
        display: flex;
        flex-direction: column;

        .staff-block {
            border: 1px solid #F6F3F0;
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
    }
}
</style>
