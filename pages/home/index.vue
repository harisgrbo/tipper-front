<template>
    <div class="homepage-wrapper">
        <div class="hero-unit">
            <div class="inner">
                <div class="flex flex-row items-end justify-between w-full mobile-col">
                    <div class="flex flex-col items-start justify-between">
                        <h1>APP-LESS TIPPING</h1>
                        <h2>The touchless Tipping platform designed for the Hospitality Industry</h2>
                        <a href="#request">
                            <button>REQUEST A DEMO</button>

                        </a>
                        <img class="cards" src="/new-cards.svg" alt="">
                    </div>
                    <img class="phone" src="/phone-placeholder.svg" alt="">
                </div>
            </div>
        </div>
        <div class="benefits">
            <div class="inner">
                <div class="flex flex-row items-center w-full justify-between mobile-col">
                    <div class="benefits-wrap">
                        <h1>BENEFITS</h1>
                        <h2 class="text-center">Why Tipper is right for your business</h2>
                    </div>
                    <ul>
                        <li><img src="/thick2.svg" alt="">Tips go directly to your employees’ bank accounts</li>
                        <li><img src="/thick2.svg" alt="">More money for your employees</li>
                        <li><img src="/thick2.svg" alt="">More recognition leads to happier employees</li>
                        <li><img src="/thick2.svg" alt="">Reporting features for easy tax-related reporting</li>
                        <li><img src="/thick2.svg" alt="">Increased employee retention</li>
                        <li><img src="/thick2.svg" alt="">Right staff count leading to happier guests</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="who-should-use-this">
            <client-only>
                <carousel :perPage="1" :paginationEnabled="false" :navigationEnabled="true">
                    <slide>
                        <div class="inner">
                            <div class="flex flex-row items-center w-full justify-between mobile-col">
                                <div>
                                    <img src="/woman.png" alt="">
                                </div>
                                <div class="flex flex-col text-wrap">
                                    <h1>who should use this</h1>
                                    <h2>
                                        Labor is the #1 issue the hospitality industry is facing
                                    </h2>
                                    <h3>To help your staff earn what they deserve and keep your place of business running smoothly. </h3>
                                    <h3>perfect for: <b>HOTELS</b></h3>
                                    <h4>Housekeeping, Front Desk, Valet, and more. </h4>
                                </div>
                            </div>
                        </div>
                    </slide>
                    <slide>
                        <div class="inner">
                            <div class="flex flex-row items-center w-full justify-between mobile-col">
                                <div>
                                    <img class="valet" src="/valet.png" alt="">
                                </div>
                                <div class="flex flex-col text-wrap">
                                    <h1>who should use this</h1>
                                    <h2>
                                        Labor is the #1 issue the hospitality industry is facing
                                    </h2>
                                    <h3>To help your staff earn what they deserve and keep your place of business running smoothly. </h3>
                                    <h3>perfect for: <b>PARKING/VALETS</b></h3>
                                    <h4>Parking Garages, Private events, Restaurants, and more.</h4>
                                </div>
                            </div>
                        </div>
                    </slide>
                </carousel>

            </client-only>
        </div>
        <div class="how-this-works" id="how-it-works">
            <div class="inner flex flex-col items-center justify-center">
                <label>how it works</label>
                <div class="flex flex-row items-center justify-center mobile-grid">
                    <button v-for="(option, index) in options" @click="currentOption = index" :class="[ currentOption === index ? 'active' : '' ]">{{ option }}</button>
                </div>
            </div>
        </div>
        <div class="custom-component">
            <div class="flex flex-col items-center justify-center">
                <div v-show="currentOption === 0" class="w-full">
                    <TipperComponent></TipperComponent>
                </div>
                <div v-show="currentOption === 1" class="w-full">
                    <EmployerComponent></EmployerComponent>
                </div>
                <div v-show="currentOption === 2" class="w-full">
                    <EmployeeComponent></EmployeeComponent>
                </div>

            </div>
        </div>
        <form @submit.prevent="requestDemo" id="request" class="form">
            <div class="inner flex flex-row items-center justify-between mobile-col">
                <div class="request">
                    <h1>REQUEST A DEMO</h1>
                </div>
                <div class="form-wrapper">
                    <input type="text" placeholder="FIRST NAME*" required v-model="payload.first_name">
                    <input type="text" placeholder="LAST NAME*" required v-model="payload.last_name">
                    <input type="text" placeholder="EMAIL ADDRESS*" required v-model="payload.email">
                    <input type="text" placeholder="COMPANY NAME*" required v-model="payload.company">
                    <button type="submit">REQUEST A DEMO</button>
                </div>
            </div>
        </form>
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
</template>

