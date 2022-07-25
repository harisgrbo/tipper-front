<template>
    <div class="employer-wrapper">
        <div v-show="loaded">
            <div class="flex items-center justify-between">
                <h2>Shifts Mode</h2>
                <button class="pending-button" @click="$router.push('/index-employer-pending')">Check invitation status</button>
            </div>
            <div v-for="pool in pools" v-if="pool.employments.length" class="flex flex-col mt-8 w-full">
                <div class="disperse-wrapper" style="margin-bottom: 0 !important; border-bottom: 1px solid #ddd">
                    <div class="grid grid-cols-4 w-full">
                        <p>{{ pool.name }}</p>
                        <p>Available Amount: ${{ pool.balance }}</p>
                        <div></div>
                        <div class="flex items-center justify-end">
                        </div>
                    </div>
                </div>
                <div class="flex flex-col employees-wrap">
                    <div class="-overflow-x-auto">
                        <div class="inline-block min-w-full align-middle">
                            <div class="overflow-hidden">
                                <table class="min-w-full divide-y divide-gray-300">
                                    <thead class="bg-white">
                                    <tr class="main">
                                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left sm:pl-6 w-1/2">List of Employees
                                        </th>
                                        <th scope="col" class="px-3 py-3.5 text-left w-1/5">Hours</th>
                                        <th scope="col" class="px-3 py-3.5 text-left w-1/5">Tip Amount</th>
                                    </tr>
                                    </thead>
                                    <tbody class="divide-y bg-white">
                                    <tr v-for="(user, index) in pool.employments">
                                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 w-1/2">
                                            <div class="flex items-center">
                                                <div class="flex-shrink-0">
                                                    <img class="h-10 w-10 rounded-full" :src="user.user.avatar_url || '/noimage.png'" alt="">
                                                </div>
                                                <div class="ml-4">
                                                    <div class="username">
                                                        {{ user.user.display_name }}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500 w-1/5">
                                            <input class="hours-input" type="number" @change="updateUserHours(user.user.id, $event)" v-model="user.user.hours">
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-left w-1/5">${{ user.user.total_earned_amount }}</td>
                                    </tr>
                                    <tr class="main bg-white" style="background: #fff !important;">
                                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left sm:pl-6 w-1/2">
                                        </th>
                                        <th scope="col" class="px-3 py-3.5 text-left w-1/5">Total: {{ getSumHours(pool.employments) }}</th>
                                        <th scope="col" class="px-3 py-3.5 text-left w-1/5">${{ getSum(pool.employments) }}</th>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-col mt-8 w-full">
                <div class="disperse-wrapper" style="margin-bottom: 0 !important; border-bottom: 1px solid #ddd">
                    <div class="grid grid-cols-4 w-full">
                        <p>General Tip Jar</p>
                        <p>Available Amount: ${{ $auth.user.total_balance }}</p>
                    </div>
                </div>
                <div class="flex flex-col employees-wrap">
                    <div class="-overflow-x-auto">
                        <div class="inline-block min-w-full align-middle">
                            <div class="overflow-hidden">
                                <table class="min-w-full divide-y divide-gray-300">
                                    <thead class="bg-white">
                                    <tr class="main">
                                        <th scope="col" class="py-3.5 pl-4 pr-3 text-center sm:pl-6 custom-table-header">Each employe receives a portion of these tips based on the amount of hours they worked. <button class="details" @click="showGeneralJar = !showGeneralJar">DETAILS</button>
                                        </th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-show="showGeneralJar" class="flex flex-col employees-wrap">
                    <div class="-overflow-x-auto">
                        <div class="inline-block min-w-full align-middle">
                            <div class="overflow-hidden">
                                <table class="min-w-full divide-y divide-gray-300">
                                    <thead class="bg-white">
                                    <tr class="main">
                                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left sm:pl-6 w-1/2">List of Employees
                                        </th>
                                        <th scope="col" class="px-3 py-3.5 text-left w-1/5">Hours</th>
                                        <th scope="col" class="px-3 py-3.5 text-left w-1/5">Tip Amount</th>
                                    </tr>
                                    </thead>
                                    <tbody class="divide-y bg-white">
                                    <tr v-for="(user, index) in myEmployees">
                                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 w-1/2">
                                            <div class="flex items-center">
                                                <div class="flex-shrink-0">
                                                    <img class="h-10 w-10 rounded-full" :src="user.avatar_url || '/noimage.png'" alt="">
                                                </div>
                                                <div class="ml-4">
                                                    <div class="username">
                                                        {{ user.display_name }}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500 w-1/5">
                                            {{ user.hours }}
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-left w-1/5">${{ user.total_earned_amount }}</td>
                                    </tr>
                                    <tr class="main bg-white" style="background: #fff !important;">
                                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left sm:pl-6 w-1/2">
                                        </th>
                                        <th scope="col" class="px-3 py-3.5 text-left w-1/5">Total: 100</th>
                                        <th scope="col" class="px-3 py-3.5 text-left w-1/5">$100</th>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="flex flex-row items-center justify-between bg-white p-8 mt-8 w-full">
                <div class="flex items-center justify-end px-4 flex-1">
                    <p class="total-sub">Total Hours: {{ getTotalHoursSumInPools() }}</p>
                </div>
                <div class="flex flex-row items-center justify-between px-4 flex-1">
                    <p class="total-sub">Total Tips: ${{ getTotalTipsSumInPools() }}</p>
                    <button class="disperse" @click="$modal.show('jar-disperse')">Disperse tips</button>
                </div>
            </div>
        </div>
        <Loader v-show="!loaded"></Loader>
        <client-only>
            <modal name="pool-disperse"
                   width="476"
                   height="auto"
                   @before-open="beforeOpen"
                   @before-close="beforeClose">
                <div class="flex flex-col">
                    <h1 class="text-center">Are you sure you want to disperse tips to the pool?</h1>
                    <div class="modal-buttons">
                        <button @click="$modal.hide('pool-disperse')">No</button>
                        <button @click="dispersTipsToPool">Yes</button>
                    </div>
                </div>
            </modal>
        </client-only>
        <client-only>
            <modal name="jar-disperse"
                   width="476"
                   height="auto"
                   @before-open="beforeOpen"
                   @before-close="beforeClose">
                <div class="flex flex-col">
                    <h1 class="text-center">Are you sure you want to disperse tips to the General Jar?</h1>
                    <div class="modal-buttons">
                        <button @click="$modal.hide('jar-disperse')">No</button>
                        <button @click="dispersTipsToGeneralJar">Yes</button>
                    </div>
                </div>
            </modal>
        </client-only>
    </div>
