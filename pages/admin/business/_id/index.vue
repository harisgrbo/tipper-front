<template>
    <div class="database-wrapper">
        <Loader v-if="!loaded"></Loader>
        <div v-else>
            <div class="w-full flex flex-row items-center justify-start top-wrap mb-6">
                <button class="back" @click="$router.go(-1)">
                    <img src="/arrow-left.svg" alt="">
                </button>
                <div>
                    <h2>{{ user.username }}</h2>
                </div>
            </div>
            <div class="business-wrapper mb-6">
                <div class="flex flex-row items-center w-full justify-between">
                    <div class="flex flex-row">
                        <img :src="user.avatar_url !== null ? user.avatar_url : '/noimage.png'" alt="">
                        <div class="flex flex-col justify-between">
                            <dd>{{ user.username }}</dd>
                            <dd class="sub" v-if="user.address_1 !== null">{{ user.address_1 + ', ' + user.state }}</dd>
                            <dd class="sub" v-else>Address placeholder, State placeholder</dd>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <span v-if="user.firstname && user.lastname">{{ user.firstname + ' ' + user.lastname }}</span>
                        <span v-else>FirstName & LastName placeholder</span>
                        <div class="flex flex-row items-center justify-between mt-2">
                            <dd class="sub mr-4">
                                <img src="/email.svg" class="mr-1" alt="">{{ user.email }}</dd>
                            <dd class="sub">
                                <img src="/call.svg" class="mr-1" alt="">+1 342 3212 3212</dd>
                        </div>
                    </div>
                </div>
            </div>
            <div class="review-cards-wrapper">
                <div class="bg-white table-header w-full p-md">
                    <div class="flex flex-col employees-wrap">
                        <div class="-overflow-x-auto">
                            <div class="inline-block min-w-full align-middle">
                                <div class="overflow-hidden">
                                    <table class="min-w-full divide-y divide-gray-300">
                                        <thead class="bg-white">
                                        <tr class="main py-3">
                                            <th scope="col" class="py-3.5 pl-4 pr-3 text-left sm:pl-6 w-1/3">Name</th>
                                            <th scope="col" class="py-3.5 pl-4 pr-3 text-left sm:pl-6 w-1/3">Email</th>
                                            <th scope="col" class="px-3 py-3.5 text-left w-1/3">Date Invited</th>
                                            <th scope="col" class="px-3 py-3.5 text-left w-1/3">Status</th>
                                        </tr>
                                        </thead>
                                        <tbody class="divide-y bg-white">
                                        <tr v-for="(user, index) in users" :key="index">
                                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 cursor-pointer" @click="$router.push('/admin/employee/' + user.id)">
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
                                            <td class="whitespace-nowrap px-3 py-4 username">
                                                {{ user.email }}
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 username">
                                                {{ $moment(user.created_at).format('MM/DD/YYYY') }}
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 username text-right">
                                                {{ user.status ? 'Accepted' : 'Pending' }}
                                            </td>
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
            user: null,
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
        this.loaded = false;
        await this.fetchUsers();
        await this.fetchUser();
        this.loaded = true;
    },
    methods: {
        async fetchUser() {
            try {
                let res = await this.$axios.get('/users/' + this.$route.params.id);

                this.user = res.data.data;
            } catch (e) {
                console.log(e)
            }
        },
        async fetchUsers() {
            try {
                let res = await this.$axios.get('/admin/employer/' + this.$route.params.id);

                this.users = res.data.data.employees;

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

button.back {
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

.top-wrap {
    h2 {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 30px;
        line-height: 45px;
        color: #1B1A1A;
        margin-bottom: 0;
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
}

.business-wrapper {
    background: #fff;
    padding: 30px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    img {
        height: 46px;
        width: 46px;
        border-radius: 23px;
        overflow: hidden;
        margin-right: 18px;
    }

    dd {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 22px;
        letter-spacing: 0.01em;
        color: #000000;
        opacity: 0.8;

        &.sub {
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 19px;
            letter-spacing: 0.01em;
            color: rgba(0, 0, 0, 0.62);
            display: flex;
            flex-direction: row;
            align-items: center ;

            img {
                width: 20px;
                height: auto !important;
                border-radius: 0 !important;
                margin-right: 10px !important;
            }
        }
    }

    span {
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 25px;
        /* identical to box height */

        letter-spacing: 0.01em;

        color: #000000;

        opacity: 0.8;
    }
}

.add-user {
    height: 33px;
    width: 98px;
    border-radius: 90px;
    padding: 7px 14px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    text-align: right;
    color: #B45F4B !important;
    opacity: 1 !important;
}
</style>
