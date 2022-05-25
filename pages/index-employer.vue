<template>
    <div class="employer-wrapper">
        <div v-if="loaded">
            <div class="flex items-center justify-between">
                <h2>Employer Dashboard</h2>
                <button class="pending-button" @click="$router.push('/index-employer-pending')">Check invitation status</button>
            </div>
            <div>
                <div class="bg-white table-header p-md">
                    <div class="p-6 flex w-full flex-row items-center justify-between inner">
                        <div class="sm:flex-auto flex flex-row items-center justify-between">
                            <div>
                                <h4>Employees List</h4>
                            </div>
                        </div>
                        <div class="flex flex-row items-center">
                            <button v-for="(option, index) in options" :key="index"
                                    :class="current_option === option.key ? 'active' : ''" @click="setCurrentOption(option)">
                                {{ option.name }}
                            </button>
                            <button class="mutation" @click="$router.push('/report/' + current_option)">
                                Export Tip Report
                                <img src="/mutation.svg" alt="">
                            </button>
                        </div>
                    </div>
                    <div class="mt-6 flex flex-col employees-wrap">
                        <div class="-overflow-x-auto">
                            <div class="inline-block min-w-full align-middle">
                                <div class="overflow-hidden">
                                    <table class="min-w-full divide-y divide-gray-300">
                                        <thead class="bg-white">
                                        <tr class="main">
                                            <th scope="col" class="py-3.5 pl-4 pr-3 text-left sm:pl-6">List of Employees
                                            </th>
                                            <th scope="col" class="px-3 py-3.5 text-left">Ratings</th>
                                            <th scope="col" class="px-3 py-3.5 text-left">Department</th>
                                            <th scope="col" class="px-3 py-3.5 text-left">Total tips</th>
                                            <th scope="col" class="px-3 py-3.5 text-left">Date</th>
                                            <th scope="col" class="px-3 py-3.5 flex flex-row items-center justify-end">
                                                <button class="invite" @click="$router.push('/invite/employees')">
                                                    Invite Employees
                                                </button>
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody class="divide-y bg-white">
                                        <tr v-for="(employee, index) in myEmployees" :key="index">
                                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                <div class="flex items-center">
                                                    <div class="flex-shrink-0">
                                                        <img class="h-10 w-10 rounded-full" src="/avatar.svg" alt="">
                                                    </div>
                                                    <div class="ml-4">
                                                        <div class="username"
                                                             @click="$router.push('/employee/' + employee.id)">
                                                            {{ employee.firstname + ' ' + employee.lastname }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div class="flex flex-row items-center stars">
                                                    <star-rating :star-size="15" :increment="1" :inline="true"
                                                                 :read-only="true" inactive-color="#F0EBE4"
                                                                 :show-rating="true" active-color="#C67D65"
                                                                 v-model="employee.rating"></star-rating>

                                                </div>
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 username">{{ employee.department.name }}</td>
                                            <td class="whitespace-nowrap px-3 py-4 username">${{ employee.total_earned_amount }}</td>
                                            <td class="whitespace-nowrap px-3 py-4 username">{{ $moment(employee.created_at).format('ddd DD MMMM')  }}</td>
                                            <td class="whitespace-nowrap px-3 py-4 username"></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-row items-center justify-between w-full mt-16 mb-8" v-show="reviewUsers.length">
                    <h2 class="reviews">Reviews- last 5 reviews</h2>
                    <GlobalButton placeholder="View All Reviews" width="220px"
                                  @handle-button-action="$router.push('/reviews')" bg-color="#C67D65"
                                  txt-color="#fff"></GlobalButton>
                </div>
                <div class="review-cards-wrapper">
                    <ReviewCard @open-review-card-modal="handleOpenReviewCardInModal(user)" :user="user"
                                v-for="(user, index) in reviewUsers.slice(0, 5)" :key="index"></ReviewCard>
                </div>
                <client-only>
                    <modal name="mutation"
                           width="910"
                           height="auto"
                           @before-open="beforeOpen"
                           @before-close="beforeClose">
                        <div class="flex flex-col">
                            <div class="modal-header items-start">
                                <div>
                                    <h1>Tip activity report mutation</h1>
                                </div>
                                <button @click="$modal.hide('mutation')">
                                    <img src="/close.svg" alt="">
                                </button>
                            </div>
                            <div class="modal-content">
                                <h3>Mutation period</h3>
                                <vc-date-picker
                                    :disabled-dates="disabledDates"
                                    :min-date="new Date()"
                                    v-model="range"
                                    :masks="masks"
                                    locale="sr-Latn-RS"
                                    is-range
                                    is-inline
                                    popover.visibility="visible"
                                    :popover="{ visibility: 'click' }"
                                >
                                    <template v-slot="{ inputValue, inputEvents, isDragging }">
                                        <div class="flex flex-row justify-between items-center">
                                            <div class="flex flex-col input-date-wrapper">
                                                <label class="text-xs text-gray-400 font-medium mb-2 uppercase">from
                                                    date</label>
                                                <div class="relative flex-grow w-full">
                                                    <input
                                                        class="flex-grow pr-2 py-1 w-full date-input"
                                                        :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                                                        :value="inputValue.start"
                                                        v-on="inputEvents.start"
                                                    />
                                                </div>
                                            </div>

                                            <span class="flex-shrink-0 m-2 divider">
                    <img src="/devider.svg" alt="">
                  </span>
                                            <div class="flex flex-col input-date-wrapper">
                                                <label class="text-xs text-gray-400 font-medium mb-2 uppercase">Till
                                                    date</label>
                                                <div class="relative flex-grow w-full">
                                                    <input
                                                        class="flex-grow pr-2 py-1 w-full date-input"
                                                        :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                                                        :value="inputValue.end"
                                                        v-on="inputEvents.end"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </vc-date-picker>
                                <div class="modal-buttons">
                                    <button>Download in excel form</button>
                                    <button>Download in pdf format</button>
                                </div>
                            </div>
                        </div>
                    </modal>
                    <modal name="review-card"
                           class="review"
                           width="910"
                           height="auto"
                           @before-open="beforeOpen"
                           @before-close="beforeClose">
                        <div class="flex flex-row-reverse" v-if="selectedUser !== null">
                            <div class="flex flex-col w-full justify-between">
                                <div class="modal-header w-full">
                                    <div>
                                        <h1>{{ selectedUser.name }}</h1>
                                        <span>Developer</span>
                                    </div>
                                    <button @click="$modal.hide('review-card')">
                                        <img src="/close.svg" alt="">
                                    </button>
                                </div>
                                <div class="flex flex-col modal-content">
                                    <star-rating :star-size="15" :increment="1" :inline="true" :read-only="true"
                                                 inactive-color="#F0EBE4" :show-rating="true" active-color="#C67D65"
                                                 v-model="selectedUser.rating"></star-rating>

                                    <div class="modal-buttons review">
                                        <button>Change Department</button>
                                        <button>Delete Employee</button>
                                    </div>
                                </div>
                            </div>

                            <div class="modal-image-wrapper">
                                <img :src="selectedUser.avatar || '/noimage.png'" alt="">
                            </div>
                        </div>
                    </modal>
                </client-only>
            </div>
        </div>
        <Loader v-else></Loader>
    </div>
</template>

<script>
import GlobalButton from "~/components/GlobalButton";
import ReviewCard from "~/components/ReviewCard";
import InputField from "@/components/inputs/InputField";
import Loader from "@/components/Loader";
export default {
    name: "index-employer",
    layout: 'standard',
    components: {InputField, GlobalButton, ReviewCard, Loader},
    data() {
        return {
            options: [
                {
                    name: 'Today',
                    key: 'today'
                },
                {
                    name: 'This Week',
                    key: 'week'
                },
                {
                    name: 'This Month',
                    key: 'month'
                },
                {
                    name: 'This Year',
                    key: 'Year'
                }
            ],
            email: '',
            current_option: 'today',
            range: {
                start: new Date(),
                end: new Date(),
            },
            masks: {
                input: 'DD-MM-YYYY',
            },
            reviewUsers: [],
            selectedUser: null,
            myEmployees: [],
            loaded: false
        }
    },
    async created() {
        this.loaded = false;
        await this.fetchMyEmployees();
        await this.fetchReviews();
        this.loaded = true
    },
    methods: {
        setCurrentOption(o) {
            this.current_option = o.key;

            this.$router.push('/report/' + o.key)
        },
        beforeOpen() {
            document.body.style.overflow = 'hidden';
        },
        beforeClose() {
            document.body.style.overflow = 'auto';
        },
        handleOpenReviewCardInModal(u) {
            this.selectedUser = u;

            this.$modal.show('review-card');
        },
        async inviteNewEmployee() {
            try {
                let res = await this.$axios.post('/email/invite', {
                    email: this.email
                });

                this.$toast.open({
                    message: 'Invite successfully sent to ' + this.email,
                    type: 'success',
                });

                this.email = ''
                this.$modal.hide('invite');
            } catch (e) {
                console.log(e)
            }
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
        async fetchReviews() {
            try {
                let res = await this.$axios.get('/users/' + this.$auth.user.id + '/tips');

                this.reviewUsers = res.data.data;

            } catch (e) {
                console.log(e)
            }
        }
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
    margin-top: 12px;

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
</style>
