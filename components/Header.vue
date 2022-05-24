<template>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="relative header">
        <div class="flex flex-row items-center">
            <img src="/logo.svg" class="logo" @click="$router.push('/')"/>
        </div>

        <div class="flex flex-row items-center">
            <div class="date">

            </div>
            <div class="auth relative" v-if="$auth.user">
                <button @click="$router.push('/notification')" class="relative add-brightness">
                    <img src="/notification-bing.svg" alt="">
                    <span class="notification" v-show="count > 0">{{ count }}</span>
                </button>
                <button class="avatar" @click="$router.push('/user/' + $auth.user.id); away();" v-if="$auth.user.type !== 'admin'">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                <button v-on-clickaway="away" class="relative add-brightness" @click="showMainDropdown = !showMainDropdown" v-if="$auth.user.type !== 'admin'">
                    <img src="/group.svg" class="brightness-0" alt="">
                    <div class="main-dropdown" v-show="showMainDropdown">
                            <ul>
                                <li @click="handleClick(); away();">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {{ $auth.user.type === 'employer' ? 'Employer Settings' : 'Employee Settings'}}
                                </li>
                                <li v-if="$auth.user.type === 'employer'" @click="$router.push('/pools'); away();">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                    Pool settings
                                </li>
                                <li @click="$auth.logout(); away();">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Logout
                                </li>
                            </ul>
                        </div>
                </button>
            </div>
            <div class="auth logged-out" v-else>
                <button @click="$router.push('/sign-in')">
                    Login
                </button>
                <button @click="$router.push('/register')">
                    Sign up
                </button>
            </div>
        </div>
    </div>

</template>

<script>
import {mixin as clickaway} from 'vue-clickaway';
export default {
    name: "Header",
    mixins: [clickaway],
    data() {
      return {
          showMainDropdown: false,
          count: 0
      }
    },
    async created() {
        if(this.$auth.user) {
            await this.fetchNotificationCount()
        }

        this.$nuxt.$on('clear-notifications', this.fetchNotificationCount);
    },
    methods: {
        async fetchNotificationCount() {
            try {
                let res = await this.$axios.get('/notifications/unread/count')

                this.count = res.data.data.count;
            } catch(e) {
                console.log(e)
            }
        },
        handleClick() {
            if (this.$auth.user && this.$auth.user.type === 'employer') {
                this.$router.push('/employer-settings');
            } else {
                this.$router.push('/employee-settings');
            }
        },
        away() {
            this.showMainDropdown = false;
        }
    }
}
</script>

<style scoped lang="scss">
.header {
    background: #F7F8FA;
    margin: 0 auto;
    max-width: 1240px;
    width: 100%;
    height: 134px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
        cursor: pointer;
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-drag: none;
    }

    .auth {
        display: flex;
        align-items: center;

        button {
            background: rgba(216, 205, 188, 0.2);
            border-radius: 14px;
            height: 60px;
            width: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 14px;

            &.avatar {
                overflow: hidden;
                img {
                    object-fit: cover !important;
                    width: 100%;
                    height: 100%;
                }
            }

            &:last-child {
                margin-right: 0;
            }

            &.logout {
                padding: 0 24px;
                min-width: fit-content;
                width: fit-content;
            }
        }

        &.logged-out {

            button {
                width: fit-content;
                min-width: fit-content;
                padding: 0 24px;
            }
        }
    }
}

.main-dropdown {
    position: absolute;
    top: 66px;
    left: inherit;
    width: 300px;
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

span.notification {
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: 20px;
    width: 20px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 500;
    color: #fff;
    background: #B45F4B;
    top: -4px;
    right: -4px;
    border: 1px solid #fff;
}

.add-brightness img {
    filter: brightness(0) !important;
}
</style>
