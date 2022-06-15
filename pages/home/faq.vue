<template>
    <div class="homepage-wrapper flex flex-col">
        <div class="hero-unit">
            <div class="top-image-wrapper">
                <div class="inner relative">
                    <div class="text-wrapper">
                        YOUR QUESTIONS ANSWERED
                    </div>
                </div>
            </div>
            <div class="inner">
                <div class="flex flex-col items-start justify-start text-left w-full pt-20">
                    <h1>FAQS</h1>
                    <div>
                        <div>
                            <div>
                                <dl>
                                    <div>
                                        <dt class="text-lg">
                                            <!-- Expand/collapse question button -->
                                            <button type="button" class="text-left w-full flex justify-between items-start text-gray-400" aria-controls="faq-0" aria-expanded="false">
                                                <span class="font-medium text-gray-900 main">- WHY DO I WANT TIPPER? WHAT’S THE BENEFIT?</span>
                                                <span class="ml-6 h-7 flex items-center">
                                                    <svg class="rotate-0 h-6 w-6 transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                                                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </span>
                                            </button>
                                        </dt>
                                        <dd class="pr-12" id="faq-0">
                                          <p>Tipper allows “Tippers” to send money in the form of tips to “Employees”. Tippers don’t have to go out of their way to find cash and never have to fear not having money on them to tip. Employees now have an increased chance of receiving a private and secure tip that they can deposit directly into their bank account.</p>

                                        </dd>
                                    </div>

                                    <!-- More questions... -->
                                </dl>
                                <dl class="mt-8">
                                    <div>
                                        <dt class="text-lg">
                                            <!-- Expand/collapse question button -->
                                            <button type="button" class="text-left w-full flex justify-between items-start text-gray-400" aria-controls="faq-0" aria-expanded="false">
                                                <span class="font-medium text-gray-900 main">+ WHY NOT JUST USE VENMO OR ZELLE?</span>
                                                <span class="ml-6 h-7 flex items-center">
                                                    <svg class="rotate-0 h-6 w-6 transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                                                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </span>
                                            </button>
                                        </dt>
                                    </div>

                                    <!-- More questions... -->
                                </dl>
                                <dl class="mt-8">
                                    <div>
                                        <dt class="text-lg">
                                            <!-- Expand/collapse question button -->
                                            <button type="button" class="text-left w-full flex justify-between items-start text-gray-400" aria-controls="faq-0" aria-expanded="false">
                                                <span class="font-medium text-gray-900 main">+ WHAT FEES DO I INCUR USING TIPPER?</span>
                                                <span class="ml-6 h-7 flex items-center">
                                                    <svg class="rotate-0 h-6 w-6 transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                                                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </span>
                                            </button>
                                        </dt>
                                    </div>

                                    <!-- More questions... -->
                                </dl>

                            </div>
                        </div>
                    </div>
                    <div class="form">
                        <div class="inner flex flex-row items-center justify-between">
                            <div class="request">
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
    </div>
</template>

<script>

export default {
    name: "faq",
    layout: 'home',
}
</script>

<style scoped lang="scss">
.inner {
    width: 980px;
    margin: 0 auto;
    display: flex;
    align-items: center;
}
.hero-unit {
    background-image: url(/new-bg-2.svg);
    min-height: 500px;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: bottom;
    background-position-x: 552px;
    background-size: 1658px;
    background-position-y: -410px;


    .inner {

        h1 {
            font-size: 42px;
            font-weight: 700;
            color: #000;
            text-transform: uppercase;
            margin-bottom: 40px;
            text-align: left;
        }
    }
}

.blog-card {
    outline: 20px solid transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &.central {
        outline: 30px solid #fff;
        background: #fff;
    }

    h2 {
        font-size: 16px;
        font-weight: 600;
        line-height: 20px;
        margin-top: 20px;
        height: 60px
    }

    p {
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
        margin-bottom: 20px;
    }

    button {
        background: #B45F4B;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #fff;
        width: fit-content;
        margin-top: 20px;
        padding: 4px 24px
    }
}
.follow {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #F6F4F2;

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
        margin-bottom: 0 !important;
    }

    h2 {
        font-size: 22px;
        font-weight: 300;
        color: #000;
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
            max-width: 180px;
            margin-top: 30px;
            font-size: 42px;
            font-weight: 700;
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

span.main {
    font-size: 20px;
    text-transform: uppercase;
    font-weight: 700;
    color: #C67D65;
    margin-bottom: 25px;
}

p {
    font-size: 14px;
    font-weight: 300;
}

strong {
    font-weight: 700;
}

ul {
    list-style: none;

    li {
        font-size: 14px;
        font-weight: 300;
    }
}

.top-image-wrapper {
    background-image: url("/person.svg");
    background-position: center;
    background-size: cover;
    min-height: 1100px;
    background-repeat: no-repeat;
    height: fit-content;

    .inner {
        min-height: 1100px;
        position: relative;
        marign-top: 0 !important;
    }
}

.text-wrapper {
    position: absolute;
    bottom: -80px;
    background: #929271;
    color: #fff;
    text-align: center;
    font-size: 38px;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 70px;
    max-width: 400px;
    padding: 60px 90px;
    right: 0;
}

</style>
