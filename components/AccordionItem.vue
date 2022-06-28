<template>
    <li class="accordion__item">
        <div
            class="accordion__trigger"
            :class="{'accordion__trigger_active': visible}"
            @click="open">

            <!-- This slot will handle the title/header of the accordion and is the part you click on -->
            <svg v-show="!visible" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <svg v-show="visible" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
            </svg>
            <slot name="accordion-trigger"></slot>
        </div>

        <transition
            name="accordion"
            @enter="start"
            @after-enter="end"
            @before-leave="start"
            @after-leave="end">

            <div class="accordion__content"
                 v-show="visible">
                <ul>
                    <!-- This slot will handle all the content that is passed to the accordion -->
                    <slot name="accordion-content"></slot>
                </ul>
            </div>
        </transition>
    </li>
</template>


<script>
export default {
    props: {},
    inject: ["Accordion"],
    data() {
        return {
            index: null
        };
    },
    computed: {
        visible() {
            return this.index == this.Accordion.active;
        }
    },
    methods: {
        open() {
            if (this.visible) {
                this.Accordion.active = null;
            } else {
                this.Accordion.active = this.index;
            }
        },
        start(el) {
            el.style.height = el.scrollHeight + "px";
        },
        end(el) {
            el.style.height = "";
        }
    },
    created() {
        this.index = this.Accordion.count++;
    }
};
</script>

<style lang="scss" scoped>
.accordion__item {
    cursor: pointer;
    padding: 20px 20px 20px 0px;
    position: relative;
}

.accordion__trigger {
    display: flex;
    justify-content: flex-start;
}

.accordion-enter-active,
.accordion-leave-active {
    will-change: height, opacity;
    transition: height 0.3s ease, opacity 0.3s ease;
    overflow: hidden;
}

.accordion-enter,
.accordion-leave-to {
    height: 0 !important;
    opacity: 0;
}

.accordion__trigger {
    color: #929271;
    font-weight: bold;
    font-size: 20px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
}
.accordion__content {
    font-size: 18px;
    color: #000;
    margin-top: 24px;
    padding-left: 40px;
}
</style>