</template>

<script>
import GlobalButton from "~/components/GlobalButton";
import ReviewCard from "~/components/ReviewCard";
import InputField from "@/components/inputs/InputField";
import Loader from "@/components/Loader";

export default {
    name: "index-shifts",
    layout: 'standard',
    components: {InputField, GlobalButton, ReviewCard, Loader},
    middleware: ['auth'],
    data() {
        return {
            pools: [],
            myEmployees: [],
            loaded: false,
            showGeneralJar: false,
            selected_pool: 0,
        }
    },
    async created() {
        this.loaded = false;
        await this.fetchMyEmployees();
        await this.fetchPools();
        await this.getTotalHoursSumInPools();
        await this.getTotalTipsSumInPools();
        this.loaded = true
    },
    methods: {
        beforeOpen() {
            document.body.style.overflow = 'hidden';
        },
        beforeClose() {
            document.body.style.overflow = 'auto';
        },
        async updateUserHours(id, e) {
            let h = e.target.value;
            try {
                let res = await this.$axios.put('/employees/' + id + '/hours', {
                    hours: parseInt(h)
                });

                await this.$auth.fetchUser();

                await window.location.reload();

            } catch(e) {
                console.log(e)
            }
        },
        async dispersTipsToPool() {
            try {
                let res = await this.$axios.post('/pools/' + this.selected_pool + '/disperse');

                this.$toast.open({
                    message: 'You have successfully dispersed tips to the pool',
                    type: 'success',
                });

                await this.$auth.fetchUser();
            } catch(e) {
                console.log(e.response);
                this.$toast.open({
                    message: e.response.data.message,
                    type: 'error',
                });
            }
        },
        async dispersTipsToGeneralJar() {
            try {
                let res = await this.$axios.post('/employer/disperse');

                this.$toast.open({
                    message: 'You have successfully dispersed tips to the General Jar',
                    type: 'success',
                });

                await this.$auth.fetchUser();

            } catch(e) {
                console.log(e.response);
                this.$toast.open({
                    message: e.response.data.message,
                    type: 'error',
                });
            }
        },
        getTotalHoursSumInPools() {
            let sum = 0;

            this.pools.forEach(pool => {
                pool.employments.forEach(user => {
                    sum += parseInt(user.user.hours);
                })
            });
           return sum
        },
        getTotalTipsSumInPools() {
            let sum = 0;

            this.pools.forEach(pool => {
                pool.employments.forEach(user => {
                    sum += parseInt(user.user.total_earned_amount);
                })
            });
            return sum
        },
        getSum(arr) {
            let sum = 0;

            arr.forEach(user => {
                console.log(user.user.total_earned_amount)
                sum += parseFloat(user.user.total_earned_amount);
            });
            console.log(sum)
            return sum;
        },

        getSumHours(arr) {
            let sum = 0;

            arr.forEach(user => {
                sum += parseInt(user.user.hours);
            });
            console.log(sum)
            return sum.toFixed(2);
        },

        async fetchPools() {
            let res = await this.$axios.get('/users/' + this.$route.params.id + '/pools');

            this.pools = res.data.data;

            console.log(this.pools, 'testttt')

            this.loaded = true
        },
        async fetchMyEmployees() {
            try {
                let res = await this.$axios.get('/my/employees');

                this.myEmployees = res.data.data;

                console.log(this.myEmployees)
            } catch (e) {
                console.log(e)
            }
        },
    }
}
</script>

