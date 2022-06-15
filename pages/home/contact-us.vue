<template>
    <div class="homepage-wrapper flex flex-col">
        <div class="hero-unit">
            <div class="inner">
                <div class="flex flex-col items-center justify-center text-center w-full">
                    <h1>GET IN TOUCH</h1>
                    <div class="flex flex-row items-center justify-between w-full">
                        <div class="text-wrap">
                            <div>
                                <h2>Customer support</h2>
                                <p>8am to 6pm PT, M-F.</p>
                                <p>support@thetippercompany.com</p>
                            </div>
                            <div>
                                <h2>SALES</h2>
                                <p>8am to 6pm PT, M-F.</p>
                                <p>(212) 918-8110</p>
                            </div>
                            <div>
                                <h2>OUR OFFICE</h2>
                                <p>55 Hudson Street,</p>
                                <p>New York, NY 10013</p>
                            </div>
                        </div>
                        <div class="form-wrapper">
                            <select name="cars" id="cars">
                                <option value="volvo">Volvo</option>
                                <option value="saab">Saab</option>
                                <option value="mercedes">Mercedes</option>
                                <option value="audi">Audi</option>
                            </select>
                            <div class="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="FIRST NAME*">
                                <input type="text" placeholder="LAST NAME*">
                            </div>
                            <input type="text" placeholder="BUSINESS NAME*">
                            <input type="text" placeholder="EMAIL*">
                            <input type="text" placeholder="SUBJECT*">
                            <textarea name="" id="" rows="10" placeholder="MESSAGE"></textarea>
                            <button>SEND INQUIRY</button>
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
</template>

<script>

export default {
    name: "contact-us",
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
    background-position-x: 552px;
    background-size: 1658px;
    background-position-y: -410px;
    padding-bottom: 60px;


    .inner {

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

</style>
