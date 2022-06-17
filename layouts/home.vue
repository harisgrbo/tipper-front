<template>
    <div class="flex flex-col w-full main-layout">
        <div class="header">
            <div class="flex inner-header flex-row items-center justify-between">
                <img src="/hero-bg.svg" alt="" class="hero-unit-logo">

                <nuxt-link to="/">
                    <img class="logo" src="/transparent.png" alt="">
                </nuxt-link>
                <ul>
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

    .inner {
        width: 980px;
        margin: 0 auto;

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

        }

        img.logo {
            height: 60px;
            position: relative;
            z-index: 1;
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
</style>
