<template>
    <div class="faq-wrapper">
        <h2 class="main-page-title">
            FAQS
        </h2>
        <div class="bg-white">
            <div class="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
                <div class="w-full mx-auto divide-y-2 divide-gray-200">
                    <dl class="mt-6 space-y-6 divide-y divide-gray-200">
                        <div class="pt-6">
                            <dt class="text-lg">
                                <!-- Expand/collapse question button -->
                                <button type="button" class="text-left w-full flex justify-between items-start text-gray-400" aria-controls="faq-0" aria-expanded="false">
                                    <span class="title">+ WHY DO I WANT TIPPER? WHAT’S THE BENEFIT?</span>
                                    <span class="ml-6 h-7 flex items-center">
                <!--
                  Expand/collapse icon, toggle classes based on question open state.

                  Heroicon name: outline/chevron-down

                  Open: "-rotate-180", Closed: "rotate-0"
                -->
                <svg class="rotate-0 h-6 w-6 transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
                                </button>
                            </dt>
                            <dd class="mt-2 pr-12" id="faq-0">
                                <p class="text-base text-gray-500">I don&#039;t know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.</p>
                            </dd>
                        </div>

                        <!-- More questions... -->
                    </dl>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "index",
    layout: 'home'
}
</script>

<style scoped lang="scss">
span.title {
    font-size: 20px;
    color: #B45F4B;
    font-weight: 700;
}
</style>
