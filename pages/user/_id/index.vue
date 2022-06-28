<template>
    <div>
        <div v-show="loaded" class="min-h-full">
            <div class="flex flex-col flex-1">
                <main class="flex-1 pb-8">
                    <!-- Page header -->
                    <div class="bg-white shadow">
                        <div class="px-4 sm:px-6 lg:max-w-7xl lg:mx-auto lg:px-8">
                            <div class="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                                <div class="flex-1 min-w-0 flex-col">
                                    <!-- Profile -->
                                    <div v-if="user" class="flex items-center">
                                        <img class="h-16 w-16 rounded-full sm:block image-user" :src="user.avatar_url !== null ? user.avatar_url : '/noimage.png'" alt="">
                                        <div>
                                            <div class="flex items-center">
                                                <img class="h-16 w-16 rounded-full sm:hidden" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80" alt="">
                                                <h1 class="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">{{ user.username }}</h1>
                                            </div>
                                            <dl class="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap" v-if="user.type === 'employer'">
                                                <dd class="flex flex-col items-start text-sm text-gray-500 font-medium capitalize sm:mr-6">
                                                    <!-- Heroicon name: solid/office-building -->
                                                    <div class="flex flex-row items-center justify-start">
                                                        <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd" />
                                                        </svg>
                                                        <p class="sub">{{ user.address_1 ? user.address_1 + '' : '' }}</p>
                                                    </div>

                                                    <div class="flex flex-row items-center">
                                                        <p class="sub">{{ user.city ? user.city + ', &nbsp' : ' ' }}</p>
                                                        <p class="sub">{{ user.state ? user.state + '&nbsp'  : ' ' }} </p>
                                                        <p class="sub">{{ user.zip_code ? user.zip_code  : ' ' }} </p>
                                                    </div>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                    <dd class="mt-4">
                                        <canvas ref="canvas"/>

                                        <button @click="downloadQR" class="cursor-pointer">Download QR code image</button>
                                    </dd>
                                </div>
                                <div class="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                                    <button v-if="$auth.user && $auth.user.type === 'employer'" type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500" @click="$router.push('/invite/employees')">Add users to pool</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="$auth.user && ($auth.user.id === $route.params.id || ! $route.params.id)" class="mt-8">
                        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"  v-if="$auth.user.type !== 'employer'">
                            <h2 class="text-lg leading-6 font-medium text-gray-900">Overview</h2>
                            <div class="mt-2 grid grid-cols-2 gap-4">
                                <div class="bg-white overflow-hidden shadow rounded-lg">
                                    <div class="p-5">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0">
                                                <svg class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                                </svg>
                                            </div>
                                            <div class="ml-5 w-0 flex-1">
                                                <dl>
                                                    <dt class="text-sm font-medium text-gray-500 truncate">Account balance ready for payout</dt>
                                                    <dd>
                                                        <div class="text-lg font-medium text-gray-900">${{ $auth.user.wallet.balance }}</div>
                                                    </dd>
                                                </dl>
                                            </div>
                                            <button type="button" :class="['inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ml-4', $auth.user.wallet.balance > 0 ? '' : 'disabled']" :disabled="$auth.user.wallet.balance < 1"  @click="showTipModal = true">Payout</button>

                                        </div>
                                    </div>
                                </div>
                                <div class="bg-white overflow-hidden shadow rounded-lg">
                                    <div class="p-5">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0">
                                                <svg class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                                </svg>
                                            </div>
                                            <div class="ml-5 w-0 flex-1">
                                                <dl>
                                                    <dt class="text-sm font-medium text-gray-500 truncate">Total earned amount</dt>
                                                    <dd>
                                                        <div class="text-lg font-medium text-gray-900">${{ $auth.user.total_earned_amount}}</div>
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- More items... -->
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
        <Loader v-show="!loaded"></Loader>
        <div class="custom-modal" v-if="showTipModal">
            <div class="custom-modal-inner">
                <div class="flex flex-row items-center justify-between">
                    <span>Payout</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" @click="showTipModal = false">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </div>
                <div class="flex flex-col">
                    <div class="flex flex-col my-6">
                        <label class="block text-sm font-medium text-gray-700 text-semibold">Transferd money will go to: **** **** **** {{ stripeDetailes.last4 }}</label>
                        <span></span>
                    </div>
                    <div class="col-span-3">
                        <label class="block text-sm font-medium text-gray-700">Amount</label>
                        <div class="mt-1">
                            <input type="number" v-model="payload.amount"
                                   class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        </div>
                    </div>

                    <div>
                        <label for="cvc" class="block text-sm font-medium text-gray-700">Currency</label>
                        <div class="mt-1">
                            <input type="text" disabled name="cvc" v-model="currency" id="cvc" autocomplete="csc"
                                   class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        </div>
                    </div>
                </div>
                <button type="button"
                        class="inline-flex items-center px-4 py-2 border border-transparent text-center w-full font-medium rounded-md shadow-sm text-white bg-gray-900 min-w-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        @click="payout">Transfer Funds
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from '@/components/Loader'
export default {
    name: "User",
    layout: 'standard',
    components: {Loader},
    data() {
        return {
            me: null,
            loaded: false,
            showTipModal: false,
            currency: 'USD',
            payload: {
                amount: 0,
            },
            user: null,
            url: '',
            stripeDetailes: null
        }
    },
    async created() {
        if(this.$auth.user && (this.$auth.user.id === this.$route.params.id || ! this.$route.params.id)) {
            await this.fetchAuthUserBalance();
        }

        if(this.$auth.user.type === 'employee') {
            await this.fetchStripeDetails();
        }
    },
    async mounted() {
      this.loaded = false;
      await this.fetchUser();
      this.loaded = true;

        if (process.browser) {
            let QRCode = require('qrcode');

            let url = `https://thetippercompany.com/user/${this.user.id}/`;

            if (this.user.type === 'employee') {
              url += `tip?type=user&id=${this.user.id}`;
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
        async fetchStripeDetails() {
            try {
                let res = await this.$axios.get('/my/accounts');

                this.stripeDetailes = res.data.data.data[0];

                console.log(this.stripeDetailes)
            }  catch (e) {
                console.log(e)
            }
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
        async fetchUser() {
            if (this.$auth.user && (this.$auth.user.id === this.$route.params.id || ! this.$route.params.id)) {
                this.user = Object.assign({}, this.$auth.user);

                return;
            }

            try {
                let res = await this.$axios.get('/users/' + this.user.id);

                this.user = res.data.data;
                console.log(this.user)
            } catch (e) {
                console.log(e)
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
        async payout() {
            try {
                let res = await this.$axios.post('/payout', this.payload);

                this.payload.amount = 0;
                this.showTipModal = false;

                await this.fetchAuthUserBalance();

                this.$toast.open({
                    message: 'Success, status pending.',
                    type: 'success',
                });
            } catch (e) {
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

canvas {
    height: 80px !important;
    width: 80px !important;
}

.disabled {
    background: #f1f1f1;
    cursor: not-allowed;
    color: #969696;
}

.image-user {
    height: 70px;
    width: 70px;
    object-fit: cover;
}
</style>
