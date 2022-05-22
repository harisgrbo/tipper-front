<template>
    <div class="flex flex-col">
        <div v-if="loaded" class="notification-wrapper">
            <div class="w-full flex flex-row items-center justify-between">
                <div class="flex flex-row">
                    <button class="back" @click="$router.go(-1)">
                        <img src="/arrow-left.svg" alt="">
                    </button>
                    <h2>Pool Settings</h2>
                </div>
                <button class="settings-button" @click="$modal.show('create-pool')">Create new Pool</button>
            </div>
            <div class="notification-list-wrapper">
                <div class="mt-6 flex flex-col w-full bg-white">
                    <div class="-overflow-x-auto">
                        <div class="inline-block min-w-full align-middle">
                            <div class="overflow-hidden">
                                <div class="bg-white table-header p-md">
                                    <div class="p-6 flex w-full flex-row items-center justify-between inner">
                                        <div class="sm:flex-auto flex flex-row items-center justify-between">
                                            <div>
                                                <h4>List of Pools</h4>
                                            </div>
                                        </div>
                                        <div class="flex flex-row items-center">
                                            <button @click="$router.push('/invite/employees')">
                                                Invite Employees
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <table class="min-w-full divide-y divide-gray-300">
                                    <thead class="bg-white">
                                    <tr class="main">
                                        <th scope="col" class="px-3 py-3.5 text-left">Pool name</th>
                                        <th scope="col" class="px-3 py-3.5 text-left">Number of employees in Pool</th>
                                        <th scope="col" class="px-3 py-3.5 text-left">Created Date</th>
                                    </tr>
                                    </thead>
                                    <tbody class="divide-y bg-white">
                                    <tr v-for="(pool, index) in pools" :key="index">
                                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                            <div class="flex items-center">
                                                <div class="flex-shrink-0">
                                                    <img class="h-10 w-10 rounded-full" src="/avatar.svg" alt="">
                                                </div>
                                                <div class="ml-4">
                                                    <div class="username">
                                                        {{ pool.name }}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                            {{ pool.employments_count }}
                                        </td>
                                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                            {{ $moment(pool.created_at).format('DD/MM/YYYY') }}
                                        </td>
                                        <td class="whitespace-nowrap py-4 text-right pl-4 pr-3 text-sm sm:pl-6" @click="fetchPoolEmployees(pool.id); selectedNewPool = pool; $modal.show('pool-employees');">
                                            <div class="flex flex-row items-center justify-end">
                                                <button class="show">
                                                    Show Pool Employees
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <client-only>
                <modal name="create-pool"
                       width="600"
                       height="auto"
                       @before-open="beforeOpen"
                       @before-close="beforeClose">
                    <div class="flex flex-col">
                        <div class="flex flex-row items-center justify-between w-full mb-6">
                            <h2>Create new Pool</h2>
                            <svg @click="$modal.hide('create-pool')" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <div class="modal-content w-full">
                            <div class="flex flex-row items-center justify-between">
                                <InputField v-model="payload.name" label="Enter Pool name"></InputField>
                            </div>
                            <GlobalButton placeholder="Create Pool" width="100%" bg-color="#B45F4B" txt-color="#fff" class="mt-6"
                                          @handle-button-action="createPool"></GlobalButton>

                        </div>
                    </div>
                </modal>
            </client-only>
            <client-only>
                <modal name="pool-employees"
                       width="600"
                       height="auto"
                       @before-open="beforeOpen"
                       @before-close="beforeClose">
                    <div class="flex flex-col" v-if="selectedNewPool !== null">
                        <div class="flex flex-row items-center justify-between w-full mb-6">
                            <h2 class="modal-title">List of {{ selectedNewPool.name }} Pool employees</h2>
                            <svg @click="$modal.hide('pool-employees'); selectedNewPool = null;" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <div class="modal-content w-full">
                            <Loader v-if="!usersLoaded"></Loader>
                            <div v-else>
                                <ul v-show="pool_users.length" class="pool-users">
                                    <li v-for="(user, index) in pool_users">
                                        <div class="flex-shrink-0">
                                            <img class="h-10 w-10 mr-3 rounded-full" :src="user.avatar_url ? user.avatar_url : '/avatar.svg'" alt="">
                                        </div>
                                        {{ user.username }}
                                    </li>
                                </ul>
                                <div v-show="!pool_users.length" class="my-6">
                                    You don't have Employees in this pool
                                </div>
                            </div>

                        </div>
                    </div>
                </modal>
            </client-only>
        </div>
        <Loader v-else></Loader>
    </div>
</template>

