<template>
    <div class="database-wrapper">
        <Loader v-if="!loaded"></Loader>
        <div class="flex flex-col" v-else>
            <h2>Database Business</h2>
            <div class="review-cards-wrapper">
                <div class="bg-white table-header w-full p-md">
                    <div class="flex flex-col employees-wrap">
                        <div class="-overflow-x-auto">
                            <div class="inline-block min-w-full align-middle">
                                <div class="overflow-hidden">
                                    <table class="min-w-full divide-y divide-gray-300">
                                        <thead class="bg-white">
                                        <tr class="main py-3">
                                            <th scope="col" class="py-3.5 pl-4 pr-3 text-left sm:pl-6">Bussiness Name</th>
                                            <th scope="col" class="px-3 py-3.5 text-left">Total # of Tips Sent</th>
                                            <th scope="col" class="px-3 py-3.5 text-left">Total $ Amount of Tips Sent</th>
                                            <th scope="col" class="px-3 py-3.5 text-left">Avg. Tip Amount</th>
                                            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0">
                                                <span class="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody class="divide-y bg-white">
                                        <tr v-for="(user, index) in users" :key="index">
                                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 cursor-pointer" @click="$router.push('/admin/business/' + user.id)">
                                                <div class="flex items-center">
                                                    <div class="flex-shrink-0">
                                                        <img class="h-10 w-10 rounded-full"
                                                             :src="user.avatar_url || '/noimage.png'" alt="">
                                                    </div>
                                                    <div class="ml-4">
                                                        <div class="username">{{ user.name }}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 username">{{ user.tips_count }}</td>
                                            <td class="whitespace-nowrap px-3 py-4 username">${{ user.tips_amount }}</td>
                                            <td class="whitespace-nowrap px-3 py-4 username">${{ user.tips_avg }}</td>

                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GlobalButton from "@/components/GlobalButton";
import ReviewCard from "@/components/ReviewCard";
import Loader from "@/components/Loader"

export default {
    name: "admin",
    layout: 'standard',
    components: {GlobalButton, ReviewCard, Loader},
    data() {
        return {
            users: [],
            rating: 4,
            loaded: false
        }
    },
    mounted() {
        if (this.$auth.user && this.$auth.user.type === 'admin') {
            return
        } else {
            this.$router.push('/sign-in')
        }
    },
    async created() {
        await this.fetchUsers();
    },
    methods: {
        async fetchUsers() {
            this.loaded = false;
            try {
                let res = await this.$axios.get('/admin/employers');

                this.users = res.data.data;

                this.loaded = true;
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

        color: #1B1A1A;

        opacity: 0.6;
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
    font-weight: 300 !important;
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

    opacity: 0.6;
}

.stars img {
    height: 14px;
    width: 14px;
    margin-right: 11px;
    opacity: 0.6;
}

tbody tr {
    background: #F7F3F0;
    border-radius: 10px;
    border: none;

    &:nth-child(2n + 1) {
        background: #fff;
    }
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
</style>
