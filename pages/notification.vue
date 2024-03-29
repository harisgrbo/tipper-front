<template>
    <div class="notification-wrapper">
        <div class="flex flex-col" v-if="loaded">
            <div class="w-full flex flex-row items-center justify-between">
                <div>
                    <h2>Notifications</h2>
                </div>
                <button class="settings-button" @click="$router.push('/notification-settings')">Settings</button>
            </div>
            <div v-show="!notifications.length" class="p-6 bg-white mt-6 rounded-xl text-semibold text-lg">
                <h3 v-if="$auth.user.type === 'employee'">No notifications yet! They will appear once you get your first tip.</h3>
                <h3 v-else>Notifications will appear here once employees start receiving tips!</h3>
            </div>
            <div class="notification-list-wrapper" v-show="notifications.length">
                <Notification v-for="(notification, index) in notifications" :notification="notification"
                              :key="index"></Notification>
            </div>
            <button class="clear" v-show="notifications.length" @click="clearNotifications">Clear notifications</button>
        </div>
        <Loader v-else></Loader>
    </div>
</template>

<script>
import Loader from "@/components/Loader";
export default {
    name: "notification",
    components: {Loader},
    layout: 'standard',
    data() {
        return {
            notifications: [],
            loaded: false,
        }
    },
    async created() {
        await this.fetchNotifications();
    },
    methods: {
        async clearNotifications() {
            try {
                await this.$axios.post('/notifications/read');

                this.$toast.open({
                    message: 'You have read the notifications',
                    type: 'success',
                });

                this.notifications = [];

                this.$nuxt.$emit('clear-notifications');
            } catch (e) {
                console.log()
            }
        },
        async fetchNotifications() {
            this.loaded = false;
            try {
                let res = await this.$axios.get('/notifications')

                this.notifications = res.data.data;

                this.loaded = true;
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>

<style scoped lang="scss">
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
    }

    .notification-list-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 44px;
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

.clear {
    height: 53px;
    width: fit-content;
    padding: 0 24px;
    margin-top: 24px;
    background: rgba(180, 95, 75, 0.1);
    border-radius: 15px;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height */


    color: #B45F4B;
}
</style>
