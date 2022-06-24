<template>
    <div class="homepage-wrapper flex flex-col">
        <div class="hero-unit">
            <div class="hero-unit-top">
                <div class="inner flex flex-col">
                    <h4>MEET THE</h4>
                    <h5>TEAM</h5>
                    <div class="grid grid-cols-2">
                        <div class="person">
                            <img src="/top1.jpg" alt="">
                            <span>JONATHAN BUCKELEW</span>
                            <span class="position">
                                <a href="https://www.linkedin.com/in/jonathan-buckelew/" class="flex flex-row items-center">
                                    <img src="/linkedin.png" alt="">Co-Founder & CEO
                                </a>
                            </span>
                        </div>
                        <div class="person">
                            <img src="/top2.jpg" alt="">
                            <span>ALAN SCARPA</span>
                            <span class="position">
Co-Founder & CTO</span>

                        </div>
                    </div>
                </div>
                <div class="section-team flex flex-col items-center justify-start">
                    <h2 class="advisors mt-4 mb-6">ADVISORS</h2>
                    <div class="inner">
                        <div class="grid grid-cols-5 gap-8 w-full mobile-grid">
                            <div class="advisor">
                                <img src="/bottom1.jpg" alt="">
                                <p class="name">Tony Ambrosio</p>
                                <p class="position">Ex- CAO & CHRO @ CBS</p>
                                <img class="company" src="/company1.svg" alt="">
                            </div>
                            <div class="advisor">
                                <img src="/bottom2.jpg" alt="">
                                <p class="name">Sarah kreifus</p>
                                <p class="position">Investor @ AMEX Ventures</p>
                                <img class="company" src="/company2.svg" alt="">

                            </div>
                            <div class="advisor">
                                <img src="/bottom3.jpg" alt="">
                                <p class="name">jonathan korr</p>
                                <p class="position">Executive Vice President
                                    @ Fulcrum Hospitality </p>
                                <img class="company" src="/company3.svg" alt="">
                            </div>
                            <div class="advisor">
                                <img src="/bottom4.jpg" alt="">
                                <p class="name">chris Campbell</p>
                                <p class="position">Chief Strategist @ Kroll Institute. Ex-Assistant
                                    Treasury Secretary </p>
                                <img class="company" src="/company4.svg" alt="">
                            </div>
                            <div class="advisor">
                                <img src="/bottom5.jpg" alt="">
                                <p class="name">nicole rowett</p>
                                <p class="position">Executive Director for
                                    Apple @ TBWA/Medla Labs</p>
                                <img class="company" src="/apple2.svg" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="top-image-wrapper">
                <div class="inner relative">
                    <div class="text-wrapper">
                        Employees are mini-brand ambassadors. Treat them right and your customers will notice.
                    </div>
                </div>
            </div>
            <div class="inner">
                <div class="flex flex-col items-start justify-start text-left w-full pt-2 mobile-col">
                    <h1 class="mt-8">OUR MISSION</h1>
                    <h2 class="test">We created Tipper with a clear goal in mind: to help service-based employees make more money by offering people who want to send tips an easy digital solution to do so.</h2>
                    <p>The idea came about from the experience of wanting to provide deserving service staff like doormen and parking garage attendants with holiday tips but knowing people seldom carry cash on them and also realizing there wasn’t an efficient way to send them their well-deserved tips digitally without having to ask for their personal information. Tipper was born out of this observation to be the solution for bridging the gap between the cashless age and the dedicated workers in industries that rely on tipping.</p>
                </div>
            </div>
            <div class="form">
                <div class="inner flex flex-row items-center justify-between mobile-col">
                    <div class="request">
                        <h1>JOIN OUR TEAM</h1>
                    </div>
                    <div class="form-wrapper">
                        <input type="text" placeholder="FIRST NAME*">
                        <input type="text" placeholder="LAST NAME*">
                        <input type="text" placeholder="EMAIL ADDRESS*">
                        <input type="text" placeholder="TELL US ABOUT YOURSELF*">
                        <button>JOIN OUR TEAM</button>
                    </div>
                </div>
            </div>
            <div class="follow">
                <div class="inner flex flex-row items-center justify-center mobile-col">
                    <div class="mr-6 text-right mobile-text">
                        <h1>FOLLOW US</h1>
                        <h2>CONNECT WITH US</h2>
                    </div>
                    <div class="social-icons">
                        <a href="https://www.instagram.com/accounts/login/?next=/thetippercompany/" target="_blank">
                            <img class="ml-6" src="/instagram.png" alt="">
                        </a>
                        <a href="https://www.facebook.com/TheTipperCompany/" class="mobile-center" target="_blank">
                            <img class="ml-6" src="/facebook.png" alt="">
                        </a>
                        <a href="https://www.linkedin.com/company/thetippercompany" target="_blank">
                            <img class="ml-6" src="/linkedin.png" alt="">
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "team",
    layout: 'home',
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
    @media (max-width: 599px) {
        @content;
    }
}

