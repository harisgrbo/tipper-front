<template>
    <div class="loader-wrapper">
        <img src="/loader.svg" alt="">
    </div>
</template>

<script>
export default {
    name: "Loader"
}
</script>

<style scoped lang="scss">
    .loader-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: calc(100vh - 100px);
        width: 100%;

        img {
            height: 60px;
            width: 60px;
        }
    }
</style>