<script>
import GlobalButton from "~/components/GlobalButton";
import ReviewCard from "~/components/ReviewCard";
import InputField from "@/components/inputs/InputField";
import Loader from "@/components/Loader";
export default {
    name: "pools",
    layout: 'standard',
    components: {InputField, GlobalButton, ReviewCard, Loader},
    data() {
        return {
            users: [],
            loaded: false,
            showPoolCreating: false,
            showPoolModal: false,
            selectedNewPool: null,
            pools: [],
            payload: {
                name: '',
            },
            selectedPool: null,
            pool_users: [],
            usersLoaded: false
        }
    },
    async created() {
        await this.fetchPools();
    },
    methods: {
        beforeOpen() {
            document.body.style.overflow = 'hidden';
        },
        beforeClose() {
            document.body.style.overflow = 'auto';
        },
        async fetchPools() {
            this.loaded = false;
            try {
                let res = await this.$axios.get('/pools');

                this.pools = res.data.data;

                this.loaded = true;
            } catch (e) {
                console.log(e)
            }
        },
        async fetchPoolEmployees(id) {
            this.usersLoaded = false;
            try {
                let res = await this.$axios.get(`/pools/${id}/users`);

                this.pool_users = res.data.data;

                console.log(this.pool_users)
                this.usersLoaded = true;
            } catch(e) {
                console.log(e)
            }
        },
        async createPool() {
            try {
                let res = await this.$axios.post('/pools', this.payload);

                this.pools.push(res.data.data)

                this.payload.name = '';
                this.payload.description = '';

                this.$modal.hide('create-pool')
            } catch (e) {
                console.log(e)
            }
        },
        async addUserToPool(u) {
            try {
                let res = await this.$axios.post(`/pools/${this.selectedPool.id}/users/${u.id}`);

                this.selectedPool = null;
                this.showPoolModal = false;
            } catch (e) {
                console.log(e)
            }
        },
        showAddUserToPoolModal(p) {
            this.selectedPool = p;
            this.showPoolModal = true;
        },
        async tipPool(p) {
            try {
                let res = await this.$axios.post(`/pools/${p.id}/tips`);
            } catch (e) {
                console.log(e)
            }
        },
        async removeUserFromPool(u, p) {
            try {
                await this.$axios.delete(`/pools/${p.id}/users/${u.id}`);

            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>

<style scoped lang="scss">
.database-wrapper {
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
        margin-bottom: 42px;
    }

    .review-cards-wrapper {
        display: flex;
        width: 100%;
        border-radius: 14px;
        overflow: hidden;
    }
}


.table-header {

    .inner {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    h4 {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 22px;
        line-height: 33px;
        color: #1B1A1A;
    }

    span {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        /* identical to box height */

        letter-spacing: 0.01em;

        color: #161616;

        opacity: 0.3;
    }

    button {
        height: 35px;
        border: 1px solid rgba(48, 48, 48, 1);
        border-radius: 90px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 14px;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 21px;
        text-align: right;
        color: #303030;
        margin-right: 24px;

        &.active {
            background: rgba(48, 48, 48, 0.1);
            color: rgba(48, 48, 48, 0.6);
            border: none;

        }

        &:last-child {
            margin-right: 0;
        }
    }
}

table thead {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.01em;
    color: #1B1A1A;
    opacity: 0.4;
}

table img {
    height: 30px;
    width: 30px;
}

tr .username {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    color: #1B1A1A;
    opacity: 0.3;
}

.stars img {
    height: 14px;
    width: 14px;
    margin-right: 11px;
    opacity: 0.6;
}

tbody tr {
    background: #F6F8FA;
    border-radius: 10px;
    border: none;

    &:nth-child(2n + 1) {
        background: #fff;
    }
}

.add-user-modal {
    position: fixed;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.34);
    display: flex;
    align-items: center;
    justify-content: center;

    .main-modal {
        height: fit-content;
        width: 500px;
        border-radius: 16px;
        padding: 24px;
        background: #f9f9f9;
    }
}

.employees-wrap {
    h2 {
        margin-bottom: 0;
    }
}



.notification-wrapper {
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

    .notification-list-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 44px;
        width: 100%;
    }
}

.settings-button {
    height: 54px;
    border: 1.5px solid rgba(198, 125, 101, 0.3);
    box-sizing: border-box;
    border-radius: 15px;
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 24px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.40);
    flex: none;
    order: 0;
    flex-grow: 0;
}

table thead {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.01em;
    color: #1B1A1A;
}

table img {
    height: 30px;
    width: 30px;
}

tr .username {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    color: #1B1A1A;
    opacity: 0.6;
    cursor: pointer;
}

tr.main th {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    /* identical to box height */

    letter-spacing: 0.01em;

    color: #1B1A1A;

    opacity: 1 !important;
}

.back {
    height: 54px;
    width: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border: 1.5px solid rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    margin-right: 27px;
}

h2.modal-title {
    font-size: 24px;
}

.show {
    height: 35px;
    border: 1px solid rgba(48, 48, 48, 1);
    border-radius: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 14px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    text-align: right;
    color: #303030;
    margin-right: 24px;
}

.modal-content {
    ::v-deep .loader-wrapper {
        height: 200px;
    }
}

.pool-users {
    display: flex;
    flex-direction: column;

    li {
        padding: 12px 0;
        font-size: 14px;
        font-weight: 500;
        border-bottom: 1px solid #f1f1f1;
        display: flex;
        align-items: center;

        &:last-child {
            border-bottom: none;
        }
    }
}
</style>
