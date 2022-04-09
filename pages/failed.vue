<template>
  <div class="w-full h-full flex items-center justify-center h-screen bg-gray-100">
    <div class="shadow-md bg-white w-1/2 mx-auto rounded-md">
      <div class="text-center flex flex-col items-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 class="text-3xl font-extrabold tracking-tight text-red-600 sm:text-4xl">
          <span class="block mb-2">Transaction failed</span>
          <span class="block">Please try again.</span>
        </h2>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mt-3" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
        </svg>
        <div class="mt-8 flex justify-center">
          <div class="inline-flex rounded-md shadow">
            <a href="#" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"> Get started </a>
          </div>
          <div class="ml-3 inline-flex">
            <a href="#" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"> Learn more </a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "failed",
  layout: 'standard'
}
</script>

<style scoped>

</style>
