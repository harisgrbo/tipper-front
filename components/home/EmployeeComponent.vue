<template>
    <div class="employer-component">
        <div class="flex flex-row items-center justify-between inner first-block">
            <div class="image-wrapper">
                <h1 class="ml-6">EMPLOYEE</h1>
                <img src="/2.png" alt="">
            </div>
            <div class="text-wrap">
                <h1>Start making more today</h1>
                <h2>FAST. PRIVATE. SECURE.</h2>
                <p class="mb-4">Our mission is to help you the employee obtain more financial wealth.</p>

                <p>- Lorem ipsum</p>
                <p>- Lorem ipsum</p>
                <p>- Lorem ipsum</p>
                <p>- Lorem ipsum</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "EmployeeComponent"
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
        text-transform: uppercase !important;
        line-height: 48px;
    }
    .image-wrapper {
        position: relative;

        img {
            width: 290px;
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
}
</style>
