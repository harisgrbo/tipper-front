<template>
    <div class="success-page-wrapper">
        <div class="success-page-wrapper__content">
            <div class="image-wrapper">
                <img src="/inner.svg" alt="">
            </div>
            <h3>Thank You</h3>
            <p>Our staff hope everything was to your satisfaction and appreciate your recognition!</p>
            <nuxt-link class="tip-again" :to="'/user/' + this.id + '/tipping'">Tip Again?</nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "success",
    layout: 'standard',
    data() {
      return {
          id: 0,
      }
    },
    async created() {
        if(this.$route.query.tip) {
            let res = await this.$axios.post('/tips/' + this.$route.query.tip + '/complete');

            this.id = this.$route.query .employer;
        }
    }
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
            background-image: url("/outter.svg");
            display: flex;
            align-items: center;
            justify-content: center;
        }

        span {
            font-family: 'Poppins';
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

.tip-again {
    width: 366px;
    margin-top: 24px;
    height: 60px;
    background: #B45F4B;
    border-radius: 14px;
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.02em;
    color: #FFFFFF;
}

p {
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
</style>
