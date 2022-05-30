<template>
    <div class="success-page-wrapper">
        <div class="success-page-wrapper__content">
            <div class="image-wrapper">
                <img src="/review.svg" alt="">
            </div>
            <h3>SUCCESS</h3>
            <h2 class="mb-2">You will be logged in and redirected to dashboard in 3 seconds</h2>
        </div>
    </div>
</template>

<script>
export default {
    name: "success",
    layout: 'standard',
    data() {
        return {
            user: ''
        }
    },
    async created() {
        this.user = this.$route.query.user

        let res = await this.$axios.post(`/users/${this.user}/sync`);

        await this.$auth.setUserToken(this.$route.query.access_token);
        await this.$auth.fetchUser();

        setTimeout(()=>{
            this.$router.push('/index-employee')
        }, 3000)
    },
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
    @media (max-width: 599px) {
        @content;
    }
}

.success-page-wrapper {
    display: flex;
    flex-direction: column;
    width: 1240px;
    margin: 0 auto;
    min-height: 100vh;
    padding-bottom: 60px;

    @include for-phone-only {
        width: 100%;
        padding: 24px;
        background: #F7F8FA;
    }

    &__header {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;

        h2 {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 800;
            font-size: 38px;
            line-height: 57px;
            color: #000000;
            margin-bottom: 26px;
        }
    }

    &__content {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: calc(100vh - 230px);

        .image-wrapper {
            height: 154px;
            width: 154px;
            background: #fff;
            border-radius: 78px;
            margin-bottom: 56px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        span {
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 20px;
            /* or 167% */

            text-align: center;
            letter-spacing: 0.02em;

            color: #000000;

            opacity: 0.4;
        }

        h3 {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size: 34px;
            line-height: 51px;
            /* identical to box height */

            text-align: center;
            margin-bottom: 18px;
            color: #000000;
        }
    }
}

button {
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border-radius: 15px;
    margin-right: 27px;
    min-width: fit-content;
    padding: 0 24px;
    color: #fff;
    background: #B45F4B;
    margin-top: 24px;
}
</style>
