<template>
  <div class="database-wrapper">
    <div class="flex flex-row items-center justify-between w-full">
      <h2>Pools</h2>
      <div class="p-4 rounded-lg flex items-center justify-center bg-white cursor-pointer" @click="showPoolCreating = !showPoolCreating">{{ showPoolCreating ? 'Hide pool creating' : 'Create new pool'}}</div>
    </div>
    <div v-show="showPoolCreating" class="border-b border-gray-500 pb-6 mb-6">
      <div class="flex flex-row items-center justify-between">
        <InputField class="mr-4" v-model="payload.name" label="Enter Pool name"></InputField>
        <InputField class="ml-4" v-model="payload.description" label="Enter Pool description"></InputField>
      </div>
      <GlobalButton placeholder="Create Pool" width="200px" bg-color="#fff" class="mt-4" @handle-button-action="createPool"></GlobalButton>

    </div>
    <div class="review-cards-wrapper">
      <div class="bg-white table-header w-full p-md" v-if="pools.length">
        <div class="flex flex-col employees-wrap">
          <div class="-overflow-x-auto">
            <div class="inline-block min-w-full py-2 align-middle">
              <div class="overflow-hidden bg-white" v-for="(pool, index) in pools">
                <div class="w-full flex items-center justify-between">
                  <h2>{{ pool.name }}</h2>
                  <GlobalButton placeholder="Add user to pool" width="200px" bg-color="#fff" class="mt-4" @handle-button-action="showAddUserToPoolModal(pool)"></GlobalButton>
                  <GlobalButton placeholder="TIP POOL" width="200px" bg-color="#ddd" class="mt-4" @handle-button-action="tipPool(pool)"></GlobalButton>
                </div>
                <table class="min-w-full divide-y divide-gray-300">
                  <thead class="bg-white">
                  <tr class="main py-3">
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left sm:pl-6">Name</th>
                    <th scope="col" class="px-3 py-3.5 text-left">Job Title</th>
                    <th scope="col" class="px-3 py-3.5 text-left">Number of stars</th>
                    <th scope="col" class="px-3 py-3.5 text-left">Total Amount</th>
                    <th scope="col" class="px-3 py-3.5 text-left">Date</th>
                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0">
                      <span class="sr-only">Remove</span>
                    </th>
                  </tr>
                  </thead>
                  <tbody class="divide-y bg-white">
                  <tr v-for="(user, index) in pool.users" :key="index">
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
                    <td class="whitespace-nowrap px-3 py-4 username">Staff</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div class="flex flex-row items-center stars">
                        <img src="/star.png" v-for="star in 4" :key="star" class="mr-sm" alt="">
                        <span class="username">4.5/5.00</span>
                      </div>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 username">$40.00</td>
                    <td class="whitespace-nowrap px-3 py-4 username">02/05/2022</td>
                    <td class="whitespace-nowrap px-3 py-4 username" @click="removeUserFromPool(user, pool)">
                      <img src="/trash.svg" alt="">
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showPoolModal" class="add-user-modal">
      <div class="main-modal">
        <div class="flex flex-row items-center justify-between">
          <span>Add users to {{ selectedPool.name }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" @click="selectedPool = null; showPoolModal = false">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <ul>
          <li v-for="(user, i) in users" @click="addUserToPool(user)">
            {{ user }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import GlobalButton from "~/components/GlobalButton";
import ReviewCard from "~/components/ReviewCard";
import InputField from "@/components/inputs/InputField";
export default {
  name: "pools",
  layout: 'standard',
  components: {InputField, GlobalButton, ReviewCard},
  data() {
    return {
      users: [],
      showPoolCreating: false,
      showPoolModal: false,
      pools: [],
      payload: {
        name: '',
        description: ''
      },
      selectedPool: null
    }
  },
  async created() {
    await this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        let res = await this.$axios.get('/users');

        this.users = res.data.data;
      } catch(e) {
        console.log(e)
      }
    },
    async createPool() {
      try {
        let res = await this.$axios.post('/groups', this.payload);

        this.pools.push(res.data.data)
      } catch(e) {
        console.log(e)
      }
    },
    async addUserToPool(u) {
      try {
        let res = await this.$axios.post(`/pools/${this.selectedPool.id}/users/${u.id}`);

        this.selectedPool = null;
        this.showPoolModal = false;
      } catch(e) {
        console.log(e)
      }
    },
    showAddUserToPoolModal(p) {
      this.selectedPool = p;
      this.showPoolModal = true;
    },
    async tipPool(p) {
      try {
        let res = await this.$axios.post(`/pools/${p.id}/tips`);

        console.log(res.data.data)
      } catch(e) {
        console.log(e)
      }
    },
    async removeUserFromPool(u, p) {
      try {
        await this.$axios.delete(`/pools/${p.id}/users/${u.id}`);

      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.database-wrapper {
  width: 1240px;
  margin: 0 auto;
  min-height: 100vh;
  padding-bottom: 60px;

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

::v-deep input {
  background: #fff;
}

.add-user-modal {
  position: fixed;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.34);
  display: flex;
  align-items: center;
  justify-content: center;

  .main-modal {
    height: fit-content;
    width: 500px;
    border-radius: 16px;
    padding: 24px;
    background: #fff;
  }
}
</style>
