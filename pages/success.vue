<template>
  <div class="w-full h-full flex items-center justify-center h-screen bg-gray-100">
    <div class="bg-white shadow-md w-1/2 mx-auto rounded-md">
      <div class="text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div class="flex flex-row items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            transaction completed successfully
          </h2>
        </div>
        <div class="mt-8 flex justify-center">
          <div class="inline-flex rounded-md shadow">
            <nuxt-link to="/" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"> Back on Homepage </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "success",
  layout: 'standard'

}
</script>

<style scoped>

</style>