<style scoped lang="scss">
.employer-wrapper {
    width: 1240px;
    margin: 0 auto;
    min-height: 100vh;

    h2 {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 30px;
        line-height: 45px;
        color: #1B1A1A;
        margin-bottom: 42px;

        &.reviews {
            margin-bottom: 0;
        }
    }

    .review-cards-wrapper {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-column-gap: 20px;
        grid-row-gap: 20px;
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
        border: 1px solid rgba(198, 125, 101, 0.2);
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
        color: #C67D65;
        margin-right: 12px;

        &.active {
            background: rgb(198, 125, 101);
            border: none;
            color: #fff;

        }

        &:last-child {
            margin-right: 0;
        }
    }
}

table thead {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.01em;
    color: #1B1A1A;
}

table img {
    height: 30px;
    width: 30px;
}

tr .username {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    color: #1B1A1A;
    opacity: 0.6;
    cursor: pointer;
}

.stars img {
    height: 14px;
    width: 14px;
    margin-right: 8px;
}

tbody tr:nth-child(even) {
    background: rgba(216, 205, 188, 0.15);
    border-radius: 10px;
    border: none !important;
    box-shadow: none;
}

.statistic-img {
    background-image: url("/statistic.png");
    height: 471px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}

tr.main th {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0.01em;
    color: rgba(27, 26, 26, 0.6);
}

