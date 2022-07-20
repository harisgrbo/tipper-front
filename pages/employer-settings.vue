<template>
    <div class="review-wrapper">
        <div v-if="loaded">
            <div class="w-full flex flex-row items-center justify-start">
                <button class="back" @click="$router.go(-1)">
                    <img src="/arrow-left.svg" alt="">
                </button>
                <div>
                    <h2>Employer Settings</h2>
                </div>
            </div>
            <div class="settings-wrapper">
                <div class="flex flex-row w-full justify-between">
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
                        <InputField placeholder="John Doe Address 12" label="Address 2 (optional)" v-model="userInfo.address_2"
                                    class="mb-6"></InputField>
                        <div class="flex flex-row items-center mb-6">
                            <InputField v-model="userInfo.city" label="City" placeholder="City"></InputField>
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
                            <InputField v-model="userInfo.zip_code" label="Zip Code" placeholder="12345"
                                        class="ml-4"></InputField>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <div class="payout-type">
                            <h2>Payout type</h2>
                            <span>Please select one type</span>
                            <div class="flex flex-col mt-4">
                                <div :class="[ 'option', selected_payment_type === type.value ? 'active' : '' ]" v-for="(type, index) in payment_types" @click="selected_payment_type = type.value; setSelectedPaymentType(selected_payment_type)">
                                    {{ type.title }}
                                </div>
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
            selected_payment_type: null,
            payment_types: [
                {
                    value: false,
                    title: 'Equal Payouts'
                },
                {
                    value: true,
                    title: 'Shifts'
                },
            ],
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
        if(this.$auth.user.shifts === 0) {
            this.selected_payment_type = false
        } else {
            this.selected_payment_type = true

        }
        console.log(this.$auth.user)
        await this.fetchStates();
        this.userInfo.firstname = this.$auth.user.firstname;
        this.userInfo.lastname = this.$auth.user.lastname;
        this.userInfo.name = this.$auth.user.username;
        this.userInfo.address_1 = this.$auth.user.address_1;
        this.userInfo.address_2 = this.$auth.user.address_2;
        this.userInfo.city = this.$auth.user.city;
        this.userInfo.state = this.$auth.user.state;
        this.userInfo.zip_code = this.$auth.user.zip_code;
        this.userInfo.email = this.$auth.user.email;

        this.loaded = true;
    },
    methods: {
        away() {
            this.showStates = false;
        },
        async setSelectedPaymentType(t) {
            try {
                await this.$axios.put('/shifts', {
                    shifts: t
                })
                await this.$auth.fetchUser();
                await window.location.reload();

            } catch(e) {
                this.$toast.open({
                    message: e.response.data.message,
                    type: 'error',
                });
                await this.$auth.fetchUser();
                await location.reload();
            }
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
                    alert("Error")
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
            height: fit-content;
            min-height: 300px;
            margin-top: 65px;
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
            width: 300px;

            h4 {
                font-size: 23px;
            }

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

            label {
                font-size: 20px;
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
        max-height: 200px;
        overflow-y: scroll;
        background: #fff;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);

        ul {
            padding: 5px;
            list-style: none;
            display: flex;
            flex-direction: column;

            li {
                height: 42px;
                color: #484848;
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

.option {
    background: #F7F3F0;
    border-radius: 14px;
    height: 60px;
    padding: 0 16px;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    color: #1B1A1A;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 24px;
    cursor: pointer;

    &::after {
        content: '';
        position: absolute;
        height: 20px;
        width: 20px;
        border-radius: 10px;
        background-color: #fff;
        top: 20px;
        right: 20px;
    }

    &.active {
        background: #B45F4B;
        color: #fff;

        &::after {
            content: '';
            position: absolute;
            height: 20px;
            width: 20px;
            border-radius: 10px;
            background-color: #B45F4B;
            border: 5px solid #fff;
            top: 20px;
            right: 20px;
        }
    }
}

.payout-type {
    h2 {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 19px;
        /* identical to box height */

        letter-spacing: 0.01em;

        color: #1B1A1A;

        opacity: 0.6;
    }

    span {
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 0.01em;

        color: #1B1A1A;

        opacity: 0.6;
        margin-bottom: 16px;
    }
}
</style>
