<template>
    <div class="employer-component">
        <div class="flex flex-row items-center justify-between inner first-block">
            <div class="image-wrapper">
                <h1>FEATURES</h1>
                <img src="/mobile-arrows.svg" alt="">
                <span class="one">Recipient</span>
                <span class="two">Total Amount</span>
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
        <div class="ways">
            <h3>ways your guests can access Tipper</h3>
        </div>
        <div class="images">
            <div class="inner grid grid-cols-3 gap-4">
                <img src="/4.svg" alt="">
                <img src="/6.svg" alt="">
                <img src="/5.svg" alt="">
            </div>
        </div>
        <div class="form">
            <div class="inner flex flex-row items-center justify-between">
                <div class="request">
                    <img src="/transparent.png" alt="">
                    <h1>REQUEST A DEMO</h1>
                </div>
                <div class="form-wrapper">
                    <input type="text" placeholder="FIRST NAME*">
                    <input type="text" placeholder="LAST NAME*">
                    <input type="text" placeholder="EMAIL ADDRESS*">
                    <input type="text" placeholder="COMPANY NAME*">
                    <button>REQUEST A DEMO</button>
                </div>
            </div>
        </div>
        <div class="follow">
            <div class="inner flex flex-row items-center justify-center">
                <div class="mr-6 text-right">
                    <h1>FOLLOW US</h1>
                    <h2>CONNECT WITH US</h2>
                </div>
                <img class="ml-6" src="/social.svg" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TipperComponent"
}
</script>

<style scoped lang="scss">
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
    }

    h1 {
        color: #000;
        font-weight: bold;
        font-size: 44px;
        margin-bottom: 16px;
    }
    .image-wrapper {
        position: relative;

        img {
            width: 450px;
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
        padding: 36px 0px 46px 24px;

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
            font-weight: 300;
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

    .form {
        .inner {
            margin: 64px auto;
            min-height: 500px;
            background-image: url("/employer-bh.svg");
            background-repeat: no-repeat;
            min-height: fit-content;
            background-position: left;
            min-height: 370px;

            img {
                height: 60px;
            }

            h1 {
                max-width: 300px;
                margin-top: 30px;
            }

            .request {
                height: 362px;
            }

            .form-wrapper {
                max-width: 450px;
                button {
                    background: #B45E4B;
                    color: #fff;
                    width: fit-content;
                    height: 60px;
                    padding: 0 32px;
                    font-size: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                input {
                    height: 45px;
                    width: 100%;
                    padding: 0 16px;
                    font-size: 15px;
                    font-weight: 300;
                    border: 2px solid #000;
                    margin-bottom: 24px;
                }

                ::placeholder {
                    font-size: 15px;
                    font-weight: 300;
                    color: #000;
                }
            }
        }
    }

    .follow {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ECE9E3;

        .inner {
            background-image: url("/white-bg.svg");
            background-repeat: no-repeat;
            padding: 45px 0;
            background-position: right;
            background-size: cover;
            background-position-x: 230px;
        }

        img {
            height: 100px;
        }

        h1 {
            color: #B45F4B;
            font-size: 26px;
            margin-bottom: 0;
        }

        h2 {
            font-size: 22px;
            font-weight: 300;
            color: #000;
        }
    }
}
</style>
