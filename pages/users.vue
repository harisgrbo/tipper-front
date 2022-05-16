<template>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="max-w-7xl mx-auto w-full mt-4">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-xl font-semibold text-gray-900">Users</h1>
                <p class="mt-2 text-sm text-gray-700">A list of all the users including their name, job title, email and
                    role.</p>
            </div>
            <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            </div>
        </div>
        <div class="mt-8 flex flex-col">
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-300">
                            <thead class="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Job
                                    Title
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Status
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Joined
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Action
                                </th>
                            </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                            <tr v-for="(user, index) in users" :key="index">
                                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                    <div class="flex items-center">
                                        <div class="h-10 w-10 flex-shrink-0">
                                            <img class="h-10 w-10 rounded-full"
                                                 src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                 alt="">
                                        </div>
                                        <div class="ml-4">
                                            <div class="font-medium text-gray-900">{{ user.nickname }}</div>
                                            <div class="text-gray-500">{{ user.email }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <div class="text-gray-900">{{ user.job_title }}</div>
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <span
                                        class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">Active</span>
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {{ $moment(user.created_at) }}
                                </td>
                                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 cursor-pointer"
                                    @click="handleTipModal(user)">
                                    <a href="#" class="text-indigo-600 hover:text-indigo-900">Tip</a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="custom-modal" v-if="showTipModal">
            <div class="custom-modal-inner">
                <div class="flex flex-row items-center justify-between">
                    <span>Tip {{ selectedUser.nickname }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                         @click="showTipModal = false; selectedUser = null">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </div>
                <div class="mt-6 grid grid-cols-4 gap-y-6 gap-x-4">
                    <div class="col-span-4">
                        <label for="name-on-card" class="block text-sm font-medium text-gray-700">Description
                            (optional)</label>
                        <div class="mt-1">
                            <input type="text" id="name-on-card" name="name-on-card" v-model="payload.description"
                                   autocomplete="cc-name"
                                   class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        </div>
                    </div>

                    <div class="col-span-3">
                        <label for="expiration-date" class="block text-sm font-medium text-gray-700">Amount</label>
                        <div class="mt-1">
                            <input type="number" name="expiration-date" id="expiration-date" v-model="payload.amount"
                                   autocomplete="cc-exp"
                                   class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        </div>
                    </div>

                    <div>
                        <label for="cvc" class="block text-sm font-medium text-gray-700">Currency</label>
                        <div class="mt-1">
                            <input type="text" disabled name="cvc" v-model="(payload.currency).toLocaleUpperCase()"
                                   id="cvc" autocomplete="csc"
                                   class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        </div>
                    </div>
                </div>
                <button type="button"
                        class="inline-flex items-center px-4 py-2 border border-transparent text-center w-full font-medium rounded-md shadow-sm text-white bg-gray-900 min-w-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        @click="tipUser">Tip User
                </button>
            </div>
        </div>
    </div>
</template>

<script>
// import QrcodeVue from 'qrcode.vue'
export default {
    components: {QrcodeVue},
    name: "users",
    layout: 'standard',
    data() {
        return {
            value: 'https://example.com',
            size: 300,
            users: [],
            showTipModal: false,
            payload: {
                currency: 'usd',
                amount: 0,
                description: ''
            },
            selectedUser: null
        }
    },
    async created() {
        await this.fetchUsers();
    },
    methods: {
        handleTipModal(u) {
            this.showTipModal = !this.showTipModal;

            this.selectedUser = u;
        },
        async fetchUsers() {
            try {
                let res = await this.$axios.get('/users');

                this.users = res.data.data;
            } catch (e) {
                console.log(e)
            }
        },
        async tipUser() {
            try {
                let res = await this.$axios.post(`/users/${this.selectedUser.id}/tips`, this.payload);

                window.location.href = res.data.redirect_uri;
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
</style>
