<template>
    <div class="employer-component">
        <div class="flex flex-row items-center justify-between inner first-block mobile-col">
            <div class="image-wrapper">
                <h1>FEATURES</h1>
                <img src="/phone-new.jpg" alt="">
                <span class="one">Recipient</span>
                <span class="three">Tip Amount</span>
                <span class="four">Send Payment</span>
            </div>
            <div class="text-wrap">
                <h1>GUESTS</h1>
                <h2>Send a tip and a review in <b>less than 20 seconds. No App download required.</b></h2>
                <p class="mb-4">Scan the QR code or tap the digital link:</p>

                <p>- Choose individual or pool</p>
                <p>- Enter a tip amount</p>
                <p>- Add a funding source</p>
                <p>- Leave a review</p>
                <p>- Press Tip!</p>
            </div>
        </div>
<!--        <div class="ways">-->
<!--            <h3>ways your guests can access Tipper</h3>-->
<!--        </div>-->
<!--        <div class="images">-->
<!--            <div class="inner grid grid-cols-3 gap-4 images">-->
<!--                <img src="/first.jpg" alt="">-->
<!--                <img src="/second.jpg" alt="">-->
<!--                <img class="h-full" src="/last.jpg" alt="">-->
<!--            </div>-->
<!--        </div>-->
    </div>
</template>

<script>
export default {
    name: "TipperComponent"
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
        font-size: 44px;
        margin-bottom: 16px;
    }
    .image-wrapper {
        position: relative;

        @include for-phone-only {
            width: 100%;
        }
        img {
            width: 400px;

            @include for-phone-only {
                width: 300px;
            }
        }

        .one, .two, .three, .four {
            position: absolute;
            font-size: 16px;
            font-weight: 300;
            color: #000;
        }

        .one {
            top: 305px;
            left: -20px;

            @include for-phone-only {
                top: 251px;
                left: -16px;
            }
        }

        .two {
            bottom: 79px;
            width: 50px;
            text-align: right;
            left: 27px;
            line-height: 16px;

            @include for-phone-only {

                bottom: 47px;
                width: 50px;
                text-align: right;
                left: -3px;
                line-height: 16px;

            }
        }

        .three {
            top: 334px;
            right: -57px;
            width: 50px;
            line-height: 16px;

            @include for-phone-only {
                top: 270px;
                right: -12px;
                width: 50px;
                line-height: 16px;
            }
        }

        .four {
            bottom: 95px;
            right: 2px;
            width: 50px;
            line-height: 16px;

            @include for-phone-only {
                bottom: 75px;
                right: 30px;
                width: 50px;
                line-height: 16px;
            }
        }
    }
    .text-wrap {
        max-width: 40%;
        background: #F1EEEA;
        padding: 36px 0px 46px 24px;

        @include for-phone-only {
            width: 100%;
            max-width: 100%;
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

    .ways {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: 400;
        color: #fff;
        text-transform: uppercase;
        text-decoration: underline;
        background: #929271;
        padding: 46px 0;

        h3 {
            letter-spacing: 7px;
        }
    }

}

.images {
    margin-top: 46px;
}

.mobile-col {
    @include for-phone-only {
        display: flex;
        flex-direction: column;
    }
}
</style>
