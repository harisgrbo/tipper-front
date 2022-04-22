<template>
  <div class="employer-wrapper">
    <h2>Employee Dashboard</h2>
    <div class="mb-16 grid grid-cols-3 gap-4">
      <div class="block">
        <h3>Current balance</h3>
        <h2>$5345.20</h2>
        <span>Amount Available for Transfer</span>
        <button>
          Transfer now
        </button>
      </div>
      <div class="block">
        <h3>Today Revenue</h3>
        <h2>$100.00</h2>
        <span>28 tips</span>
        <small>Lorem ipsum dolor sit amet</small>
      </div>
      <div class="block">
        <h3>Total Amount earned </h3>
        <h2>$8735.70</h2>
        <span>Total tips Amount</span>
        <small>Lorem ipsum dolor sit amet</small>
      </div>
    </div>
    <div class="flex flex-row items-center justify-between w-full">
      <h2>Employee Status</h2>
    </div>
    <div class="review-cards-wrapper">
      <div class="bg-white table-header w-full p-md">
        <div class="p-6 flex w-full flex-row items-center justify-between inner">
          <div class="sm:flex-auto">
            <h4>Recent Activity</h4>
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
          </div>
        </div>
        <div class="mt-6 flex flex-col employees-wrap">
          <div class="-overflow-x-auto">
            <div class="inline-block min-w-full py-2 align-middle">
              <div class="overflow-hidden">
                <table class="min-w-full divide-y divide-gray-300">
                  <thead class="bg-white">
                  <tr class="main">
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left sm:pl-6">Name</th>
                    <th scope="col" class="px-3 py-3.5 text-left">Activity</th>
                    <th scope="col" class="px-3 py-3.5 text-left">Number of stars</th>
                    <th scope="col" class="px-3 py-3.5 text-left">Total Amount</th>
                    <th scope="col" class="px-3 py-3.5 text-left">Date</th>
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
                    <td class="whitespace-nowrap px-3 py-4 username">Active</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div class="flex flex-row items-center stars">
                        <img src="/star.svg" v-for="star in 4" :key="star" class="mr-sm" alt="">
                        <span class="username">4.5/5.00</span>
                      </div>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 username">$40.00</td>
                    <td class="whitespace-nowrap px-3 py-4 username">02/05/2022</td>

                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

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
  padding-bottom: 60px;

  .block {
    padding: 41px;
    background: #fff;
    height: 280px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border-radius: 14px;
    background-image: url("/pattern.svg");
    background-repeat: no-repeat;
    background-size: cover;

    h3 {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 300;
      font-size: 18px;
      line-height: 27px;
      /* identical to box height */

      letter-spacing: 0.01em;

      color: #000000;

      opacity: 0.6;
    }

    h2 {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 55px;
      line-height: 82px;
      /* identical to box height */

      letter-spacing: 0.01em;

      color: #C67D65;
      margin-bottom: 0;
      opacity: 0.8;
    }

    span {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 300;
      font-size: 16px;
      line-height: 24px;
      /* identical to box height */

      letter-spacing: 0.01em;

      color: #161616;

      margin-bottom: 22px;
    }

    small {
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

    &:first-child {
      background-color: rgba(198, 125, 101, 0.35);
      h2 {
        color: #000;
      }

      button {
        height: 40px;
        background: #FFFFFF;
        border-radius: 10px;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        padding: 0 16px;
        line-height: 24px;
        /* identical to box height */


        color: #C67D65;
      }
    }
  }

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
    display: flex;
    width: 100%;
    border-radius: 14px;
    overflow: hidden;
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
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.01em;
  color: rgba(27, 26, 26, 0.6);
}

table img {
  height: 30px;
  width: 30px;
}

tr .username {
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

tbody tr {
  background: #F6F8FA;
  border-radius: 10px;
  border: none;

  &:nth-child(2n + 1) {
    background: #fff;
  }
}

tr.main th {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.01em;
  color: rgba(27, 26, 26, 0.6);
}

tbody tr:nth-child(even) {
  background: rgba(216, 205, 188, 0.15);
  border-radius: 10px;
  border: none !important;
  box-shadow: none;
}
</style>
