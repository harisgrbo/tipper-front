<template>
    <div class="w-full min-h-screen flex flex-col">
        <div class="min-h-full flex auth-wrapper">
            <div class="flex flex-1 bg-white image-bg">
            </div>
            <div class="flex-1 flex flex-col justify-center items-center">
                <div class="mx-auto w-full">
                    <div class="flex flex-col justify-start items-start title-wrap">
                        <img src="/logo.svg" class="mb-4" @click="$router.push('/')"/>
                        <span>Sign up and help your employees start making more money right away.</span>
                    </div>

                    <form class="mt-8 bg-white main-form-wrapper" @submit.prevent="register">
                        <div class="w-full">
                            <div class="space-y-6">
                                <h1>Create Account</h1>
                                <div class="flex flex-row items-center">
                                    <InputField v-model="payload.firstname" label="First Name" placeholder="John"
                                                class="mr-4"></InputField>
                                    <InputField v-model="payload.lastname" label="Last Name" placeholder="Doe"
                                                class="ml-4"></InputField>
                                </div>
                                <InputField v-model="payload.email" label="Enter email Address"
                                            placeholder="johndoe@gmail.com"></InputField>
                                <InputField v-model="payload.password"
                                            hint-text="At least 8 characters and require at least 1 digit or special character"
                                            type="password" label="Password" placeholder="*********"></InputField>
                                <InputField v-model="payload.confirm_password" type="password" label="Confirm Password"
                                            hint-text="At least 8 characters and require at least 1 digit or special character"
                                            placeholder="*********"></InputField>
                                <InputField v-model="payload.business_name" label="Business name"
                                            hint-text="This is the name that will be shown to your tippers"
                                            placeholder="Business name"></InputField>
                                <InputField v-model="payload.address_1" label="Address 1"
                                            placeholder="Address one"></InputField>
                                <InputField v-model="payload.address_2" label="Address 2 (optional)"
                                            placeholder="Address two"></InputField>
                                <div class="flex flex-row items-center">
                                    <InputField v-model="payload.city" label="City" placeholder="City"></InputField>
                                </div>
                                <div class="flex flex-row items-center">
                                    <div class="dropdown-wrapper" v-on-clickaway="away">
                                        <label class="state-label">State</label>
                                        <div class="dropdown-selected" @click="showStates = true;">
                                            {{ payload.state.length ? payload.state : 'Choose State' }}
                                        </div>
                                        <div class="dropdown-list" v-show="showStates">
                                            <ul>
                                                <li v-for="(state, index) in states" :key="index"
                                                    @click="payload.state = state; showStates = false;">
                                                    {{ state }}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <InputField v-model="payload.zip_code" label="Zip Code" placeholder="12345"
                                                class="ml-4"></InputField>
                                </div>
                                <div>
                                    <GlobalButton placeholder="Sign up" type="submit" bg-color="#B45F4B"
                                                  txt-color="#fff"></GlobalButton>
                                </div>
                                <div class="sign-up">
                                    <span>Already a member? Log in.</span>
                                    <nuxt-link to="/sign-in" class="font-medium text-indigo-600 hover:text-indigo-500">
                                        Login
                                    </nuxt-link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InputField from "~/components/inputs/InputField";
import {mixin as clickaway} from 'vue-clickaway';

export default {
    components: {InputField},
    mixins: [clickaway],
    name: "register",
    data() {
        return {
            showStates: false,
            states: [],
            selectedState: null,
            password_two: '',
            payload: {
                firstname: '',
                lastname: '',
                business_name: '',
                email: '',
                password: '',
                address_1: '',
                address_2: '',
                confirm_password: '',
                street: '',
                city: '',
                state: '',
                zip_code: '',

            },
            loginPayload: {
                grant_type: 'password',
                client_id: 2,
                client_secret: 'il4dy3lNuKHlBWIh7AltaTaxhVC3idt1zEOsrKnD',
                username: '',
                password: '',
            }
        }
    },
    async created() {
        await this.fetchStates();
    },
    methods: {
        async register() {
            if (this.payload.password !== this.payload.confirm_password) {
                this.$toast.open({
                    message: 'Passwords dont match',
                    type: 'error',
                });
            }

            try {
                let res = await this.$axios.post('/employer/register', this.payload).then(() => {
                    this.handlePostRegister();
                })

            } catch (e) {
                console.log(e)
                this.$toast.open({
                    message: Object.values(e.response.data.errors).join(" "),
                    type: 'error',
                });
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
        away() {
            this.showStates = false;
        },
        selectState(s) {
            this.selectedState = s;
        },
        async handlePostRegister() {
            this.loginPayload.username = this.payload.email;
            this.loginPayload.password = this.payload.password;

            await this.$auth.loginWith("local", {data: this.loginPayload});
        }
    }
}
</script>

<style scoped lang="scss">
.auth-wrapper {
    min-height: 100vh;
    background: #F7F8FA;
    padding: 15px;

    .main-form-wrapper {
        display: flex;
        margin-left: 53px;
        margin-right: 134px;
        padding: 32px;

        h1 {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size: 30px;
            line-height: 45px;
            color: #1B1A1A;
        }

        small {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 21px;
            letter-spacing: 0.01em;
            color: #1B1A1A;
            opacity: 0.6;
        }
    }

    .title-wrap {
        display: flex;
        margin-left: 53px;
        margin-right: 134px;
        margin-top: 70px;


        h3 {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: bold;
            font-size: 38px;
            line-height: 57px;
            color: #000000;
        }

        span {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
            letter-spacing: 0.01em;
            color: #161616;
        }
    }

    a {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
        color: #1B1A1A;
        opacity: 0.4;
    }
}

.sign-up {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin-top: 24px;

    span {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 22px;
        color: rgba(27, 26, 26, 0.4);
    }

    a {
        font-family: 'Poppins';
        margin-left: 4px;
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 22px;
        color: #B45F4B;
        opacity: 1 !important;
    }
}

.image-bg {
    background: url(/new-bg.svg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
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
        max-height: 150px;
        overflow: scroll;
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

</style>
