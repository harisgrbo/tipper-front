<template>
    <div class="review-card" v-show="user.description && user.description.length">
        <div class="avatar-wrapper" v-if="user.user !== null">
            <img :src="user.user !== null ? (user.user.avatar_url !== null ? user.user.avatar_url : '/noimage.png') : '/noimage.png'" alt="">
        </div>
        <div v-else class="avatar-wrapper svg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        </div>
        <h2>{{ user.pool_tip ? user.pool.name : (user.user.type === 'employer' ? 'Entire Staff' : user.user.display_name) }}</h2>
        <h4 class="text-gray-500 text-sm">{{ user.user !== null ? user.user.department.name : '' }}</h4>
        <h3>"{{ user.description }}"</h3>
        <div class="stars">
            <star-rating :star-size="18" :increment="1" :read-only="true" inactive-color="#F0EBE4"
                         active-color="#C67D65" v-model="user.rating"></star-rating>
        </div>
    </div>
</template>

<script>
export default {
    name: "ReviewCard",
    props: ['user'],
    created() {
        console.log(this.user)
    }
}
</script>

<style scoped lang="scss">
.review-card {
    width: 235px;
    height: 308px;
    padding: 32px 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: #fff;
    border: 1px solid #DCC5C0;
    border-radius: 15px;

    &:hover {
        cursor: pointer;
    }

    .avatar-wrapper {
        height: 60px;
        width: 60px;
        min-height: 60px;
        border-radius: 30px;
        background: #f1f1f1;
        overflow: hidden;

        &.svg {
            display: flex;
            align-items: center;
            justify-content: center !important;
        }

        img {
            max-width: 100%;
            height: 60px;
            width: 60px;
            object-fit: contain;
        }
    }

    h2 {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 25px;
        color: #000000;
        margin-top: 16px;
        margin-bottom: 6px;
    }

    span {
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: #000000;
        opacity: 0.8;
    }

    h3 {
        font-style: italic;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: 0.03em;
        color: #000000;
        opacity: 0.8;
        margin: 16px 0;
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

}
</style>
