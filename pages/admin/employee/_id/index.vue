<template>
    <div class="notification-wrapper">
        <div v-if="loaded">
            <div class="w-full flex flex-row items-center justify-start">
                <button @click="$router.go(-1)" class="back">
                    <img src="/arrow-left.svg" alt="">
                </button>
                <div>
                    <h2>Employee Details</h2>
                </div>
            </div>
            <div class="notification-list-wrapper" v-if="employee">
                <div class="flex flex-row-reverse w-full">
                    <div class="flex flex-col w-full justify-between">
                        <div class="modal-header w-full">
                            <div class="w-full flex flex-col">
                                <InputField v-model="payload_form.firstname" label="First name" class="mb-4"></InputField>
                                <InputField v-model="payload_form.lastname" label="Last name" class="mb-4"></InputField>
                                <InputField v-model="payload_form.email" label="Email" class="mb-4"></InputField>
                                <InputField v-model="payload_form.nickname" label="Nickname" class="mb-4"></InputField>
                                <InputField v-model="payload_form.address_1" label="Address" class="mb-4"></InputField>
                                <InputField v-model="payload_form.zip_code" label="Zip Code" class="mb-4"></InputField>
                                <InputField v-model="payload_form.city" label="City" class="mb-4"></InputField>
                                <InputField v-model="payload_form.password" type="password" label="Password" class="mb-4"></InputField>
                                <InputField v-model="payload_form.repeatpassword" type="password" label="Repeat Password" class="mb-4"></InputField>
                                <h1 class="username">{{ employee !== null ? employee.username : '' }}</h1>
                                <div class="flex flex-row items-center justify-between w-full mt-8 rating-stars">
                                    <client-only>
                                        <star-rating :star-size="22" :increment="1" :inline="true" :read-only="true"
                                                     inactive-color="#F0EBE4" :show-rating="true" active-color="#C67D65"
                                                     v-model="rating"></star-rating>
                                    </client-only>
                                    <p>Very Good</p>
                                </div>
                                <div class="flex flex-row items-center justify-between w-full mt-8 rating-stars">
                                    <span>Total Tips Earned</span>
                                    <span class="total">$1920.00</span>
                                </div>
                                <div class="dropdown-wrapper mt-8" v-on-clickaway="away" >
                                    <div class="dropdown-selected" @click="showPoolList = true;">
                                        {{ employee.department.name !== null ? employee.department.name : 'Choose Pool' }}
                                    </div>
                                    <div class="dropdown-list" v-show="showPoolList">
                                        <ul>
                                            <li v-for="(pool, index) in pools" :key="index"
                                                @click="changeEmployeesPool(pool)">
                                                {{ pool.name }}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col modal-content">
                            <!--                        <star-rating :star-size="15" :increment="1" :inline="true" :read-only="true" inactive-color="#F0EBE4" :show-rating="true" active-color="#C67D65" v-model="5"></star-rating>-->
                            <div class="modal-buttons-second review">
                                <!--                            <button>Change Department</button>-->
                                <button @click="$modal.show('delete')">Delete Employee</button>
                                <button @click="updateEmployee">Update Employee</button>
                            </div>
                        </div>
                    </div>
                    <div class="modal-image-wrapper">
                        <img src="/noimage.png" alt="">
                    </div>
                </div>
            </div>
            <client-only>
                <modal name="delete"
                       width="476"
                       height="auto"
                       @before-open="beforeOpen"
                       @before-close="beforeClose">
                    <div class="flex flex-col">
                        <h1 class="text-center">Are you sure you want to delete?</h1>
                        <div class="modal-content">
                            <img src="/noimage.png" alt="">
                            <h2>{{ employee !== null ? employee.username : '' }}</h2>
                        </div>
                        <div class="modal-buttons">
                            <button @click="$modal.hide('delete')">No</button>
                            <button @click="deleteEmployee">Yes</button>
                        </div>
                    </div>
                </modal>
            </client-only>
        </div>
        <Loader v-else></Loader>
    </div>
</template>

<script>
import {mixin as clickaway} from 'vue-clickaway';
import Loader from "@/components/Loader"
import InputField from "@/components/inputs/InputField";