.mutation {
    height: 35px;
    background: #C67D65;
    border-radius: 90px;
    width: fit-content;
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

    &.review {
        flex-direction: column;

        button {
            width: 100%;

            &:first-child {
                margin-right: 0;
                background: #C67D65;
                color: #fff;
                margin-bottom: 24px;
            }
        }
    }

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

.modal-image-wrapper {
    min-width: 420px;
    min-height: 420px;
    max-height: 420px;
    max-width: 420px;
    padding-right: 24px;

    img {
        height: 100%;
        width: 100%;
        border-radius: 20px;
    }
}


.stars {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    img {
        margin-right: 8px;
    }
}

.modal-header {
    align-items: flex-start;
}

.invite {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    min-width: fit-content;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #C67D65;
    height: 33px;
    background: rgba(198, 125, 101, 0.1);
    border-radius: 90px;
    width: fit-content;
    min-width: fit-content;
}

.start {
    font-style: normal;
    font-weight: 600;
    font-size: 34px;
    line-height: 46px;
    color: #1B1A1A;
    opacity: 0.8;
}

.sub-start {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.01em;
    color: #161616;
    opacity: 0.5;
}

.new-inv {
    height: 54px;
    background: #B45F4B;
    border-radius: 15px;
    width: 171px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #FFFFFF;
    flex: none;
    order: 0;
    flex-grow: 0;
}

.pending-button {
    height: 54px;
    background: rgb(198, 125, 101);
    border-radius: 14px;
    color: #fff;
    width: fit-content;
    padding: 0 24px;
}

.user-info {
    background: #fff;
    padding: 38px;
    margin-bottom: 36px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    h1 {
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 33px;
        color: #1B1A1A;
        opacity: 0.8;
    }

    p {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 25px;
        color: #000000;
        opacity: 0.6;

        &.sub {
            font-style: normal;
            font-weight: 700;
            font-size: 14px;
            line-height: 16px;
            margin-top: 8px;
            color: #343434;
        }
    }

    .user-avatar {
        height: 84px;
        width: 84px;
        border-radius: 42px;
        margin-right: 26px;
        position: relative;
        border: 1px solid #f1f1f1;
        object-fit: cover;

        .upload {
            display: none;
            position: absolute;
            bottom: 0;
            height: 42px;
            width: 84px;
            border-bottom-left-radius: 42px;
            border-bottom-right-radius: 42px;
            align-items: center;
            justify-content: center;
            z-index: 1;
            background: #fff;
            cursor: pointer;
        }

        &:hover {
            .upload {
                display: flex;

            }
        }
    }
}

canvas {
    height: 100px !important;
    width: 100px !important;
}

.modal-title {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 45px;
    color: #1B1A1A;
    margin-bottom: 0;
}

.modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
        font-style: normal;
        font-weight: 500 !important;
        font-size: 30px;
        line-height: 41px;
        color: #1B1A1A;
        opacity: 0.8;
        margin: 24px auto;
    }

    .img-wrapper-modal {
        height: 144px;
        width: 144px;
        border-radius: 72px;
        min-width: 144px;
        margin-top: 50px;
        overflow: hidden !important;
        background: #f9f9f9;

        img {
            height: 100%;
            width: 100%;
            object-position: center;
            object-fit: cover;
        }
    }

    input[type="file"] {
        display: none;
    }

    .custom-file-upload {
        display: flex;
        margin-top: 24px;
        cursor: pointer;
        position: absolute;
        bottom: 24px;
        left: 24px;
        right: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 30px;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        letter-spacing: 0.02em;
        color: #B45F4B;
    }
}

.username.w-auto {
    width: auto;
    display: flex;
    justify-content: flex-end;
}

.download {
    font-size: 13px;
}

h1 {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    color: #1B1A1A;
    opacity: 0.4;
}

.modal-buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    button {
        height: 54px;
        background: #B45F4B;
        border-radius: 15px;
        color: #fff;
        margin-right: 8px;
        width: 100%;

        &:last-child {
            background: rgba(180, 95, 75, 0.1);
            color: #B45F4B;
            margin-left: 8px;
        }
    }
}

.tipping-link {
    font-size: 13px;
    font-weight: 500;
    color: blue;

    &:hover {
        text-decoration: underline;
    }
}

.disperse-wrapper {
    padding: 24px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 42px;

    p {
        font-style: normal;
        font-weight: 600;
        font-size: 22px;
        line-height: 30px;
        /* identical to box height */
        margin-bottom: 8px;

        color: #1B1A1A;

        opacity: 0.8;
    }

    span {
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 22px;
        /* identical to box height */

        letter-spacing: 0.01em;

        color: #161616;

        opacity: 0.5;
    }


}

.disperse {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 7px 14px;
    width: 131px;
    height: 36px;
    background: #C67D65;
    border-radius: 90px;
    color: #fff;
}

.hours-input {
    width: 63px;
    height: 30px;
    background: #FFFFFF;
    border: 1px solid rgba(180, 95, 75, 0.3);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.custom-table-header {
    background: #F8F3F1;
    font-style: normal;
    font-weight: 600;
    font-size: 18px !important;
    line-height: 25px;
    letter-spacing: 0.01em;
    color: #494848;
}

.details {
    color: #B45F4B;
    font-size: 19px;
    margin-left: 24px;
}

.total-sub {
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 30px;
    color: #1B1A1A;
}
</style>

