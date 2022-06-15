<template>
    <div class="footer">
        <div class="inner flex flex-col">
            <div class="grid grid-cols-4">
                <div class="flex flex-col items-start">
                    <img src="/white-logo.png" alt="">
                    <span> 55 Hudson Street</span>
                    <span> New York, NY 10013</span>
                </div>
                <div>

                </div>
                <div class="text-center flex flex-col items-center justify-center">
                    <p class="mb-4">faq</p>
                    <p class="mb-4">contact</p>
                    <p class="mb-4">Privacy Policy</p>
                </div>
                <div class="text-center flex flex-col items-center justify-center">
                    <p class="mb-4">About</p>
                    <p class="mb-4">Blog</p>
                    <p class="mb-4">Terms of use</p>
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
.footer {
    background: #000;
    padding: 64px 0 32px 0;

    .inner {
        width: 980px;
        margin: 0 auto;
    }

    p {
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
    }

    img {
        display: flex;
        width: auto;
        height: 130px;
        margin-bottom: 24px;
    }
}
</style>
