<template>
    <div class="employer-wrapper">
        <div class="flex flex-col w-full" v-show="loaded">
            <div class="rounded-md bg-yellow-50 p-4 mb-6 cursor-pointer" @click="finishOnboarding" v-if="!$auth.user.stripe_completed">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <!-- Heroicon name: solid/exclamation -->
                        <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="ml-3 w-full">
                        <h3 class="text-sm font-medium text-yellow-800">Attention needed</h3>
                        <div class="mt-2 text-sm text-yellow-700 flex flex-row items-center justify-between w-full">
                            <p>You haven't completed the Stripe onboarding. Please click this link to complete it.</p>
                            <button class="whitespace-nowrap font-medium text-yellow-700 hover:text-yellow-800">Complete <span aria-hidden="true">&rarr;</span></button>
                        </div>
                    </div>
                </div>
            </div>

            <h2>Employee Dashboard</h2>

            <div class="user-info">
                <div class="flex flex-row items-center">
                    <div class="user-avatar">
                        <img class="user-avatar" :src="$auth.user.avatar_url || '/noimage.png' " alt="">
                        <div class="upload" @click="$modal.show('image-upload')">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                    <div class="flex flex-col" v-if="myEmployer">
                        <h1>{{ $auth.user.display_name }}</h1>
                        <p>{{ myEmployer.username || 'employer' }}</p>
                        <p class="sub">{{ $auth.user.address_1 !== null ? $auth.user.address_1 : '' + ', ' + $auth.user.state !== null ? $auth.user.state : '' }}</p>
                    </div>
                </div>
                <div class="flex flex-row items-end">
                    <p class="download cursor-pointer" @click="downloadQR">Download QR code Image</p>
                    <div>
                        <canvas ref="canvas"/>
                    </div>
                </div>
            </div>

            <h2>Overview</h2>

            <div class="grid grid-cols-2 gap-6">
                <div class="p-6 bg-white flex flex-row justify-between items-center">
                    <div class="flex flex-row items-center">
                        <div class="svg-wrap">
                            <img src="/receipt-text.svg" alt="">
                        </div>
                        <div class="flex flex-col">
                            <span>Account balance ready for payout</span>
                            <b>${{ parseFloat(me / 100).toFixed(2) }}</b>
                        </div>
                    </div>
                    <button :class="['payout', me <= 0 ? 'disabled' : '']" :disabled="me <= 0" @click="$modal.show('payout')">Payout</button>
                </div>
                <div class="p-6 bg-white flex flex-row justify-between items-center">
                    <div class="flex flex-row items-center">
                        <div class="svg-wrap">
                            <img src="/receipt-text.svg" alt="">
                        </div>
                        <div class="flex flex-col">
                            <span>Total Earned Amount</span>
                            <b>${{ $auth.user.total_earned_amount }}</b>
                        </div>
                    </div>

                </div>
            </div>

            <div class="image-wrapper">
                <div class="image-wrapper-inner">
                    <div class="flex flex-col justify-center">
                        <h2>Access your Stripe Dashboard</h2>
                        <p>
                            Tipper utilizes Stripe for all payments. Check your Stripe Dashboard for more information on your tips.
                        </p>
                        <button @click="stripeLogin()" href="https://dashboard.stripe.com/login" class="access" target="_blank">Access Here</button>
                    </div>

                    <img src="/stripe-logo.svg" alt="">
                </div>
            </div>
        </div>
        <Loader v-show="!loaded"></Loader>
        <client-only>
            <modal name="image-upload"
                   width="476"
                   height="400"
                   @before-open="beforeOpen"
                   @before-close="beforeClose">
                <div class="flex flex-col">
                    <div class="flex flex-row items-center justify-between">
                        <h1 class="text-left modal-title">Change Profile Photo</h1>
                        <svg @click="$modal.hide('image-upload')" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <div class="modal-content">
                        <h4 v-if="$auth.user.avatar_url === null">Profile Photo</h4>
                        <img v-else :src="$auth.user.avatar_url" alt="">
                        <label for="file-upload" class="custom-file-upload">
                            Change Profile Photo
                        </label>
                        <input id="file-upload" type="file" @change="updateAvatar"/>
                    </div>
                </div>
            </modal>
        </client-only>
        <client-only>
            <modal name="payout"
                   width="476"
                   height="auto"
                   @before-open="beforeOpen"
                   @before-close="beforeClose">
                <div class="flex flex-col">
                    <div class="flex flex-row items-center justify-between">
                        <h1 class="text-left modal-title">Transfer Money</h1>
                        <svg @click="$modal.hide('payout')" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <div class="modal-content">
                        <div class="flex flex-col w-full">
                            <div class="flex flex-col">
                                <label class="block text-sm font-medium text-gray-700 text-semibold bg-gray-50 rounded-4 p-2" v-if="stripeDetails">Transferred money will go to: **** **** **** {{ stripeDetails.last4 }}</label>
                            </div>
                            <div class="w-full mt-4">
                                <InputField v-model="payload.amount" label="Amount in USD"
                                            placeholder="120"></InputField>
                            </div>
                        </div>
                        <button type="button"
                                class="transfer"
                                @click="payout">Transfer Funds
                        </button>
                    </div>
                </div>
            </modal>
        </client-only>
    </div>
