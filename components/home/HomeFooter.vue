<template>
    <div class="footer">
        <div class="inner flex flex-col">
            <div class="grid grid-cols-4 mobile-col">
                <div class="flex flex-col items-start mobile-col">
                    <img src="/white-logo.png" alt="">
                    <span> 55 Hudson Street</span>
                    <span> New York, NY 10013</span>
                </div>
                <div>

                </div>
                <div class="text-center flex flex-col items-center justify-center">
                    <nuxt-link class="mb-4" :to="('/home/faq')">faq</nuxt-link>
                    <nuxt-link class="mb-4" :to="('/home/contact-us')">contact</nuxt-link>
                    <nuxt-link class="mb-4" :to="('/home/legal')">Privacy Policy</nuxt-link>
                </div>
                <div class="text-center flex flex-col items-center justify-center">
                    <nuxt-link class="mb-4" to="">About</nuxt-link>
                    <nuxt-link class="mb-4" :to="('/home/blog')">Blog</nuxt-link>
                    <nuxt-link class="mb-4" :to="('/home/legal')">Terms of use</nuxt-link>
                </div>
            </div>
            <p class="text-center mt-6 w-full">©2022 Tipper  | Site Credit Karima Creative</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "HomeFooter"
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
    @media (max-width: 599px) {
        @content;
    }
}

.footer {
    background: #000;
    padding: 64px 0 32px 0;

    @include for-phone-only {
        padding: 24px 0;
    }

    .inner {
        width: 980px;
        margin: 0 auto;

        @include for-phone-only {
            width: 100%;
            padding: 0 24px;
        }
    }

    p, a {
        color: #fff;
        font-size: 16px;
        text-transform: uppercase;
        font-weight: 400;
    }

    span {
        color: #fff;
        font-size: 16px;
        text-transform: uppercase;
        font-weight: 300;
        max-width: 160px;

        @include for-phone-only {
            text-align: center;
        }
    }

    img {
        display: flex;
        width: auto;
        height: 130px;
        margin-bottom: 24px;

        @include for-phone-only {
            height: 80px;
        }
    }
}

.mobile-col {
    @include for-phone-only {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 16px;
    }
}
</style>
