<template>
    <div class="notification-wrapper">
        <div class="w-full flex flex-row items-center justify-between">
            <div>
                <h2>Notification</h2>
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
            </div>
            <button class="settings-button" @click="$router.push('/notification-settings')">Settings</button>
        </div>
        <div class="notification-list-wrapper">
            <Notification v-for="(notification, index) in notifications" :notification="notification"
                          :key="index"></Notification>
        </div>
    </div>
</template>

<script>
export default {
    name: "notification",
    layout: 'standard',
    data() {
        return {
            notifications: []
        }
    },
    async created() {
        await this.fetchNotifications();
    },
    methods: {
        async fetchNotifications() {
            try {
                let res = await this.$axios.get('/notifications')

                this.notifications = res.data.data;
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
        opacity: 0.3;
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
</style>
