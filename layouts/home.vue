<template>
    <div class="flex flex-col w-full main-layout">
        <div class="header">
            <div class="flex inner-header flex-row items-center justify-between">
                <img src="/hero-bg.svg" alt="" class="hero-unit-logo">

                <nuxt-link to="/">
                    <img class="logo" src="/transparent.png" alt="">
                </nuxt-link>
                <button @click="showNavigationDropdown = !showNavigationDropdown" v-if="$device.isMobile" class="items-center justify-center button-ham lg:hidden md:hidden up:hidden xl:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <ul class="navigation-dropdown" v-show="showNavigationDropdown">
                    <li v-for="(link, index) in links" :key="index">
                        <nuxt-link :to="'/home/' + link.link">{{ link.name }}</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/sign-in">LOG IN</nuxt-link>
                    </li>
                </ul>
                <ul v-if="!$device.isMobile">
                    <li v-for="(link, index) in links" :key="index">
                        <nuxt-link :to="'/home/' + link.link">{{ link.name }}</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/sign-in">LOG IN</nuxt-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="main-wrapper">
            <nuxt></nuxt>
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
import Footer from "@/components/home/HomeFooter.vue"

export default {
    name: "home",
    components: {Footer},
    data() {
        return {
            showNavigationDropdown: false,
            links: [
                {
                    name: 'HOW IT WORKS',
                    link: '#how-it-works'
                },
                {
                    name: 'TEAM',
                    link: 'team'
                },
                {
                    name: 'BLOG',
                    link: 'blog'
                },
                {
                    name: 'CONTACT US',
                    link: 'contact-us'
                },
            ]
        }
    },
    created() {
        console.log(this.$route)
    }
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
    @media (max-width: 599px) {
        @content;
    }
}

.main-layout {
    min-height: 100vh;
    width: 100%;

    @include for-phone-only {
        overflow-x: hidden;
    }

    .inner {
        width: 980px;
        margin: 0 auto;

        @include for-phone-only {
            width: 100%;
        }

    }

    .header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #F6F4F1;



        .inner-header {
            width: 980px;
            margin: 0 auto;
            height: 193px;
            position: relative;

            @include for-phone-only {
                height: 93px;
                padding: 0 24px;
            }
        }

        img.logo {
            height: 60px;
            position: relative;
            z-index: 1;

            @include for-phone-only {
                height: 30px;
            }
        }

        ul {
            display: flex;
            flex-direction: row;
            align-items: center;
            position: relative;
            z-index: 1;

            li {
                margin-left: 36px;
                font-size: 14px;
                font-family: 'Poppins';
                font-weight: 500;

                &:last-child {
                    color: #B45F4B;
                }
            }
        }
    }


    @include for-phone-only {
        background: #fff !important;
    }
}

.header {
    @include for-phone-only {
        display: none;
    }
}

.hero-unit-logo {
    position: absolute;
    right: 0;
    height: 540px;
    z-index: 0;
    top: 1%;
}

.navlist {
    @include for-phone-only {
        display: none;
    }
}

.button-ham {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    height: 50px;
    width: 50px;
    border-radius: 8px;
    position: relative;
    z-index: 100;
}

.navigation-dropdown {
    position: absolute !important;
    top: 80px !important;
    right: 24px !important;
    left: 24px !important;
    height: fit-content !important;
    display: flex;
    flex-direction: column !important;
    align-items: flex-start !important;
    justify-content: flex-start !important;
    background-color: #fff;
    z-index: 50 !important;
    padding: 24px !important;
    border-radius: 10px;
    box-shadow: 0px 0px 15px 2px rgba(0,0,0,0.08);
    -webkit-box-shadow: 0px 0px 15px 2px rgba(0,0,0,0.08);
    -moz-box-shadow: 0px 0px 15px 2px rgba(0,0,0,0.08);

    li {
        margin-left: 0 !important;
        margin-bottom: 16px !important;

        &:last-child {
            margin-bottom: 0 !important;
        }
    }
}
</style>
