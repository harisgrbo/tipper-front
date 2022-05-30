<template>
    <div class="w-full min-h-screen flex flex-col">
        <div class="min-h-full flex auth-wrapper">
            <div class="flex flex-1 image-bg">
            </div>
            <div class="flex-1 flex flex-col justify-center items-center">
                <div class="mx-auto w-full">
                    <div class="flex flex-col justify-start items-start title-wrap">
                        <img src="/logo.svg" class="mb-4" @click="$router.push('/')"/>
                        <span>Tipper’s community is growing every day.</span>
                    </div>

                    <form class="mt-8 bg-white main-form-wrapper" @submit.prevent="login()">
                        <div class="w-full">
                            <div class="space-y-6">
                                <h1>Login</h1>
                                <InputField v-model="payload.username" label="Email Address"
                                            placeholder="johndoe@gmail.com"></InputField>
                                <InputField v-model="payload.password" type="password" label="Password"
                                            hint-text="At least 8 characters and require at least 1 digit or special character"
                                            placeholder="*********"></InputField>

                                <div class="flex items-center justify-end">
                                    <div class="text-sm">
                                        <nuxt-link to="/reset-password"
                                                   class="reset text-indigo-600 hover:text-indigo-500"> Forgot password?
                                        </nuxt-link>
                                    </div>
                                </div>

                                <div>
                                    <GlobalButton placeholder="Login" type="submit" bg-color="#C67D65"
                                                  txt-color="#fff"></GlobalButton>
                                </div>
                                <div class="sign-up">
                                    <span>Not a member yet? </span>
                                    <nuxt-link to="/register" class="font-medium text-indigo-600 link">Sign up
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

export default {
    components: {InputField},
    name: "sign-in",
    data() {
        return {
            payload: {
                grant_type: 'password',
                client_id: 2,
                client_secret: 'il4dy3lNuKHlBWIh7AltaTaxhVC3idt1zEOsrKnD',
                username: '',
                password: '',
            }
        }
    },
    methods: {
        async login() {
            if(!this.payload.username.length) {
                this.$toast.open({
                    message: 'Please enter your Email Address',
                    type: 'error',
                });

                return
            }
            if(!this.payload.password.length) {
                this.$toast.open({
                    message: 'Please enter your Password',
                    type: 'error',
                });

                return
            }
            try {
                await this.$auth.loginWith("local", {data: this.payload});
                await this.$auth.fetchUser();
            } catch (e) {
                this.$toast.open({
                    message: e.response.data.error_description,
                    type: 'error',
                });
            }
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

.reset {
    color: #B45F4B !important;
    opacity: 1 !important;
    font-weight: 400 !important;
}

.image-bg {
    background: url(/new-bg.svg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
</style>