<script>
import EmployerComponent from "@/components/home/EmployerComponent";
import TipperComponent from "@/components/home/TipperComponent";
import EmployeeComponent from "@/components/home/EmployeeComponent";
export default {
    name: "index",
    layout: 'home',
    components: {
        EmployeeComponent,
        TipperComponent,
        EmployerComponent,
    },
    data() {
        return {
            payload: {
                first_name: '',
                last_name: '',
                email: '',
                company: '',
            },
            currentOption: 0,
            options: [
                'Tipper',
                'Employer',
                'Employee'
            ]
        }
    },

    methods: {
        async requestDemo() {
            try {
                let res = await this.$axios.post('/website/demo', this.payload);

                this.$toast.open({
                    message: "Demo requested successfully",
                    type: 'success',
                });

                this.payload.first_name = '';
                this.payload.last_name = '';
                this.payload.email = '';
                this.payload.company = '';

            } catch(e){
                console.log(e)
            }
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
    min-height: 500px;
    background-color: #F6F4F1;
    padding-bottom: 80px;

    @include for-phone-only {
        padding-bottom: 40px;
    }

    .inner {
        position: relative;
        z-index: 1;
        h1 {
            font-size: 45px;
            font-weight: 700;
            color: #B45E4B;
            margin-bottom: 36px;

            @include for-phone-only {
                font-size: 35px;
                margin-bottom: 10px;
            }
        }

        h2 {
            text-transform: uppercase;
            color: #000;
            font-size: 27px;
            margin-bottom: 36px;
            font-weight: 700;
            max-width: 400px;

            @include for-phone-only {
                font-size: 25px;
                margin-bottom: 10px;
            }
        }

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
            margin-bottom: 36px;

            @include for-phone-only {
                height: 40px;
                padding: 0 16px;
            }
        }

        .cards {
            height: 30px;
        }

        .phone {
            width: 540px;

            @include for-phone-only {
                margin-top: 36px;
            }
        }
    }
}

.benefits {
    background: #000;
    padding: 70px 0;
    h1 {
        font-size: 45px;
        font-weight: 700;
        color: #fff;
        margin-bottom: 24px;
    }

    h2 {
        text-transform: uppercase;
        color: #B45E4B;
        font-size: 27px;
        margin-bottom: 36px;
        font-weight: 700;
        max-width: 220px;
    }

    ul {
        display: flex;
        list-style: none;
        flex-direction: column;

        li {
            font-weight: bold;
            color: #fff;
            margin-bottom: 24px;
            font-size: 16px;
            position: relative;
            padding-left: 20px;
            display: flex;
            flex-direction: row;
            align-items: center;

            img {
                height: auto;
                width: 24px;
                margin-right: 10px;
            }

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}

.who-should-use-this {
    padding: 70px 0;
    margin-top: -110px;
    background: transparent;
    width: 1100px;
    margin-left: auto;
    margin-right: auto;

    @include for-phone-only {
        width: 100%;
    }

    h1 {
        font-size: 32px;
        font-weight: 700;
        color: #B45E4B;
        margin-bottom: 24px;
        text-transform: uppercase;

        @include for-phone-only {
            font-size: 25px;
            margin-bottom: 10px;
        }
    }

    h2 {
        text-transform: uppercase;
        font-size: 32px;
        font-weight: 700;
        color: #000;
        margin-bottom: 24px;
        @include for-phone-only {
            font-size: 20px;
            margin-bottom: 10px;
        }
    }

    h3 {
        text-transform: uppercase;
        font-size: 22px;
        font-weight: 400;
        color: #000;
        margin-bottom: 24px;
        @include for-phone-only {
            font-size: 17px;
            margin-bottom: 10px;
        }
    }

    h4 {
       font-size: 16px;
        margin-bottom: 24px;
        font-weight: 300;
    }

   img  {
       width: 550px;
       border: 20px solid #fff;

       &.valet {
           object-fit: cover;
           height: 640px;

           @include for-phone-only {
               height: 481px;
           }
       }
   }

    .text-wrap {
        display: flex;
        flex-direction: column;
        max-width: 500px;
        width: 500px;
        margin-left: 120px;

        @include for-phone-only {
            margin-left: 0;
            max-width: auto;
            width: auto;
        }
    }
}

.how-this-works {
    background: #000;
    padding: 60px 0;
    display: flex;
    flex-direction: column;

    @include for-phone-only {
        padding: 36px 0px;
    }

    label {
        margin-bottom: 24px;
        font-weight: 300;
        text-transform: uppercase;
        font-size: 16px;
        color: #fff;
    }

    button {
        height: 40px;
        border: 2px solid #fff;
        text-transform: uppercase;
        margin-right: 24px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 24px;
        width: 150px;

        @include for-phone-only {
            width: 100%;
            margin-right: 16px;
            padding: 0;
        }

        &:last-child {
            margin-right: 0;
        }

        &.active {
            background: #fff;
            color: #000;
        }
    }
}

.custom-component {
    background: #fff;
    border-bottom: 100px solid #C67D65;
}

::v-deep .VueCarousel-navigation-prev {
    position: absolute;
    bottom: 0 !important;
    box-sizing: border-box;
    color: #000;
    text-decoration: none;
    appearance: none;
    border: none;
    background-color: transparent;
    padding: 0;
    cursor: pointer;
    outline: none;
    background-image: url("/arrow-left-carousel.jpg");
    background-repeat: no-repeat;
    height: 50px !important;
    width: 30px !important;
    background-position: center;
    background-size: cover;
    left: 60% !important;
    color: transparent;

    @include for-phone-only {
        left: 49% !important;
    }

}

::v-deep .VueCarousel-navigation-next {
    position: absolute;
    bottom: 0 !important;
    box-sizing: border-box;
    color: #000;
    text-decoration: none;
    appearance: none;
    border: none;
    padding: 0;
    cursor: pointer;
    outline: none;
    background-image: url("/arrow-right-carousel.jpg");
    backgorund-color: #fff !important;
    background-repeat: no-repeat;
    height: 50px !important;
    width: 30px !important;
    background-position: center;
    background-size: cover;
    right: 38% !important;
    color: transparent;

    @include for-phone-only {
        right: 49% !important;
    }
}

::v-deep .VueCarousel-navigation {
    height: 60px !important;
    position: relative !important;
    margin-top: -80px;

    @include for-phone-only {
        margin-top: 0;
    }
}

.benefits-wrap {
    margin-left: 110px;

    @include for-phone-only {
        margin-left: 0;
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

            @include for-phone-only {
                height: auto;
                margin-bottom: 24px;
                font-size: 25px;
                font-weight: bold;
            }

            h1 {
                font-size: 45px;
                font-weight: 700;
                color: #000;
                margin-bottom: 36px;

                @include for-phone-only {
                    font-size: 35px;
                    margin-bottom: 10px;
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

.request-title {
    max-width: 180px !important;
    margin-top: 30px !important;
    font-size: 42px !important;
    font-weight: 700 !important;
}

.mobile-col {
    @include for-phone-only {
        display: flex;
        flex-direction: column;
    }
}

.mobile-grid {
    @include for-phone-only {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
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
