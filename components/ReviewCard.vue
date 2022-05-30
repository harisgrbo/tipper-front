<template>
    <div class="review-card" @click="$emit('open-review-card-modal')">
        <div class="avatar-wrapper">
            <img :src="user.user !== null ? (user.user.avatar_url !== null ? user.user.avatar_url : '/noimage.png') : '/noimage.png'" alt="">
        </div>
        <h2>{{ user.pool_tip ? user.pool.name : (user.user.type === 'employer' ? 'Entire Staff' : user.user.display_name) }}</h2>
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
        margin: 32px 0;
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
