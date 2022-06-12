<template>
    <div class="notification-wrapper">
        <div class="w-full flex flex-row items-center justify-start">
            <button @click="$router.go(-1)" class="back">
                <img src="/arrow-left.svg" alt="">
            </button>
            <div>
                <h2>Invite Employees</h2>
            </div>
        </div>
        <div class="modal-content bg-white rounded-2xl p-6 mt-6">
            <h3>Employee's Email</h3>
            <p class="subtitle">Enter one email or multiple emails separated by a comma.</p>
            <InputField v-model="emails" placeholder="johndoe@gmail.com"></InputField>
            <p class="subtitle mt-4">Creating at least one pool is required (ex. Front Desk, Housekeeping, Valet, Beach).</p>
            <div class="dropdown-wrapper mt-2" v-on-clickaway="away">
                <div class="dropdown-selected" @click="showPoolList = true;">
                    {{ selectedPool !== null ? selectedPool.name : 'Choose Pool' }}
                </div>
                <div class="dropdown-list" v-show="showPoolList">
                    <ul>
                        <li v-for="(pool, index) in pools" :key="index" @click="selectPool(pool)">
                            {{ pool.name }}
                        </li>
                    </ul>
                </div>
            </div>
            <p>Select the pool the employee(s) being invited is a part of.</p>
            <div class="modal-buttons">
                <button @click="$modal.show('create-pool')">Create new Pool</button>
                <button :class="selectedPool === null ? 'disabled': ''" @click="inviteNewEmployee()" :disabled="selectedPool === null">Invite</button>
            </div>
        </div>
        <client-only>
            <modal name="create-pool"
                   width="600"
                   height="auto"
                   @before-open="beforeOpen"
                   @before-close="beforeClose">
                <div class="flex flex-col">
                    <div class="flex flex-row items-center justify-between w-full mb-6">
                        <h2>Create new Pool</h2>
                        <svg @click="$modal.hide('create-pool')" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <div class="modal-content w-full">
                        <div class="flex flex-row items-center justify-between">
                            <InputField v-model="payload.name" label="Enter Pool name"></InputField>
                        </div>
                        <GlobalButton placeholder="Create Pool" width="100%" bg-color="#B45F4B" txt-color="#fff" class="mt-6"
                                      @handle-button-action="createPool"></GlobalButton>

                    </div>
                </div>
            </modal>
        </client-only>
    </div>
</template>

<script>
import InputField from "@/components/inputs/InputField";
import {mixin as clickaway} from 'vue-clickaway';

export default {
    name: "index",
    layout: 'standard',
    mixins: [clickaway],
    components: {InputField},
    data() {
        return {
            emails: '',
            pools: [],
            showPoolList: false,
            selectedPool: null,
            payload: {
                name: ''
            }
        }
    },
    async created() {
        await this.fetchPools();
    },
    methods: {
        async createPool() {
            try {
                let res = await this.$axios.post('/pools', this.payload);

                this.pools.push(res.data.data)

                this.payload.name = '';

                this.$modal.hide('create-pool')
            } catch (e) {
                console.log(e)
            }
        },
        away() {
            this.showPoolList = false;
        },
        beforeOpen() {
            document.body.style.overflow = 'hidden';
        },
        beforeClose() {
            document.body.style.overflow = 'auto';
        },
        selectPool(p) {
            this.selectedPool = p;
            this.showPoolList = false;
        },
        async inviteNewEmployee() {
            let new_arr = this.emails.split(',');

            for (let i = 0; i < new_arr.length; i++) {
                let item = new_arr[i];
                try {
                    let res = await this.$axios.post('/email/invite', {
                        email: item,
                        pool_id: this.selectedPool.id
                    });

                    this.$toast.open({
                        message: 'Invite successfully sent to ' + item,
                        type: 'success',
                    });

                    this.emails = ''
                } catch (e) {
                    this.$toast.open({
                        message: e.response.data.data.message,
                        type: 'error',
                    });

                }
            }

        },
        async fetchPools() {
            try {
                let res = await this.$axios.get('/pools');

                this.pools = res.data.data;
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
        opacity: 0.3;
    }

    .notification-list-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 44px;
    }
}

.settings-button {
    height: 54px;
    border: 1.5px solid rgba(198, 125, 101, 0.3);
    box-sizing: border-box;
    border-radius: 15px;
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 24px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.40);
    flex: none;
    order: 0;
    flex-grow: 0;
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
        margin-top: 23px;

        &.subtitle {
            font-style: normal;
            font-weight: 300;
            font-size: 16px;
            line-height: 28px;
            letter-spacing: 0.03em;
            color: #161616;
            opacity: 0.6;
            margin-bottom: 0px;
        }
    }

    h3 {
        font-style: normal;
        font-weight: 500;
        font-size: 22px;
        line-height: 30px;
        color: #1B1A1A;
        opacity: 0.8;
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

        &.disabled {
            background: #f1f1f1;
            cursor: not-allowed;
            color: #969696;
        }
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

.feha {
    color: red !important;;
}
</style>
