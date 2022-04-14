<template>
  <div class="employer-wrapper">
    <h2>Employer Dashboard</h2>
    <div class="bg-white rounded-md mb-16 h-40">Statistics</div>
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
          <div class="inline-block min-w-full py-2 align-middle">
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
                        <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                      </div>
                      <div class="ml-4">
                        <div class="username">Lindsay Walton</div>
                      </div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div class="flex flex-row items-center stars">
                      <img src="/star.png" v-for="star in 4" :key="star" class="mr-sm" alt="">
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

    <div class="flex flex-row items-center justify-between w-full mt-16">
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
    border: 1px solid rgba(48, 48, 48, 1);
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
    color: #303030;
    margin-right: 24px;

    &.active {
      background: rgba(48, 48, 48, 0.1);
      color: rgba(48, 48, 48, 0.6);
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
  opacity: 0.4;
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
  opacity: 0.3;
}

.stars img {
  height: 14px;
  width: 14px;
  margin-right: 11px;
  opacity: 0.6;
}

tbody tr {
  background: #F6F8FA;
  border-radius: 10px;
  border: none;

  &:nth-child(2n + 1) {
    background: #fff;
  }
}
</style>