</template>

<script>
import GlobalButton from "~/components/GlobalButton";
import Loader from "@/components/Loader";
import InputField from "@/components/inputs/InputField";

export default {
    name: "index-employee",
    layout: 'standard',
    components: {GlobalButton, Loader, InputField},
    data() {
        return {
            myEmployer: null,
            loaded: false,
            stripeDetails: null,
            currency: 'USD',
            me: null,
            avatarUrl: '',
            payload: {
                amount: 0,
            },
            test: 0,
        }
    },
    async created() {
        console.log(this.$auth.user)
        this.loaded = false;
        await this.fetchMyEmployer();
        await this.fetchAuthUserBalance();
        await this.fetchStripeDetails();
        this.loaded = true;
    },
    mounted() {
        if (process.browser) {
            let QRCode = require('qrcode');

            let url = `https://thetippercompany.com/user/${this.$auth.user.id}/`;

            if (this.$auth.user.type === 'employee') {
                url += `tip?type=user&id=${this.$auth.user.id}`;
            } else {
                url += 'tipping';
            }

            this.url = url;

            QRCode.toCanvas(this.$refs.canvas, url, function (error) {
                if (error) console.error(error)
            })
        }
    },
    methods: {
        async stripeLogin() {
          try {
              let res = await this.$axios.get('/stripe/dashboard');

              let url = res.data.data.url;

              window.location.replace(url);
          } catch(e) {
              console.log(e)
          }
        },
        async finishOnboarding() {
            try {
                let res = await this.$axios.post('/employee/onboarding');
                let link = res.data.redirect_uri;

                window.location.replace(link);
            } catch(e) {
                console.log()
            }
        },
        async payout() {
            try {
                let res = await this.$axios.post('/payout', this.payload);

                this.payload.amount = 0;
                this.$modal.hide('payout');

                await this.fetchAuthUserBalance();

                this.$toast.open({
                    message: 'Success, status pending.',
                    type: 'success',
                });

                await this.$auth.fetchUser();

                window.location.reload();
            } catch (e) {
                this.$toast.open({
                    message: e.response.data.message,
                    type: 'error',
                });

                this.$modal.hide('payout')
            }
        },
        async fetchAuthUserBalance() {
            try {
                let res = await this.$axios.get('/balance');

                this.me = res.data.data.payout && res.data.data.payout.length ? res.data.data.payout[0].amount: 0;
            } catch (e) {
                console.log(e)
            }
        },
        async fetchStripeDetails() {
            if(this.$auth.user.stripe_completed) {
                try {
                    let res = await this.$axios.get('/my/accounts');

                    this.stripeDetails = res.data.data.data[0];

                    console.log(this.stripeDetails, 'stripe')
                }  catch (e) {
                    console.log(e)
                }
            } else {
                return
            }
        },
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
                    alert("Error")
                }
            }
        },
        beforeOpen() {
            document.body.style.overflow = 'hidden';
        },
        beforeClose() {
            document.body.style.overflow = 'auto';
        },
        downloadQR() {
            if (this.$refs.canvas) {
                let url = this.$refs.canvas.toDataURL().replace("image/png", "image/octet-stream");

                // const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'qrcode.png'); //or any other extension
                document.body.appendChild(link);
                link.click();
            }
        },
        async fetchMyEmployer() {
            try {
               let res = await this.$axios.get('/my/employer')
               this.myEmployer = res.data.data;

                console.log(this.myEmployer, 'employer')
            } catch(e) {
                console.log(e)
            }
        }
    }
}
</script>