export default {
    name: "_id",
    layout: 'standard',
    mixins: [clickaway],
    components: {Loader, InputField},
    data() {
        return {
            range: {
                start: new Date(),
                end: new Date(),
            },
            showPoolList: false,
            selectedPool: null,
            rating: 4,
            masks: {
                input: 'MM/DD/YYYY',
            },
            balance: null,
            tips: [],
            employee: null,
            employee_meta: null,
            pools: [],
            loaded: false,
            employer_id: 0,
            payload_form: {
                address_1: '',
                city: '',
                zip_code: '',
                firstname: '',
                lastname: '',
                nickname: '',
                email: '',
                password: '',
                repeatpassword: ''
            }
        }
    },
    async created() {
        this.loaded = false;
        await this.fetchEmployee();
        await this.fetchPools();

        this.payload_form.address_1 = this.employee.address_1 || '';
        this.payload_form.city = this.employee.city || '';
        this.payload_form.zip_code = this.employee.zip_code || '';
        this.payload_form.firstname = this.employee.firstname;
        this.payload_form.lastname = this.employee.lastname;
        this.payload_form.nickname = this.employee.nickname;
        this.payload_form.email = this.employee.email;
        this.loaded = true;
    },
    methods: {
        async changeEmployeesPool(p) {
            try {
                await this.$axios.put('/employees/' + this.employee.id + '/pools', {
                    pool_id: p.id
                });

                this.$toast.open({
                    message: 'You have successfully changed pool for employee' + this.employee.username,
                    type: 'success',
                });

                await this.fetchEmployee();
                this.away();

            } catch (e) {
                console.log(e)
            }
        },
        async fetchEmployee() {
            try {
                let res = await this.$axios.get('/users/' + this.$route.params.id);

                this.employee = res.data.data;
                this.employer_id = res.data.data.department.employer_id;
                this.employee_meta = res.data.meta;

            } catch (e) {
                console.log(e)
            }
        },
        async updateEmployee() {
            try {
                if (this.payload_form.password !== this.payload_form.repeatpassword) {
                    this.$toast.open({
                        message: 'Passwords dont match',
                        type: 'error',
                    });

                    return
                }
                let res = await this.$axios.put('/admin/employee/' + this.$route.params.id, this.payload_form);

                this.$toast.open({
                    message: 'You have successfully updated the employee' + this.employee.username,
                    type: 'success',
                });

                this.employee = res.data.data;

            } catch (e) {
                console.log(e)
            }
        },
        async fetchPools() {
            try {
                let res = await this.$axios.get('/admin/users/' + this.employer_id + '/pools');

                this.pools = res.data.data;
            } catch (e) {
                console.log(e)
            }
        },
        beforeOpen() {
            document.body.style.overflow = 'hidden';
        },
        beforeClose() {
            document.body.style.overflow = 'auto';
        },
        away() {
            this.showPoolList = false;
        },
        async deleteEmployee() {
            try {
                let res = await this.$axios.delete('/admin/users/' + this.$route.params.id);

                await this.$router.push('/')
            } catch (e) {
                console.log(e)
            }
        },
    }
}
</script>

<style scoped lang="scss">
.notification-wrapper {
    width: 1240px;
    margin: 0 auto;
    min-height: 100vh;
    padding-bottom: 60px;

    h2 {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 30px;
        line-height: 45px;
        color: #1B1A1A;
    }

    span {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        margin-top: 8px;
        letter-spacing: 0.01em;
        color: #161616;
        opacity: 1;
    }

    .notification-list-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 44px;
        background: #fff;
        border-radius: 30px;
        padding: 24px
    }
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

    img {
        height: 144px;
        width: 144px;
        border-radius: 72px;
        min-width: 144px;
        margin-top: 50px;
        overflow: hidden !important;
    }
}

.modal-buttons-second {
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
        object-fit: cover !important;

    }
}

button.back {
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

span.subtitle {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    margin-top: 8px;
    letter-spacing: 0.01em;
    color: #161616;
    opacity: 0.3;
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

.username {
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 41px;
    /* identical to box height */


    color: #1B1A1A;

    opacity: 0.8;
}

.rating-stars {
    p {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #B45F4B;
    }

    span {
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        letter-spacing: 0.01em;
        color: #000000;
        opacity: 0.6;

        &.total {
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 19px;
            letter-spacing: 0.02em;
            color: #000000;
            opacity: 0.6;
        }
    }
}

.dropdown-wrapper {
    display: flex;
    width: 100%;
    height: fit-content;
    position: relative;

    .dropdown-selected {
        min-height: 60px !important;
        cursor: pointer;
        height: 60px;
        background: rgba(216, 205, 188, 0.2);
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 0 24px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 25px;
        color: #000000;

        &:focus {
            outline: none;
        }
    }

    .dropdown-list {
        position: absolute;
        top: 66px;
        left: 0;
        right: 0;
        z-index: 1;
        display: flex;
        flex-direction: column;
        border-radius: 15px;
        background: #fff;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);

        ul {
            padding: 5px;
            list-style: none;
            display: flex;
            flex-direction: column;

            li {
                height: 42px;
                color: #484848;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                padding: 0 9px;
                cursor: pointer;

                &:hover {
                    background: #F7F5F2;
                    border-radius: 10px;
                    color: #C67D65;
                }

            }
        }
    }
}
</style>
