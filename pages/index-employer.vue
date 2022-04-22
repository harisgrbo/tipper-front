<template>
  <div class="employer-wrapper">
    <h2>Employer Dashboard</h2>
    <div class="bg-white rounded-md mb-16 h-40 statistic-img">

    </div>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="bg-white table-header p-md">
      <div class="p-6 flex w-full flex-row items-center justify-between inner">
        <div class="sm:flex-auto">
          <h4>Employees List</h4>
          <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
        </div>
        <div class="flex flex-row items-center">
          <button v-for="(option, index) in options" :key="option" :class="current_option === index ? 'active' : ''" @click="current_option = index">{{ option }}</button>
        </div>
      </div>
      <div class="mt-6 flex flex-col employees-wrap">
        <div class="-overflow-x-auto">
          <div class="inline-block min-w-full align-middle">
            <div class="overflow-hidden">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-white">
                <tr class="main">
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left sm:pl-6">List of Employees</th>
                  <th scope="col" class="px-3 py-3.5 text-left">Ratings</th>
                  <th scope="col" class="px-3 py-3.5 text-left">Reviews</th>
                </tr>
                </thead>
                <tbody class="divide-y bg-white">
                <tr v-for="i in 5" :key="i">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <div class="flex items-center">
                      <div class="flex-shrink-0">
                        <img class="h-10 w-10 rounded-full" src="/avatar.svg" alt="">
                      </div>
                      <div class="ml-4">
                        <div class="username">Lindsay Walton</div>
                      </div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div class="flex flex-row items-center stars">
                      <img src="/star.svg" v-for="star in 4" :key="star" class="mr-1" alt="">
                      <span class="username">4.5/5.00</span>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 username">Very good</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-row items-center justify-between w-full mt-16 mb-8">
      <h2 class="reviews">Reviews- last 5 reviews</h2>
      <GlobalButton placeholder="View All Reviews" width="220px" @handle-button-action="$router.push('/reviews')" bg-color="#C67D65" txt-color="#fff"></GlobalButton>
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
  components: {GlobalButton, ReviewCard},
  data() {
    return {
      options: [
          'Today',
          'This Week',
          'This Month',
          'This Year'
      ],
      current_option: 0,
    }
  }
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

    &.reviews {
      margin-bottom: 0;
    }
  }

  .review-cards-wrapper {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 20px;
  }
}


.table-header {

  .inner {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  h4 {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 33px;
    color: #1B1A1A;
  }

  span {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height */

    letter-spacing: 0.01em;

    color: #161616;

    opacity: 0.3;
  }

  button {
    height: 35px;
    border: 1px solid rgba(198, 125, 101, 0.2);
    border-radius: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 14px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    text-align: right;
    color: #C67D65;
    margin-right: 24px;

    &.active {
      background: rgba(198, 125, 101, 0.2);
      border: none;

    }

    &:last-child {
      margin-right: 0;
    }
  }
}

table thead {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.01em;
  color: #1B1A1A;
}

table img {
  height: 30px;
  width: 30px;
}

tr .username {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #1B1A1A;
  opacity: 0.6;
}

.stars img {
  height: 14px;
  width: 14px;
  margin-right: 8px;
}

tbody tr:nth-child(even) {
  background: rgba(216, 205, 188, 0.15);
  border-radius: 10px;
  border: none !important;
  box-shadow: none;
}

.statistic-img {
  background-image: url("/statistic.png");
  height: 471px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

tr.main th {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.01em;
  color: rgba(27, 26, 26, 0.6);
}
</style>
