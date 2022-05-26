<template>
    <div class="tipping-wrapper">
        <div class="flex flex-col" v-if="loaded">
            <div class="flex flex-row items-center justify-start">
                <button @click="$router.go(-1)" class="back">
                    <img src="/arrow-left.svg" alt="">
                </button>
                <img src="/logo.svg" class="logo" @click="$router.push('/')"/>
            </div>
            <h3>{{ pool.name }}</h3>
            <div class="staff-block" @click="$router.push(`/user/${$route.params.id}/tip?id=${pool.id}&type=pool`)">
                <img class="avatar" src="/noimage.png" alt="">
                <div class="flex flex-col items-start justify-start">
                    <p>Entire {{ pool.name }} Staff</p>
                    <p class="sub">
                        Send one tip to be evenly split among entire staff.
                    </p>
                </div>
                <img class="staff" src="/staff.svg" alt="">
            </div>
            <h3>Tip an individual</h3>

            <div class="staff-wrapper">
                <div v-for="(user, index) in pool_users" :key="index" class="staff-block" @click="$router.push(`/user/${user.id}/tip?id=${user.id}&type=user`)">
                    <img class="avatar" src="/noimage.png" alt="">
                    <div class="flex flex-col items-start w-full justify-start">
                        <p>{{ user.firstname + ' ' + user.lastname }}</p>
                        <p class="sub">{{ pool.name }}</p>
                    </div>
                    <img class="staff" src="/staff-right.svg" alt="">
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
            pool: null,
            loaded: false,
            pool_users: []
        }
    },
    async created() {
        await this.fetchPool();
        await this.fetchPoolUsers()
    },
    methods: {
        async fetchPool() {
            this.loaded = false;
            try {
                let res = await this.$axios.get('/pools/' + this.$route.params.idPool);

                this.pool = res.data.data;

                this.loaded = true
            } catch (e) {
                console.log(e)
            }
        },
        async fetchPoolUsers() {
            let res = await this.$axios.get('/pools/' + this.$route.params.idPool + '/users');

            this.pool_users = res.data.data;

            console.log(this.pool_users)
            this.loaded = true
        }
    }
}
</script>

<style scoped lang="scss">
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
}

</style>
