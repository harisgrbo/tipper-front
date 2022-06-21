<template>
    <div class="homepage-wrapper flex flex-col">
        <div class="hero-unit">
            <div class="inner">
                <div class="flex flex-col items-center justify-center text-center w-full">
                    <h1>GET IN TOUCH</h1>
                    <div class="flex flex-row items-center justify-between w-full mobile-col">
                        <div class="text-wrap">
                            <div>
                                <h2>Customer support</h2>
                                <p>8am to 6pm ET, M-F.</p>
                                <p>support@thetippercompany.com</p>
                            </div>
                            <div>
                                <h2>SALES</h2>
                                <p>8am to 6pm ET, M-F.</p>
                                <p>(212) 918-8110</p>
                            </div>
                            <div>
                                <h2>OUR OFFICE</h2>
                                <p>55 Hudson Street</p>
                                <p>New York, NY 10013</p>
                            </div>
                        </div>
                        <form @submit.prevent="contactUs" class="form-wrapper">
                            <div class="input-wrapper">
                                <label>NAME</label>
                                <div class="grid grid-cols-2 gap-6 w-full">
                                    <input type="text" placeholder="First" v-model="contactPayload.first_name" required>
                                    <input type="text" placeholder="Last*" v-model="contactPayload.last_name" required>
                                </div>
                            </div>
                            <div class="input-wrapper">
                                <label for="">BUSINESS NAME</label>
                                <input type="text" placeholder="Name" v-model="contactPayload.company" required>
                            </div>
                            <div class="input-wrapper">
                                <label for="">EMAIL</label>
                                <input type="text" placeholder="Email Address" v-model="contactPayload.email" required>
                            </div>
                            <div class="input-wrapper">
                                <label for="">SUBJECT</label>
                                <input type="text" v-model="contactPayload.subject" required>
                            </div>
                            <div class="input-wrapper">
                                <label for="">MESSAGE</label>
                                <textarea name="" id="" rows="10" required v-model="contactPayload.message"></textarea>
                            </div>
                            <button type="submit">SEND INQUIRY</button>
                        </form>
                    </div>
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
</template>

<script>

export default {
    name: "contact-us",
    layout: 'home',
    data() {
        return {
            contactPayload: {
                first_name: '',
                last_name: '',
                email: '',
                company: '',
                subject: '',
                message: ''
            }
        }
    },
    methods: {
        async contactUs() {
            try {
                let res = await this.$axios.post('/website/contact', this.contactPayload);

                this.$toast.open({
                    message: "Message sent successfully",
                    type: 'success',
                });

                this.contactPayload.first_name = '';
                this.contactPayload.last_name = '';
                this.contactPayload.email = '';
                this.contactPayload.company = '';
                this.contactPayload.subject = '';
                this.contactPayload.message = '';


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


    .inner {
        position: relative;
        z-index: 1;
        h1 {
            font-size: 42px;
            font-weight: 700;
            color: #000;
            margin-bottom: 36px;
        }
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
        margin-bottom: 0;
    }

    h2 {
        font-size: 22px;
        font-weight: 300;
        color: #000;
    }
}
.form-wrapper {
    width: 610px;
    background: #000;
    padding: 25px;
    padding-right: 45px;

    @include for-phone-only {
        width: 100%;
        padding: 24px;
    }
    button {
        background: #B45E4B;
        color: #fff;
        width: 180px;
        height: 50px;
        padding: 0 32px;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 180px;

        @include for-phone-only {
            margin: 0 auto;
            height: 40px;
        }
    }

    input, select, textarea {
        height: 45px;
        width: 100%;
        padding: 0 16px;
        font-size: 15px;
        font-weight: 300;
        border: 2px solid #fff;
        margin-bottom: 24px;
        background: #000;

        &:focus {
            outline: none;
        }
    }

    textarea {
        padding: 16px;
        min-height: 120px;

        &:focus {
            outline: none;
        }
    }

    ::placeholder {
        font-size: 15px;
        font-weight: 300;
        color: #fff;
    }

}

.text-wrap {
    display: flex;
    flex-direction: column;

    @include for-phone-only {
        width: 100%;
        text-align: right;
    }

    > div {
        display: flex;
        flex-direction: column;
        align-items: unset;
        justify-content: flex-end;
        text-align: right;
        margin-bottom: 46px;
        position: relative;

        &:before {
            position: absolute;
            content: "";
            top: -9px;
            right: 0;
            height: 4px;
            width: 20px;
            background: #000;
        }

        h2 {
            font-size: 20px;
            font-weight: 500;
            color: #B45F4B;
            margin-bottom: 16px;
            text-transform: uppercase;
            text-align: right;
        }

        p {
            text-align: right;
            font-size: 16px;
            font-weight: 300;
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


.input-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    label {
        color: #fff;
        margin-bottom: 8px;
    }

    input, textarea {
        width: 100%;
        color: #fff !important;
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
</style>
