<template>
  <div class="employer-wrapper">
    <h2>Employee Dashboard</h2>
    <div class="mb-16 grid grid-cols-3 gap-4" v-if="balance !== null">
      <div class="block">
        <h3>Balance available for transfer</h3>
        <div class="flex flex-row items-center justify-between w-full">
          <h2>{{ '$' + this.balance.payout[0].amount / 100 + ' ' }}</h2>
          <h4>(${{ this.balance.balance }})</h4>
        </div>
        <span>It might take up to 7 days for your balance to be available for payouts</span>
        <button>
          Transfer now
        </button>
      </div>
      <div class="block">
        <h3>Today Revenue</h3>
        <h2>{{ '$' + this.balance.today }}</h2>
        <span>{{ this.balance.tips }} tips</span>
        <small>Lorem ipsum dolor sit amet</small>
      </div>
      <div class="block">
        <h3>Total Amount earned </h3>
        <h2>{{ '$' + this.balance.total }}</h2>
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
          <button class="mutation" @click="$modal.show('mutation')">
            Mutation
            <img src="/mutation.svg" alt="">
          </button>
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
                  <tr v-for="(tip, index) in tips" :key="index">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                      <div class="flex items-center">
                        <div class="flex-shrink-0">
                          <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                        </div>
                        <div class="ml-4">
                          <div class="username">{{ tip.name || '-' }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 username">Active</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div class="flex flex-row items-center stars">
                        <star-rating :star-size="15" :increment="1" :inline="true" read-only="true" inactive-color="#F0EBE4" :show-rating="true" active-color="#C67D65" v-model="tip.rating"></star-rating>
                      </div>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 username">${{ tip.amount }}</td>
                    <td class="whitespace-nowrap px-3 py-4 username">{{ $moment(tip.completed_at).format('DD/MM/YYYY') }}</td>

                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <modal name="mutation"
             width="910"
             height="auto"
             @before-open="beforeOpen"
             @before-close="beforeClose">>
        <div class="flex flex-col">
          <div class="modal-header">
            <div>
              <h1>Activity report mutation</h1>
              <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
            </div>
            <button @click="$modal.hide('mutation')">
              <img src="/close.svg" alt="">
            </button>
          </div>
          <div class="modal-content">
            <h3>Mutation period</h3>
            <vc-date-picker
                :disabled-dates="disabledDates"
                :min-date="new Date()"
                v-model="range"
                :masks="masks"
                locale="sr-Latn-RS"
                is-range
                is-inline
                popover.visibility="visible"
                :popover="{ visibility: 'click' }"
            >
              <template v-slot="{ inputValue, inputEvents, isDragging }">
                <div class="flex flex-row justify-between items-center">
                  <div class="flex flex-col input-date-wrapper">
                    <label class="text-xs text-gray-400 font-medium mb-2 uppercase">from date</label>
                    <div class="relative flex-grow w-full">
                      <input
                          class="flex-grow pr-2 py-1 w-full date-input"
                          :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                          :value="inputValue.start"
                          v-on="inputEvents.start"
                      />
                    </div>
                  </div>

                  <span class="flex-shrink-0 m-2 divider">
                    <img src="/devider.svg" alt="">
                  </span>
                  <div class="flex flex-col input-date-wrapper">
                    <label class="text-xs text-gray-400 font-medium mb-2 uppercase">Till date</label>
                    <div class="relative flex-grow w-full">
                      <input
                          class="flex-grow pr-2 py-1 w-full date-input"
                          :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                          :value="inputValue.end"
                          v-on="inputEvents.end"
                      />
                    </div>
                  </div>
                </div>
              </template>
            </vc-date-picker>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Justo porta ut amet ac vel at sed vulputate pellentesque. Vel mi gravida sodales diam.</p>
            <div class="modal-buttons">
              <button>Download in excel form</button>
              <button>Download in pdf format</button>
            </div>
          </div>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import GlobalButton from "~/components/GlobalButton";
import ReviewCard from "~/components/ReviewCard";
export default {
  name: "index-employee",
  layout: 'standard',
  components: {GlobalButton, ReviewCard},
  data() {
    return {
      range: {
        start: new Date(),
        end: new Date(),
      },
      masks: {
        input: 'DD-MM-YYYY',
      },
      balance: null,
      tips: []
    }
  },
  async created() {
    await this.fetchUserData();
    await this.fetchUsersWhoTippedMe();
  },
  methods: {
    async fetchUserData() {
      try {
        let res = await this.$axios.get('/balance')

        this.balance = res.data.data;

        console.log(this.balance)
      } catch(e) {
        console.log(e)
      }
    },
    async fetchUsersWhoTippedMe() {
      try {
        let res = await this.$axios.get('/users/' + this.$auth.user.id + '/tips')

        this.tips = res.data.data;

        console.log(this.tips)
      } catch(e) {
        console.log(e)
      }
    },
    beforeOpen() {
      document.body.style.overflow = 'hidden';
    },
    beforeClose() {
      document.body.style.overflow = 'auto';
    }
  }
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
    justify-content: flex-start;
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

    h4 {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 30px;
      line-height: 82px;
      /* identical to box height */

      letter-spacing: 0.01em;

      color: #000;
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
        min-height: 40px;
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

.mutation {
  height: 35px;
  background: #C67D65;
  border-radius: 90px;
  width: 120px;
  border: none !important;
  color: #fff !important;

  img {
    margin-left: 10px;
  }
}

.modal-content {
  p {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    letter-spacing: 0.03em;
    color: #161616;
    opacity: 0.3;
    margin-top: 23px;
  }
  h3 {
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 30px;
    color: #1B1A1A;
    opacity: 0.8;
    margin-top: 46px;
    margin-bottom: 23px;
  }

  .input-date-wrapper {
    background: rgba(216, 205, 188, 0.20);
    border-radius: 14px;
    padding: 8px 12px;
    width: 100%;

    label {
      font-style: normal;
      font-weight: 400;
      font-size: 10px;
      line-height: 14px;
      /* identical to box height */


      color: #000000;

      opacity: 0.4;
    }

    input {
      background: transparent;

      &:focus {
        outline: none
      }
    }
  }

  .divider {
    margin: 0 40px;
  }
}

.modal-buttons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-top: 56px;
  button {
    background: rgba(198, 125, 101, 0.1);
    border-radius: 15px;
    height: 54px;
    width: 270px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #C67D65;

    &:first-child {
      margin-right: 14px;
    }
  }
}
</style>
