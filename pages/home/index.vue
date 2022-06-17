<template>
    <div class="homepage-wrapper">
        <div class="hero-unit">
            <div class="inner">
                <div class="flex flex-row items-end justify-between w-full">
                    <div class="flex flex-col items-start justify-between">
                        <h1>APP-LESS TIPPING</h1>
                        <h2>The touchless Tipping platform designed for the Hospitality Industry</h2>
                        <button>REQUEST A DEMO</button>
                        <img class="cards" src="/new-cards.svg" alt="">
                    </div>
                    <img class="phone" src="/phone-placeholder.svg" alt="">
                </div>
            </div>
        </div>
        <div class="benefits">
            <div class="inner">
                <div class="flex flex-row items-center w-full justify-between">
                    <div class="benefits-wrap">
                        <h1>BENEFITS</h1>
                        <h2>why tipper is right for your hotel</h2>
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
                            <div class="flex flex-row items-center w-full justify-between">
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
                            <div class="flex flex-row items-center w-full justify-between">
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
                                    <h4>Housekeeping, Front Desk, Valet, and more. </h4>
                                </div>
                            </div>
                        </div>
                    </slide>
                </carousel>

            </client-only>
        </div>
        <div class="how-this-works" id="how-it-works">
            <div class="inner flex flex-col items-center justify-center">
                <label>how this works</label>
                <div class="flex flex-row items-center justify-center">
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
            currentOption: 0,
            options: [
                'Tipper',
                'Employer',
                'Employee'
            ]
        }
    },
    mounted() {

    }
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
    min-height: 500px;
    background-color: #F6F4F1;
    padding-bottom: 80px;

    .inner {
        position: relative;
        z-index: 1;
        h1 {
            font-size: 45px;
            font-weight: 700;
            color: #B45E4B;
            margin-bottom: 36px;
        }

        h2 {
            text-transform: uppercase;
            color: #000;
            font-size: 27px;
            margin-bottom: 36px;
            font-weight: 700;
            max-width: 400px;
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
        }

        .cards {
            height: 30px;
        }

        .phone {
            width: 540px;
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
        max-width: 200px;
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

    h1 {
        font-size: 32px;
        font-weight: 700;
        color: #B45E4B;
        margin-bottom: 24px;
        text-transform: uppercase;
    }

    h2 {
        text-transform: uppercase;
        font-size: 32px;
        font-weight: 700;
        color: #000;
        margin-bottom: 24px;
    }

    h3 {
        text-transform: uppercase;
        font-size: 22px;
        font-weight: 400;
        color: #000;
        margin-bottom: 24px;
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
       }
   }

    .text-wrap {
        display: flex;
        flex-direction: column;
        max-width: 500px;
        width: 500px;
        margin-left: 120px;
    }
}

.how-this-works {
    background: #000;
    padding: 60px 0;
    display: flex;
    flex-direction: column;

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
}

::v-deep .VueCarousel-navigation {
    height: 60px !important;
    position: relative !important;
    margin-top: -80px;
}

.benefits-wrap {
    margin-left: 110px;
}
</style>
