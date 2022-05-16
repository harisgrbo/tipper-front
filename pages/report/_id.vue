<template>
    <div class="notification-wrapper">
        <div class="w-full flex flex-row items-center justify-start">
            <button @click="$router.go(-1)" class="back">
                <img src="/arrow-left.svg" alt="">
            </button>
            <div>
                <h2>Export Tip Report</h2>
                <span class="subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
            </div>
        </div>
        <div class="notification-list-wrapper">
            <div class="flex flex-col bg-white p-6 rounded-2xl">
                <div class="modal-header">
                    <div class="mb-7">
                        <h1>Report Period</h1>
                    </div>
                </div>
                <div class="modal-content">
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
                                    <label class="text-xs text-gray-400 font-medium mb-2">from date</label>
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
                                    <label class="text-xs text-gray-600 font-medium mb-2">Till date</label>
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
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Justo porta ut amet ac vel at sed
                        vulputate pellentesque. Vel mi gravida sodales diam.</p>
                    <div class="modal-buttons">
                        <button>Download in excel form</button>
                        <button>Download in pdf format</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "_id",
    layout: 'standard',
    data() {
        return {
            range: {
                start: new Date(),
                end: new Date(),
            },
            masks: {
                input: 'DD/MM/YYYY',
            },
            balance: null,
            tips: []
        }
    },
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
        background: rgba(216, 205, 188, 0.32);
        border-radius: 14px;
        padding: 8px 12px;
        width: 100%;

        label {
            font-style: normal;
            font-weight: 400;
            font-size: 10px;
            line-height: 14px;
            color: #000000;
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
</style>
