<template>
    <div class="w-full min-h-screen flex flex-col">
        <div class="min-h-full flex auth-wrapper">
            <div class="flex flex-1 bg-white image-bg">
            </div>
            <div class="flex-1 flex flex-col justify-center items-center">
                <div class="mx-auto w-full">
                    <div class="flex flex-col justify-start items-start title-wrap">
                        <img src="/transparent.png" class="mb-4 logo" @click="$router.push('/')"/>
                    </div>

                    <form class="mt-8 bg-white main-form-wrapper" @submit.prevent="register">
                        <div class="w-full">
                            <div class="space-y-6">
                                <h1>Create Your Tipper Account</h1>
                                <small>Start making more tips today.</small>
                                <InputField v-model="payload.first_name" label="First name"
                                            placeholder="John"></InputField>
                                <InputField v-model="payload.last_name" label="Last name"
                                            placeholder="Doe"></InputField>
                                <InputField v-model="payload.password" type="password" label="Password"
                                            hint-text="At least 8 characters and require at least 1 digit or special character"
                                            placeholder="*********"></InputField>
                                <InputField v-model="payload.confirm_password" type="password" label="Confirm Password"
                                            hint-text="At least 8 characters and require at least 1 digit or special character"
                                            placeholder="*********"></InputField>
                                <div>
                                    <GlobalButton placeholder="Sign up" type="submit" bg-color="#C67D65"
                                                  txt-color="#fff"></GlobalButton>
                                </div>
                                <div class="sign-up">
                                    <span>Already a member?</span>
                                    <nuxt-link to="/sign-in" class="font-medium text-indigo-600 hover:text-indigo-500">
                                        Log in
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
    name: "register-employee",
    data() {
        return {
            showDropdown: false,
            searchTerm: '',
            password_two: '',
            payload: {
                email: '',
                first_name: '',
                last_name: '',
                username: '',
                password: '',
                confirm_password: '',
                employer_id: '',
            },
            selectedPoolId: '',
        }
    },
    methods: {
        async register() {
            if (this.payload.password !== this.payload.confirm_password) {
                this.$toast.open({
                    message: 'Passwords dont match',
                    type: 'error',
                });

                return
            }

            try {
                let res = await this.$axios.post('/employee/register', {
                    firstname: this.payload.first_name,
                    lastname: this.payload.last_name,
                    password: this.payload.password,
                    uuid: this.$route.params.hash
                });

                if (res.status === 200) {
                    window.location.href = res.data.redirect_uri;
                }

            } catch (e) {
                console.log(e)
            }
        },
    }
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
    @media (max-width: 599px) {
        @content;
    }
}
.auth-wrapper {
    min-height: 100vh;
    background: #F7F8FA;
    padding: 15px;

    .main-form-wrapper {
        display: flex;
        margin-left: 53px;
        margin-right: 134px;
        padding: 32px;

        @include for-phone-only {
            margin-left: 0;
            margin-right: 0;
            padding: 24px;
        }

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

        @include for-phone-only {
            margin-left: 0;
            margin-right: 0;
        }

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
            opacity: 0.3;
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
        color: #1B1A1A;
        opacity: 0.4;
    }

    a {
        font-family: 'Poppins';
        margin-left: 4px;
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 22px;
        color: #1B1A1A;
        opacity: 0.6;
    }
}

.employer-dropdown {
    position: relative;
    display: flex;
    flex-direction: column;

    ul {
        position: absolute;
        top: 97px;
        left: 0;
        right: 0;
        height: fit-content;
        background: #fff;
        z-index: 10;
        border-radius: 16px;
        max-height: 200px;
        overflow: scroll;
        box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.18);
        -webkit-box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.18);
        -moz-box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.18);

        li {
            font-size: 14px;
            font-weight: 400;
            width: 100%;
            padding: 12px 24px;

            &:hover {
                cursor: pointer;
                background: #f1f1f1;
            }

            &:first-child {
                padding: 0px 24px;
                min-height: 50px;
            }
        }
    }
}

.image-bg {
    background: url(/new-bg.svg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    @include for-phone-only {
        display: none;
    }
}

select {
    min-height: 60px !important;
    height: 60px;
    background: rgba(216, 205, 188, 0.2);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0 24px;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';

    &:focus {
        outline: none;
    }
}

label {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.01em;
    color: #1B1A1A;
    opacity: 0.4;
    margin-bottom: 10px;
}

::placeholder {
    color: #b1b1b1;
}

.logo {
    height: 40px;
}
</style>