.inner {
    width: 980px;
    margin: 0 auto;
    display: flex;
    align-items: center;

    @include for-phone-only {
        width: 100%;
        padding: 0 24px;
    }
}
.hero-unit {


    .hero-unit-top {
        background-color: #F6F4F1;
        min-height: 600px;
    }
    .inner {
        position: relative;
        z-index: 1;
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
    background: #FDFCFB;
    padding: 64px 0;

    @include for-phone-only {
        padding: 24px 0;
        margin-top: 24px;
    }

    .inner {
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
            max-width: 210px;
            margin-top: 30px;
            font-size: 42px;
            font-weight: 700;
        }

        .request {
            height: 362px;

            @include for-phone-only {
                height: fit-content;

                h1 {
                    text-align: center;
                    margin-top: 0;
                }
            }
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

                @include for-phone-only {
                    height: 40px;
                }
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
    background-image: url("/new-team-bg.jpg");
    background-position: center;
    background-size: cover;
    min-height: 1100px;
    background-repeat: no-repeat;
    height: fit-content;

    @include for-phone-only {
        margin-top: 36px;
        min-height: 400px;
        max-height: 400px;
    }

    .inner {
        min-height: 1100px;
        position: relative;
        marign-top: 0 !important;

        @include for-phone-only {
            width: 100%;
            padding: 0 24px;
            min-height: 400px;
        }
    }
}

.text-wrapper {
    position: absolute;
    bottom: -80px;
    background: #929271;
    color: #fff;
    text-align: center;
    font-size: 27px;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 50px;
    max-width: 500px;
    padding: 40px;
    right: 0;

    @include for-phone-only {
        position: absolute;
        bottom: 0;
        background: #929271;
        color: #fff;
        text-align: center;
        font-size: 22px;
        font-weight: 700;
        text-transform: uppercase;
        line-height: 28px;
        max-width: 100%;
        padding: 24px;
        right: 0;
        height: fit-content;
        left: 24px;
        bottom: -20px;
    }
}

h2.test {
    font-size: 22px;
    line-height: 33px;
    font-weight: 300;
    text-transform: uppercase;
    max-width: 80%;
}

p {
    font-size: 16px;
    font-weight: 300;
    margin-top: 28px;
}

.person {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: -200px;
    &:first-child {
        margin-right: 50px;

        @include for-phone-only {
            margin-right: 16px;
        }
    }
    &:last-child {
        margin-left: 50px;

        @include for-phone-only {
            margin-left: 16px;
        }
    }
    img {
        height: 300px;
        width: 300px;
        border-radius: 150px;
        overflow: hidden;

        @include for-phone-only {
            width: 100%;
            height: auto;
        }
}
    span {
        font-size: 24px;
        font-weight: 300;

        @include for-phone-only {
            font-size: 17px;
            height: 50px;
            margin-top: 16px;
            text-align: center;
        }

        &.position {
            display: flex;
            margin-top: 12px;
            align-items: center;
            img {
                height: auto;
                width: 40px;
                margin-right: 10px;
            }
            font-size: 18px;
            font-weight: 700;
            font-style: italic;
            text-transform: uppercase;

            @include for-phone-only {
                font-size: 17px;
            }
        }
    }
}

h4 {
    font-size: 42px;
    font-weight: 400;
}

h5 {
    font-size: 59px;
    font-weight: 700;
}

.section-team {
    background: #fff;
    min-height: 500px;
    padding-top: 260px;
}

h2.advisors {
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 3px;
}

.advisor {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-width: 100%;
    height: 400px;

    @include for-phone-only {
        height: auto;
    }
    img {
        height: 150px;
        width: 150px;
        margin-bottom: 20px;
        border-radius: 100px;

        &.company {
            height: 30px;
            width: fit-content;
            margin-bottom: 0;
            border-radius: 0;
        }
    }

    p {
        font-size: 15px;
        font-weight: 300;
        text-align: center;
        width: 100%;
        margin-bottom: 12px !important;
        margin-top: 0;
        text-transform: uppercase;

        &.position {
            font-size: 13px;
            font-style: italic;
            font-weight: bold !important;
            text-transform: initial;
        }

    }
}

.social-icons {
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
        width: 60px;
        height: auto;

        @include for-phone-only {
            margin-left: 0 !important;
        }
    }

    a {
        @include for-phone-only {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}
.mobile-grid {
    @include for-phone-only {
        grid-template-columns: repeat(1, 1fr);
    }
}

.mobile-col {
    @include for-phone-only {
        display: flex;
        flex-direction: column;
    }
}

.mobile-text {
    @include for-phone-only {
        text-align: center !important;
        margin-right: 0 !important;
        margin-bottom: 24px;
    }
}

.mobile-center {
    @include for-phone-only {
        margin: 0 16px;
    }
}
</style>
