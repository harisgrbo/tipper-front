<template>
    <div class="employer-wrapper">
        <div class="flex flex-col" v-if="loaded">
            <div class="w-full flex flex-row items-center justify-start mb-6">
                <div>
                    <h2>Employer Dashboard</h2>
                </div>
            </div>
            <div class="bg-white rounded-md p-24 flex flex-col items-center justify-center">
                <img src="/no-employees.svg" class="mb-6" alt="">
                <h2 class="start">
                    {{ myEmployees.length ? 'Invite Employees' : 'Start Inviting Employees' }}
                </h2>
                <button class="new-inv mt-6" @click="$router.push('/invite/employees')">Invite</button>
            </div>
            <div class="mt-8">
                <!-- This example requires Tailwind CSS v2.0+ -->
                <div class="bg-white table-header p-md">
                    <div class="p-6 flex w-full flex-row items-center justify-between inner">
                        <div class="sm:flex-auto">
                            <h4>Employees Invited</h4>
                        </div>
                    </div>
                    <div class="mt-6 flex flex-col employees-wrap">
                        <div class="-overflow-x-auto">
                            <div class="inline-block min-w-full align-middle">
                                <div class="overflow-hidden">
                                    <table class="min-w-full divide-y divide-gray-300">
                                        <thead class="bg-white">
                                        <tr class="main">
                                            <th scope="col" class="py-3.5 pl-4 pr-3 text-left sm:pl-6 w-1/4">List of Employees
                                            </th>
                                            <th scope="col" class="px-3 py-3.5 text-left w-full w-1/4">Date</th>
                                            <th scope="col" class="px-3 py-3.5 text-left w-1/4">
                                                Status
                                            </th>
                                            <th scope="col" class="px-3 py-3.5 text-left w-1/4">
                                                Remove invitation
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody class="divide-y bg-white">
                                        <tr v-for="(employee, index) in myEmployees" :key="index">
                                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 w-1/4 max-w-1/4">
                                                <div class="flex items-center">
                                                    <div class="flex-shrink-0">
                                                        <img class="h-10 w-10 rounded-full" src="/avatar.svg" alt="">
                                                    </div>
                                                    <div class="ml-4">
                                                        <div class="username">
                                                            {{ employee.email }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 w-1/4 max-w-1/4">
                                                {{ $moment(employee.created_at).format('MM/DD/YYYY') }}
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 w-1/4 capitalize">{{ employee.status }}</td>
                                            <td class="whitespace-nowrap px-3 py-4 w-1/4 capitalize text-right">
                                                <svg v-show="employee.status === 'pending'" @click="removeInvitation(employee.id)" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer hover:text-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                'Today',
                'This Week',
                'This Month',
                'This Year'
            ],
            email: '',
            loaded: false,
            current_option: 0,
            range: {
                start: new Date(),
                end: new Date(),
            },
            masks: {
                input: 'DD-MM-YYYY',
            },
            reviewUsers: [],
            selectedUser: null,
            myEmployees: []
        }
    },
    async created() {
        await this.fetchMyEmployees();
    },
    methods: {
        async removeInvitation(id) {
          try {
              let res = await this.$axios.delete('/email/invites/' + id);

              let index = this.myEmployees.findIndex((item) => item.id === id);
              this.myEmployees.splice(1, index);

              this.$toast.open({
                  message: 'Invite successfully removed',
                  type: 'success',
              });
          } catch(e) {
              console.log(e)
          }
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
            this.loaded = false;
            try {
                let res = await this.$axios.get('/email/invites');

                this.myEmployees = res.data.data;

                console.log(this.myEmployees, 'asdasd')

                this.loaded = true;
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

        color: #343434;

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
            background: rgba(198, 125, 101, 0.2);
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

.back {
    height: 54px;
    width: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1.5px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    border-radius: 15px;
    margin-right: 27px;
}

tr th {
    max-width: 25% !important;
    width: 25% !important;
    min-width: 25% !important;
}
</style>
