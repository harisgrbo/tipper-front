<template>
    <div class="review-wrapper">
        <div class="w-full flex flex-row items-center justify-start">
            <button @click="$router.go(-1)">
                <img src="/arrow-left.png" alt="">
            </button>
            <div>
                <h2>Notification Settings</h2>
                <span class="first">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
            </div>
        </div>
        <div class="settings-wrapper">
            <span class="second">Setting Manually</span>
            <ul class="w-full">
                <li>
                    <p>Sender send tip</p>
                    <label class="switch">
                        <input type="checkbox" v-model="notificationSettings.sender_send_tip">
                        <span class="slider round"></span>
                    </label>
                </li>
                <li>
                    <p>Employee received tip</p>
                    <label class="switch">
                        <input type="checkbox" v-model="notificationSettings.employee_received_tip"
                               @change="saveNotificationSettings()">
                        <span class="slider round"></span>
                    </label>
                </li>
                <li>
                    <p>Add bank account</p>
                    <label class="switch">
                        <input type="checkbox" v-model="notificationSettings.add_bank_account"
                               @change="saveNotificationSettings()">
                        <span class="slider round"></span>
                    </label>
                </li>
                <li>
                    <p>Remove bank account</p>
                    <label class="switch">
                        <input type="checkbox" v-model="notificationSettings.remove_bank_account"
                               @change="saveNotificationSettings()">
                        <span class="slider round"></span>
                    </label>
                </li>
                <li>
                    <p>Welcome email</p>
                    <label class="switch">
                        <input type="checkbox" v-model="notificationSettings.welcome_email"
                               @change="saveNotificationSettings()">
                        <span class="slider round"></span>
                    </label>
                </li>
                <li>
                    <p>User removed as employee</p>
                    <label class="switch">
                        <input type="checkbox" v-model="notificationSettings.user_removed_as_employee"
                               @change="saveNotificationSettings()">
                        <span class="slider round"></span>
                    </label>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import InputField from "~/components/inputs/InputField";

export default {
    name: "notification-settings",
    components: {InputField},
    layout: 'standard',
    middleware: 'auth',
    data() {
        return {
            notificationSettings: {}
        }
    },
    created() {
        Object.assign(this.notificationSettings, this.$auth.user.settings.notifications)

        console.log(this.notificationSettings, 'settings')
    },
    methods: {
        async saveNotificationSettings() {
            try {
                let res = await this.$axios.put('/settings/notifications', this.notificationSettings);
                console.log(res, 'res')

                this.$toast.open({
                    message: 'Settings saved successfully',
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
.review-wrapper {
    width: 1240px;
    margin: 0 auto;
    min-height: 100vh;
    padding-bottom: 60px;

    button {
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

    h2 {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 30px;
        line-height: 45px;
        color: #1B1A1A;
    }

    span.first {
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

    .settings-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 44px;

        span.second {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 21px;
            letter-spacing: 0.01em;
            color: #1B1A1A;
            opacity: 0.4;
            margin-bottom: 20px;
        }

        ul {
            display: flex;
            flex-direction: column;

            li {
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-radius: 15px;
                margin-bottom: 10px;
                padding: 0 24px;
                background: #fff;
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);

                p {
                    font-family: 'Poppins';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 21px;
                    /* identical to box height */

                    letter-spacing: 0.01em;

                    color: #161616;

                    opacity: 0.6;
                }
            }
        }
    }
}

/* The switch - the box around the slider */
.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 33px;
}

/* Hide default HTML checkbox */
.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

/* The slider */
.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(198, 125, 101, 0.10);;
    -webkit-transition: .4s;
    transition: .4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: #fff;
    -webkit-transition: .4s;
    transition: .4s;
}

input:checked + .slider {
    background-color: #C67D65;;
}

input:focus + .slider {
    box-shadow: 0 0 1px #C67D65;;
}

input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}
</style>
