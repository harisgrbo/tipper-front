<template>
    <div class="tipping-wrapper">
        <div class="flex flex-col w-full" v-if="loaded">
           <div class="flex flex-col">
               <div class="profile-block">
                   <img :src="user.avatar_url !== null ? user.avatar_url : '/noimage.png'" alt="">
                   <div class="flex flex-col justify-between">
                       <h2>{{ user.username || (user.firstname + ' ' + user.lastname ) }}</h2>
                       <div class="flex flex-row items-center">
                           <span>{{ user.address_1 ? user.address_1 + ', ' : '' }}</span>
                           <span>{{ user.city ? user.city + ', '  : '' }}</span>
                           <span>{{ user.state ? user.state: ' ' }} </span>
                       </div>
                   </div>
               </div>

               <h3>Send a tip to . . .</h3>

               <div class="staff-wrapper">
                   <div class="staff-block" @click="$router.push(`/user/${user.id}/tip?id=${user.id}&type=user`)" v-if="userMeta.employee_count > 0">
                       <img class="avatar" :src="user.avatar_url !== null ? user.avatar_url : '/noimage.png'" alt="">
                       <div class="flex flex-col items-start justify-start">
                           <p>Entire {{ user.username }} Staff</p>
                           <p class="sub">
                               Send one tip to be evenly split among entire staff.
                           </p>
                       </div>
                       <img class="staff" src="/staff.svg" alt="">
                   </div>
                   <div v-else class="bg-gray-50 p-4 rounded-4 w-full mb-4">
                       <div class="rounded-md bg-yellow-50 p-4">
                           <div class="flex">
                               <div class="flex-shrink-0">
                                   <!-- Heroicon name: solid/exclamation -->
                                   <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                       <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                                   </svg>
                               </div>
                               <div class="ml-3 w-full">
                                   <h5 class="text-sm font-medium text-yellow-800">Attention needed</h5>
                                   <div class="mt-2 text-sm text-yellow-700">
                                       <span>No employees yet.</span>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
                   <div v-for="(pool, index) in pools" :key="index" class="staff-block" @click="$router.push(`/user/${user.id}/tipping/pools/${pool.id}`)">
                       <div class="flex flex-col items-start w-full justify-start">
                           <p>{{ pool.name }}</p>
                       </div>
                       <img class="staff" src="/staff-right.svg" alt="">
                   </div>
               </div>
           </div>
        </div>
       <Loader v-else></Loader>
    </div>
</template>

<script>
import Loader from "@/components/Loader"
export default {
    name: "index",
    components: {Loader},
    layout: 'standard',
    data() {
        return {
            user: null,
            loaded: false,
            pools: [],
            userMeta: null
        }
    },
    async created() {
        await this.fetchUser();
        await this.fetchPools()
    },
    methods: {
        async fetchUser() {
            this.loaded = false;
            try {
                let res = await this.$axios.get('/users/' + this.$route.params.id);

                this.user = res.data.data;
                this.userMeta = res.data.meta;

                console.log(this.user, 'user')
                this.loaded = true
            } catch (e) {
                console.log(e)
            }
        },
        async fetchPools() {
            let res = await this.$axios.get('/users/' + this.$route.params.id + '/pools');

            this.pools = res.data.data;

            console.log(this.pools)

            this.loaded = true
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
    }

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
            border: 1px solid #B45F4B;
            cursor: pointer;
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
            height: fit-content;

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
