<template>
  <div class="employer-wrapper">
    <h2>Employee Dashboard</h2>
    <div class="mb-16 grid grid-cols-3 gap-4">
      <div class="bg-white rounded-md p-md h-40">block 1</div>
      <div class="bg-white rounded-md p-md h-40">block 2</div>
      <div class="bg-white rounded-md p-md h-40">block 3</div>
    </div>
    <div class="flex flex-row items-center justify-between w-full">
      <h2>Employee Status</h2>
    </div>
    <div class="review-cards-wrapper">
      table goes here
    </div>
  </div>
</template>

<script>
import GlobalButton from "~/components/GlobalButton";
import ReviewCard from "~/components/ReviewCard";
export default {
  name: "index-employee",
  layout: 'standard',
  components: {GlobalButton, ReviewCard}
}
</script>

<style scoped lang="scss">
.employer-wrapper {
  width: 1240px;
  margin: 0 auto;
  min-height: 100vh;

  h2 {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 45px;
    color: #1B1A1A;
    margin-bottom: 42px;
  }

  .review-cards-wrapper {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 20px;
  }
}
</style>