<style scoped lang="scss">
.employer-wrapper {
    width: 1240px;
    margin: 0 auto;
    min-height: 100vh;
    padding-bottom: 60px;

    h2 {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 30px;
        line-height: 45px;
        color: #1B1A1A;
        margin-bottom: 26px;
    }

    .user-info {
        background: #fff;
        padding: 38px;
        margin-bottom: 36px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        h1 {
            font-style: normal;
            font-weight: 700;
            font-size: 24px;
            line-height: 33px;
            color: #1B1A1A;
            opacity: 0.8;
        }

        p {
            font-style: normal;
            font-weight: 400;
            font-size: 18px;
            line-height: 25px;
            color: #000000;
            opacity: 0.6;

            &.sub {
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 19px;
                margin-top: 8px;
                color: #000000;
                opacity: 0.4;
            }
        }

        .user-avatar {
            height: 84px;
            width: 84px;
            border-radius: 42px;
            margin-right: 26px;
            position: relative;
            border: 1px solid #f1f1f1;
            object-fit: cover;

            .upload {
                display: none;
                position: absolute;
                bottom: 0;
                height: 42px;
                width: 84px;
                border-bottom-left-radius: 42px;
                border-bottom-right-radius: 42px;
                align-items: center;
                justify-content: center;
                z-index: 1;
                background: #fff;
                cursor: pointer;
            }

            &:hover {
                .upload {
                    display: flex;

                }
            }
        }
    }

    .payout {
        width: 106px;
        height: 54px;
        background: rgba(198, 125, 101, 0.1);
        border-radius: 15px;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: #B45F4B;

        &.disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }

    .svg-wrap {
        height: 64px;
        width: 64px;
        background: #F6F8FA;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 32px;
        margin-right: 16px;
    }

    .download {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #000000;
        opacity: 0.6;
        margin-right: 6px;
    }

    span {
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: #000000;
        opacity: 0.6;
    }

    b {
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 22px;
        color: #1B1A1A;
        opacity: 0.8;
    }

    canvas {
        height: 100px !important;
        width: 100px !important;
    }

    .image-wrapper {
        margin-top: 36px;
        background: url("/employee-bg.png"), #B45F4B;
        height: 204px;
        width: 100%;
        border-radius: 8px;
        overflow: hidden;
        padding: 36px 0;

        .image-wrapper-inner {
            margin-left: 420px;
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            width: auto;
            padding-right: 40px;
            justify-content: space-between;

            h2 {
                font-style: normal;
                font-weight: 600;
                font-size: 26px;
                line-height: 35px;
                letter-spacing: 0.02em;
                color: #FFFFFF;
                margin-bottom: 8px;
            }

            p {
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 20px;
                letter-spacing: 0.02em;
                color: #FFFFFF;
                opacity: 0.8;
                max-width: 400px;
            }

            .access {
                width: 120px;
                height: 37px;
                background: #FFFFFF;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-style: normal;
                font-weight: 600;
                font-size: 14px;
                line-height: 21px;
                color: #B45F4B;
                margin-top: 20px;
            }
        }
    }
}

.modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
        font-style: normal;
        font-weight: 500 !important;
        font-size: 30px;
        line-height: 41px;
        color: #1B1A1A;
        opacity: 0.8;
        margin: 24px auto;
    }

    img {
        height: 144px;
        width: 144px;
        border-radius: 72px;
        min-width: 144px;
        margin-top: 50px;
        overflow: hidden !important;
        background: #f9f9f9;
        object-position: center;
        object-fit: cover !important;
    }

    input[type="file"] {
        display: none;
    }

    .custom-file-upload {
        display: flex;
        margin-top: 24px;
        cursor: pointer;
        position: absolute;
        bottom: 24px;
        left: 24px;
        right: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 30px;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        letter-spacing: 0.02em;
        color: #B45F4B;
    }
}

.modal-title {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 45px;
    color: #1B1A1A;
    margin-bottom: 0;
    margin-bottom: 24px;
}

.transfer {
    width: 100%;
    height: 53px;
    background: #C67D65;
    border-radius: 16px;
    border: none !important;
    color: #fff !important;
    margin-top: 24px;
}
</style>
