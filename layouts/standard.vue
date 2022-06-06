<template>
    <div class="flex flex-col w-full main-layout">
        <div class="header">
            <Header></Header>

        </div>
        <nuxt></nuxt>
    </div>
</template>

<script>
import Header from "@/components/Header"

export default {
    name: "standard",
    components: {Header}
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
    @media (max-width: 599px) {
        @content;
    }
}

.main-layout {
    background: #F7F8FA;
    padding-bottom: 120px;
    min-height: 100vh;

    @include for-phone-only {
        background: #fff !important;
    }
}

.header {
    @include for-phone-only {
        display: none;
    }
}
</style>
