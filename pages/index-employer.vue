<template>
  <div class="employer-wrapper">
    <h2>Employer Dashboard</h2>
    <div class="bg-white rounded-md p-md mb-16 h-40">Statistics</div>
    <div class="flex flex-row items-center justify-between w-full">
      <h2>Reviews- last 5 reviews</h2>
      <GlobalButton placeholder="View All Reviews" bg-color="rgba(196, 196, 196)" width="220px" @handle-button-action="$router.push('/reviews')"></GlobalButton>
    </div>
    <div class="review-cards-wrapper">
      <ReviewCard v-for="i in 5" :key="i"></ReviewCard>
    </div>
  </div>
</template>

<script>
import GlobalButton from "~/components/GlobalButton";
import ReviewCard from "~/components/ReviewCard";
export default {
  name: "index-employer",
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
