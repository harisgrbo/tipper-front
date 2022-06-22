<template>
    <div class="employer-component">
        <div class="flex flex-row items-center justify-between inner first-block mobile-col">
            <div class="image-wrapper">
                <h1>EMPLOYER DASHBOARD</h1>
                <img src="/new-dashboard.jpg" alt="">
            </div>
            <div class="text-wrap">
                <h1>the dashboard you always wanted</h1>
                <h2>Visibility into employee and guest interactions</h2>
                <p class="mb-4">Access to our dashboard allows you to see:</p>

                <p>- Total amount of property tip volume</p>
                <p>- Total amount of individual tip volume</p>
                <p>- Guest Reviews</p>
                <p>- Easy tip report export for tax purposes</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "EmployerComponent"
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
    @media (max-width: 599px) {
        @content;
    }
}

.employer-component {

    position: relative;

    .first-block {
        padding: 64px 0;
        background-size: contain;
        background-image: url("/employer-bh.svg");
        background-repeat: no-repeat;
        min-height: fit-content;
        background-position: center;
    }

    .inner {
        width: 980px;
        margin: 0 auto;

        @include for-phone-only {
            width: 100%;
            padding: 0 24px;
        }
    }

    h1 {
        color: #000;
        font-weight: bold;
        font-size: 37px;
        margin-bottom: 16px;
        text-transform: uppercase !important;
        line-height: 48px;
    }
    .image-wrapper {
        position: relative;

        @include for-phone-only {
            margin-top: 36px;
        }

        img {
            width: 480px;
            margin-left: 36px;

            @include for-phone-only {
                width: 100%;
                margin-left: 0;
            }
        }

        .one, .two, .three, .four {
            position: absolute;
            font-size: 16px;
            font-weight: 300;
            color: #000;
        }

        .one {
            top: 215px;
            left: 27px;
        }

        .two {
            bottom: 79px;
            width: 50px;
            text-align: right;
            left: 27px;
            line-height: 16px;
        }

        .three {
            top: 184px;
            right: -17px;
            width: 50px;
            line-height: 16px;
        }

        .four {
            bottom: 89px;
            right: 39px;
            width: 50px;
            line-height: 16px;
        }
    }
    .text-wrap {
        max-width: 40%;
        background: #F1EEEA;
        padding: 36px 24px 46px 24px;

        @include for-phone-only {
            max-width: 100%;
            width: 100%;
            padding: 24px;
            margin-top: 24px;
            margin-bottom: 36px;
        }

        h2 {
            color: #000;
            font-weight: 400;
            font-size: 44px;
            margin-bottom: 16px;
            text-transform: uppercase;
            font-size: 22px;
        }

        p {
            color: #000;
            font-weight: 500;
            font-size: 17px;
        }
    }
}

.mobile-col {
    @include for-phone-only {
        display: flex;
        flex-direction: column;
    }
}
</style>
