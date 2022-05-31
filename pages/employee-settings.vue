<template>
    <div class="review-wrapper">
        <div v-if="loaded">
            <div class="w-full flex flex-row items-center justify-start">
                <button class="back" @click="$router.go(-1)">
                    <img src="/arrow-left.svg" alt="">
                </button>
                <div>
                    <h2>Employee Settings</h2>
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
                        <InputField placeholder="John Doe" label="Nickname" v-model="userInfo.name"
                                    class="mb-6"></InputField>
                        <label class="department-label">Department</label>
                        <div class="dropdown-wrapper">
                            <div class="dropdown-selected">
                                {{ $auth.user.department !== null ? $auth.user.department.name : 'Choose Department' }}
                            </div>
                            <a href="mailto:help@thetippercompany.com?subject=Help with Tipper">
                                <p class="department">
                                    To change department, click here to email your admin.
                                </p>
                            </a>
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
                    <button @click="saveSettings()">Save settings</button>
                    <nuxt-link class="reset" to="/reset-password">Reset Password</nuxt-link>
                </div>
            </div>
        </div>
        <Loader v-else></Loader>
    </div>
</template>

<script>
import InputField from "~/components/inputs/InputField";
import {mixin as clickaway} from 'vue-clickaway';
import Loader from "@/components/Loader"

export default {
    name: "employee-settings",
    mixins: [clickaway],
    components: {InputField, Loader},
    layout: 'standard',
    data() {
        return {
            avatarUrl: '',
            loaded: false,
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
    created() {
        this.loaded = false;
        this.userInfo.firstname = this.$auth.user.firstname;
        this.userInfo.lastname = this.$auth.user.lastname;
        this.userInfo.name = this.$auth.user.nickname;
        this.userInfo.address_1 = this.$auth.user.address_1;
        this.userInfo.address_2 = this.$auth.user.address_2;
        this.userInfo.city = this.$auth.user.city;
        this.userInfo.state = this.$auth.user.state;
        this.userInfo.zip_code = this.$auth.user.zip_code;
        this.userInfo.email = this.$auth.user.email;
        this.loaded = true;
    },
    methods: {
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

.reset {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: #B45F4B;
    margin: 0 auto;
    opacity: 0.8;
    margin-top: 24px;
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
    }
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
        top: 66px;
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

.department {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    margin-top: 10px;
    color: #B45F4B;
    cursor: pointer;
}

.department-label {
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
</style>
