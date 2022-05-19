<template>
    <div class="review-wrapper">
        <div v-if="loaded">
            <div class="w-full flex flex-row items-center justify-start">
                <button class="back" @click="$router.go(-1)">
                    <img src="/arrow-left.svg" alt="">
                </button>
                <div>
                    <h2>Employer Settings</h2>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                </div>
            </div>
            <div class="settings-wrapper">
                <div class="flex flex-row w-full">
                    <div class="form-wrapper">
                        <div class="flex flex-row items-center mb-6">
                            <InputField v-model="userInfo.firstname" label="First Name" placeholder="John"
                                        class="mr-4"></InputField>
                            <InputField v-model="userInfo.lastname" label="Last Name" placeholder="Doe"
                                        class="ml-4"></InputField>
                        </div>
                        <InputField placeholder="John Doe" label="Business Name" v-model="userInfo.name"
                                    class="mb-6"></InputField>
                        <InputField placeholder="Johndoe@gmail.com" label="Email" v-model="userInfo.email"
                                    class="mb-6"></InputField>
                        <InputField placeholder="John Doe Address 12" label="Address" v-model="userInfo.address_1"
                                    class="mb-6"></InputField>
                        <InputField placeholder="John Doe Address 12" label="Address" v-model="userInfo.address_2"
                                    class="mb-6"></InputField>
                        <div class="flex flex-row items-center mb-6">
                            <InputField v-model="userInfo.street" label="Street" placeholder="******"
                                        class="mr-4"></InputField>
                            <InputField v-model="userInfo.city" label="City" placeholder="******" class="ml-4"></InputField>
                        </div>
                        <div class="flex flex-row items-center mb-6">
                            <div class="dropdown-wrapper" v-on-clickaway="away">
                                <label class="state-label">State</label>
                                <div class="dropdown-selected" @click="showStates = true;">
                                    {{ userInfo.state.length ? userInfo.state : 'Choose State' }}
                                </div>
                                <div class="dropdown-list" v-show="showStates">
                                    <ul>
                                        <li v-for="(state, index) in states" :key="index"
                                            @click="userInfo.state = state; showStates = false;">
                                            {{ state }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <InputField v-model="userInfo.zip_code" label="Zip Code" placeholder="******"
                                        class="ml-4"></InputField>
                        </div>
                    </div>
                    <div class="logo-wrapper">
                        <h4 v-if="$auth.user.avatar_url === null">Profile Photo</h4>
                        <img v-else :src="$auth.user.avatar_url" alt="">
                        <label for="file-upload" class="custom-file-upload">
                            Change Profile Photo
                        </label>
                        <input id="file-upload" type="file" @change="updateAvatar"/>
                    </div>
                </div>
                <div class="buttons-wrapper">
                    <button class="save" @click="saveSettings()">Save</button>
                </div>
            </div>
        </div>
        <Loader v-else></Loader>
    </div>
</template>

<script>
import InputField from "~/components/inputs/InputField";
import Loader from "@/components/Loader"
import {mixin as clickaway} from 'vue-clickaway';

export default {
    name: "employer-settings",
    components: {InputField, Loader},
    layout: 'standard',
    mixins: [clickaway],
    data() {
        return {
            showStates: false,
            states: [],
            loaded: false,
            avatarUrl: '',
            userInfo: {
                firstname: '',
                lastname: '',
                nickname: '',
                job_title: '',
                name: '',
                password: '',
                email: '',
                address_one: '',
                address_two: '',
                state: '',
            }
        }
    },
    async created() {
        this.loaded = false;
        await this.fetchStates();
        this.userInfo.firstname = this.$auth.user.firstname;
        this.userInfo.lastname = this.$auth.user.lastname;
        this.userInfo.name = this.$auth.user.username;
        this.userInfo.address_1 = this.$auth.user.address_1;
        this.userInfo.address_2 = this.$auth.user.address_2;
        this.userInfo.city = this.$auth.user.city;
        this.userInfo.state = this.$auth.user.state;
        this.userInfo.zip_code = this.$auth.user.zip_code;
        this.userInfo.street = this.$auth.user.street;
        this.userInfo.email = this.$auth.user.email;

        this.loaded = true;
    },
    methods: {
        away() {
            this.showStates = false;
        },
        async updateAvatar(event) {
            if (event.target.files.length) {
                let image = event.target.files[0];
                let formData = new FormData();
                formData.append('avatar', image);

                try {
                    await this.$axios.post('/avatar', formData, {
                        'headers': {
                            'Content-Type': 'multipart/form-data'
                        }
                    })

                    await this.$auth.fetchUser();

                    this.avatarUrl = this.$auth.user.avatar_url;
                } catch (e) {
                    alert("Avatar nije moguce postaviti")
                }
            }
        },
        async fetchStates() {
            try {
                let res = await this.$axios.get('/us/states');

                this.states = res.data.data;
            } catch (e) {
                console.log(e)
            }
        },
        async saveSettings() {
            try {
                let payload = {};
                for (let key in this.userInfo) {
                    if (this.userInfo[key] !== '' && this.userInfo[key] !== null) {
                        payload[key] = this.userInfo[key];
                    }
                }
                await this.$axios.put('/me', payload);

                this.$toast.open({
                    message: 'Settings saved successfully',
                    type: 'success',
                });

                await this.$auth.fetchUser();


            } catch (e) {
                this.$toast.open({
                    message: Object.values(e.response.data.errors).join(" "),
                    type: 'error',
                });

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

    .settings-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 44px;
        background: #fff;
        padding: 24px;

        .form-wrapper {
            display: flex;
            flex-direction: column;
            width: 766px;
            margin-right: 52px;
            min-width: 766px;
        }

        .logo-wrapper {
            height: 518px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff;
            border: 2px dashed rgba(0, 0, 0, 0.2);
            box-sizing: border-box;
            border-radius: 10px;
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 800;
            font-size: 38px;
            line-height: 57px;
            color: #000000;
            width: 100%;
            position: relative;
            margin-top: 12px;

            input[type="file"] {
                display: none;
            }

            .custom-file-upload {
                display: flex;
                cursor: pointer;
                position: absolute;
                bottom: 24px;
                left: 24px;
                right: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 30px;
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;

                letter-spacing: 0.02em;

                color: #B45F4B;
            }
        }
    }
}

button.save {
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1.5px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    border-radius: 15px;
    margin-right: 27px;
    min-width: fit-content;
    padding: 0 24px;
}

h4 {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 38px;
    line-height: 57px;
    color: #B45F4B;
}

.dropdown-wrapper {
    display: flex;
    width: 100%;
    height: fit-content;
    position: relative;
    flex-direction: column;

    .dropdown-selected {
        min-height: 60px !important;
        cursor: pointer;
        height: 60px;
        background: rgba(216, 205, 188, 0.2);
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 0 24px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 25px;
        color: #000000;

        &:focus {
            outline: none;
        }
    }

    .dropdown-list {
        position: absolute;
        top: 96px;
        left: 0;
        right: 0;
        z-index: 1;
        display: flex;
        flex-direction: column;
        border-radius: 15px;
        background: #fff;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);

        ul {
            padding: 5px;
            list-style: none;
            display: flex;
            flex-direction: column;

            li {
                height: 42px;
                color: #D8CDBC;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                padding: 0 9px;
                cursor: pointer;

                &:hover {
                    background: #F7F5F2;
                    border-radius: 10px;
                    color: #C67D65;
                }

            }
        }
    }
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

.state-label {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.01em;
    color: #1B1A1A;
    opacity: 0.4;
    margin-bottom: 10px;
    margin-top: 0;
}

.buttons-wrapper {
    display: flex;
    flex-direction: column;
    width: 766px;

    button {
        height: 54px;
        background: #B45F4B;
        border-radius: 14px;
        color: #fff;
        margin-right: 0;
    }
}
</style>
