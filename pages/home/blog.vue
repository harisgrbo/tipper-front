<template>
    <div class="homepage-wrapper flex flex-col">
        <div class="hero-unit">
            <div class="inner">
                <div class="flex flex-col items-center justify-center text-center w-full">
                    <h1>BLOG</h1>
                    <div class="grid grid-cols-3 gap-14">
                        <div class="blog-card">
                            <img src="/img1.png" alt="">
                            <h2>HOW TO KEEP YOUR STAFF HAPPY DURING THE GREAT RESIGNATION</h2>
                            <p>The Great Resignation: In 2021, employers began receiving resignation letters at the highest rate in recent history. According to the U.S. Bureau of Labor Statistics, over 4.5 million Americans left their jobs in November alone. Propelled by the shift from in-person...</p>
                            <b>March 15 2022</b>
                            <button>READ MORE</button>
                        </div>
                        <div class="blog-card central">
                            <img src="/img2.png" alt="">
                            <h2>TIPPING AS AN EMPLOYEE BENEFIT</h2>
                            <p>Tipper is not just a tipping platform- it's an employee benefit and a culture enhancement. These days, employees want more than just a paycheck. They want a suite of benefits that help mold an enticing culture for them to come to each day. And the right culture...</p>
                            <b>March 15 2022</b>
                            <button>READ MORE</button>
                        </div>
                        <div class="blog-card">
                            <img src="/img3.png" alt="">
                            <h2>HIGHER TIPS LEADS TO HIGHER EMPLOYEE RETENTION</h2>
                            <p>At Tipper, we're so interested in learning about what companies implement to enhance the employee experience. That's right- the employee experience, not the customer one. In the age of the great resignation, companies need to rightfully focus on their employees more...</p>
                            <b>March 15 2022</b>
                            <button>READ MORE</button>
                        </div>
                    </div>
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
    name: "blog",
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
    background-color: #EDE9E3;
    background-repeat: no-repeat;
    background-position: bottom;
    background-position-x: 365px;
    background-size: 1448px;
    background-position-y: -385px;
    padding-bottom: 80px;


    .inner {

        h1 {
            font-size: 42px;
            font-weight: 700;
            color: #B45F4B;
            margin-bottom: 80px;
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
        margin-bottom: 0;
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

</style>
