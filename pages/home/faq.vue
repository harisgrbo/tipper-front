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
                <div class="flex flex-col items-start justify-start text-left w-full pt-20 mobile-padding">
                    <h1>FAQS</h1>
                    <accordion>
                        <accordion-item v-for="item in faq_text">
                            <!-- This slot will handle the title/header of the accordion and is the part you click on -->
                            <template slot="accordion-trigger">
                                <h3>{{ item.question }}</h3>
                            </template>
                            <!-- This slot will handle all the content that is passed to the accordion -->
                            <template slot="accordion-content">
                                <span>{{ item.answer }}</span>
                            </template>
                        </accordion-item>
                    </accordion>
                    <form @submit.prevent="requestDemo" class="form">
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
import Accordion from "@/components/Accordion";
import AccordionItem from "@/components/AccordionItem";

export default {
    name: "faq",
    components: {Accordion, AccordionItem},
    layout: 'home',
    data() {
        return {
            payload: {
                first_name: '',
                last_name: '',
                email: '',
                company: '',
            },
            faq_text:[
                {
                    question: 'HOW DOES TIPPER WORK?\n',
                    answer: 'Tipper is a digital tip platform that allows customers/guests to easily send a tip to your employees using their phones. Through either scanning a QR codes and/or tapping a link placed in an email (e.g. checkout email), customers simply select who they want to tip, enter an amount, and press tip. That’s it!'
                },
                {
                    question: 'WHO SHOULD USE TIPPER?',
                    answer: 'Businesses where employees receive a portion of their income through tips, like hotels, parking garages/valet, cruises, country clubs, restaurants, and more.'
                },
                {
                    question: 'WHY DO I WANT TIPPER? WHAT’S THE BENEFIT?',
                    answer: 'Tipper allows guests/customers to send money in the form of tips to “Employees”. Tippers don’t have to find an ATM to withdraw cash and never have to fear skipping on a tip again. Employees now have an increased chance of receiving a private and secure tip that deposits directly into their bank account.'
                },
                {
                    question: 'WHY NOT JUST USE VENMO OR ZELLE?',
                    answer: 'Venmo, Zelle, and other digital payment services force you to know another party’s personal information (like a first/last name, email address or phone number). However. in tipping situations, a customer/guest is most likely not going to know an employee’s personal information, nor do they want to ask for it, thereby making those digital solutions useless. Using QR codes that link to Venmo prohibits an employer from knowing which employees are receiving tips and doesn’t include features like tip pooling, shift entry, and report access.',
                },
                {
                    question: 'HOW DO I SET UP AN ACCOUNT?',
                    answer: 'To get started, contact our sales team at hello@thetippercompany.com. We’ll schedule an onboarding call to help set up the businesses’ profile, where you can customize the customer/guest experience and send invites to your employees.',
                },
                {
                    question: 'HOW MUCH DOES TIPPER COST?',
                    answer: 'Currently, the Tipper platform is free for all employers and employees. Those who wish to send a tip through our platform are charged a small convenience fee to do so.',
                },
                {
                    question: 'DO CUSTOMERS/GUESTS NEED TO DOWNLOAD AN APP?',
                    answer: 'No, the Tipper platform is a web-based system that never requires a customer/guest to download or sign-up for anything. Simply scanning the QR-code or tapping a link prompts our platform to pop up on their mobile device, allowing a tip to be sent in less than 20 seconds.',
                },
                {
                    question: 'HOW DO I ADD EMPLOYEES TO TIPPER?',
                    answer: 'Once the employer has created an account, they will send out invites to employees using their email address',
                },
                {
                    question: 'WHAT DO MY EMPLOYEES NEED TO DO TO GET STARTED?',
                    answer: 'A link to sign up for Tipper will be present in the invite email. Once the link is clicked on, the employee will be taken through the onboarding process, which is facilitated by our payment partner Stripe (Stripe Official | Payment Processing Platform for the Internet). On average, the sign-up process takes 5 minutes.',
                }, {
                    question: 'HOW WILL EMPLOYEES KNOW THEY RECEIVED A TIP?',
                    answer: 'Each time an employee receives a tip, they will be notified via email.',
                }, {
                    question: 'MY EMPLOYEES ARE NERVOUS ABOUT GIVING OUT THEIR BANKING INFO. HOW CAN I ENSURE THAT IT WILL BE PROTECTED?',
                    answer: 'We take privacy and protection of sensitive very seriously. That’s why we partnered with stripe.com to ensure everything from signing up to receiving tips is done with the highest level of security and accuracy. Please see Stripe’s Privacy Policy (Privacy Policy (stripe.com) for more information on their processes in place.',
                },
                {
                    question: 'MY EMPLOYEES ARE USED TO CASH TIPS. WHY WOULD THEY WANT TO CHANGE THAT?',
                    answer: 'This is a very common question. Tipper does not replace cash - your employees can continue to receive cash tips as they normally do. Tipper is an alternative that gives your employees an additional opportunity to receive tips. Only 16% of U.S. consumers consistently carry cash on them and most are used to performing financial transactions digitally. We’re helping employees collect tips from the 86% of people who are cashless, thereby increasing their hourly wages and annual incomes.',
                }, {
                    question: 'WHO HANDLES TAX COMPLIANCE?',
                    answer: 'All tips are considered reportable income and are obligated to be reported. For employers, our platform allows for easy tip data export for your accounting needs. Each employee will receive a 1099-K from Tipper, as required by the IRS. Please consult with your tax advisor for any tax-related advice.',
                },
                {
                    question: 'WHEN DO TIPS DEPOSIT?',
                    answer: 'As Tipper currently offers ACH transfers, the standard transfer time is 1-3 business days. However, most transfers take place within 1 business day so you can enjoy your tips quickly and securely.'
                }



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
    }
}
.hero-unit {
    background-color: #F6F4F1;
    min-height: 500px;
    padding-bottom: 80px;

    @include for-phone-only {
        padding-bottom: 36px;
    }

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
        padding: 45px 0;

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

        @include for-phone-only {
            margin: 24px auto;
        }

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

            @include for-phone-only {
                margin-bottom: 24px;
                height: fit-content;

                h1 {
                    margin-bottom: 0;
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
    font-size: 17px;
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
    position: relative;
    z-index: 1;

    @include for-phone-only {
        min-height: 400px;
        height: 400px;
    }

    .inner {
        min-height: 1100px;
        position: relative;
        marign-top: 0 !important;

        @include for-phone-only {
            min-height: fit-content;
        }
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

    @include for-phone-only {
        bottom: inherit;
        top: 330px;
        height: 150px;
        font-size: 22px;
        line-height: 29px;
        padding: 24px;
        left: 24px;
        height: auto;
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

.mobile-col {
    @include for-phone-only {
        display: flex;
        flex-direction: column;
    }
}

.mobile-center {
    @include for-phone-only {
        margin: 0 16px;
    }
}

.mobile-text {
    @include for-phone-only {
        text-align: center !important;
        margin-right: 0 !important;
        margin-bottom: 24px;
    }
}

.mobile-padding {
    @include for-phone-only {
        padding: 46px 24px;
    }
}
</style>
