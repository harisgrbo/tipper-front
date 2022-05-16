<template>
    <div class="review-wrapper">
        <div class="w-full flex flex-row items-center justify-start">
            <button @click="$router.go(-1)">
                <img src="/arrow-left.png" alt="">
            </button>
            <div>
                <h2>Reviews</h2>
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
            </div>
        </div>
        <div class="review-cards-wrapper">
            <ReviewCard @open-review-card-modal="handleOpenReviewCardInModal(user)" :user="user"
                        v-for="(user, index) in reviewUsers" :key="index"></ReviewCard>
        </div>
        <client-only>
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
</template>

<script>
import ReviewCard from "~/components/ReviewCard";

export default {
    name: "reviews",
    layout: 'standard',
    components: {ReviewCard},
    data() {
        return {
            reviewUsers: [],
            selectedUser: null,
        }
    },
    async created() {
        await this.fetchReviews();
    },
    methods: {
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
        async fetchReviews() {
            try {
                let res = await this.$axios.get('/users/' + this.$auth.user.id + '/tips');

                this.reviewUsers = res.data.data;

                console.log(res.data.data)
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>

<style scoped lang="scss">
.review-wrapper {
    width: 1240px;
    margin: 0 auto;
    min-height: 100vh;
    padding-bottom: 60px;

    button {
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

    .review-cards-wrapper {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-column-gap: 20px;
        margin-top: 44px;
        grid-row-gap: 20px;
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
            margin-right: 0;
            border: none !important;

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
</style>
