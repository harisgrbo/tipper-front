<template>
    <div class="employer-wrapper">
        <h2>Employee Dashboard</h2>
        <div class="bg-white p-8 rounded-2xl text-lg font-semibold w-full flex items-center justify-center">
            You are ready to receive Tips!
        </div>
    </div>
</template>

<script>
import GlobalButton from "~/components/GlobalButton";
import ReviewCard from "~/components/ReviewCard";

export default {
    name: "index-employee",
    layout: 'standard',
    components: {GlobalButton, ReviewCard},
    data() {
        return {
            range: {
                start: new Date(),
                end: new Date(),
            },
            masks: {
                input: 'DD-MM-YYYY',
            },
            balance: null,
            tips: []
        }
    },
    async created() {
        await this.fetchUserData();
        await this.fetchUsersWhoTippedMe();
    },
    methods: {
        async fetchUserData() {
            try {
                let res = await this.$axios.get('/balance')

                this.balance = res.data.data;

            } catch (e) {
                console.log(e)
            }
        },
        async fetchUsersWhoTippedMe() {
            try {
                let res = await this.$axios.get('/users/' + this.$auth.user.id + '/tips')

                this.tips = res.data.data;

            } catch (e) {
                console.log(e)
            }
        },
        beforeOpen() {
            document.body.style.overflow = 'hidden';
        },
        beforeClose() {
            document.body.style.overflow = 'auto';
        }
    }
}
</script>

<style scoped lang="scss">
.employer-wrapper {
    width: 1240px;
    margin: 0 auto;
    min-height: 100vh;
    padding-bottom: 60px;

    .block {
        padding: 41px;
        background: #fff;
        height: 280px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        border-radius: 14px;
        background-image: url("/pattern.svg");
        background-repeat: no-repeat;
        background-size: cover;

        h3 {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 300;
            font-size: 18px;
            line-height: 27px;
            /* identical to box height */

            letter-spacing: 0.01em;

            color: #000000;

            opacity: 0.6;
        }

        h2 {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size: 55px;
            line-height: 82px;
            /* identical to box height */

            letter-spacing: 0.01em;

            color: #C67D65;
            margin-bottom: 0;
            opacity: 0.8;
        }

        h4 {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size: 30px;
            line-height: 82px;
            /* identical to box height */

            letter-spacing: 0.01em;

            color: #000;
            margin-bottom: 0;
            opacity: 0.8;
        }

        span {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 300;
            font-size: 16px;
            line-height: 24px;
            /* identical to box height */

            letter-spacing: 0.01em;

            color: #161616;

            margin-bottom: 22px;
        }

        small {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
            /* identical to box height */

            letter-spacing: 0.01em;

            color: #161616;

            opacity: 0.3;
        }

        &:first-child {
            background-color: rgba(198, 125, 101, 0.35);

            h2 {
                color: #000;
            }

            button {
                height: 40px;
                min-height: 40px;
                background: #FFFFFF;
                border-radius: 10px;
                font-family: 'Poppins';
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                padding: 0 16px;
                line-height: 24px;
                /* identical to box height */


                color: #C67D65;
            }
        }
    }

    h2 {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 30px;
        line-height: 45px;
        color: #1B1A1A;
        margin-bottom: 42px;
    }

    .review-cards-wrapper {
        display: flex;
        width: 100%;
        border-radius: 14px;
        overflow: hidden;
    }
}


.table-header {

    .inner {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    h4 {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 22px;
        line-height: 33px;
        color: #1B1A1A;
    }

    span {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        /* identical to box height */

        letter-spacing: 0.01em;

        color: #161616;

        opacity: 0.3;
    }

    button {
        height: 35px;
        border: 1px solid rgba(48, 48, 48, 1);
        border-radius: 90px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 14px;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 21px;
        text-align: right;
        color: #303030;
        margin-right: 24px;

        &.active {
            background: rgba(48, 48, 48, 0.1);
            color: rgba(48, 48, 48, 0.6);
            border: none;

        }

        &:last-child {
            margin-right: 0;
        }
    }
}

table thead {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0.01em;
    color: rgba(27, 26, 26, 0.6);
}

table img {
    height: 30px;
    width: 30px;
}

tr .username {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    color: #1B1A1A;
    opacity: 0.6;
}

.stars img {
    height: 14px;
    width: 14px;
    margin-right: 8px;
}

tbody tr {
    background: #F6F8FA;
    border-radius: 10px;
    border: none;

    &:nth-child(2n + 1) {
        background: #fff;
    }
}

tr.main th {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0.01em;
    color: rgba(27, 26, 26, 0.6);
}

tbody tr:nth-child(even) {
    background: rgba(216, 205, 188, 0.15);
    border-radius: 10px;
    border: none !important;
    box-shadow: none;
}

.mutation {
    height: 35px;
    background: #C67D65;
    border-radius: 90px;
    width: 120px;
    border: none !important;
    color: #fff !important;

    img {
        margin-left: 10px;
    }
}

.modal-content {
    p {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 28px;
        letter-spacing: 0.03em;
        color: #161616;
        opacity: 0.3;
        margin-top: 23px;
    }

    h3 {
        font-style: normal;
        font-weight: 500;
        font-size: 22px;
        line-height: 30px;
        color: #1B1A1A;
        opacity: 0.8;
        margin-top: 46px;
        margin-bottom: 23px;
    }

    .input-date-wrapper {
        background: rgba(216, 205, 188, 0.20);
        border-radius: 14px;
        padding: 8px 12px;
        width: 100%;

        label {
            font-style: normal;
            font-weight: 400;
            font-size: 10px;
            line-height: 14px;
            /* identical to box height */


            color: #000000;

            opacity: 0.4;
        }

        input {
            background: transparent;

            &:focus {
                outline: none
            }
        }
    }

    .divider {
        margin: 0 40px;
    }
}

.modal-buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    margin-top: 56px;

    button {
        background: rgba(198, 125, 101, 0.1);
        border-radius: 15px;
        height: 54px;
        width: 270px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: #C67D65;

        &:first-child {
            margin-right: 14px;
        }
    }
}
</style>
