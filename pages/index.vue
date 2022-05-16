<template>
    <div class="w-full flex flex-col">
        <div class="max-w-7xl mx-auto">
            index
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header"

export default {
    components: {
        Header
    },
    layout: 'standard',
    data() {
        return {
            myEmployees: []
        }
    },
    async mounted() {
        console.log(this.$router, 'router')
        if (this.$auth.user && this.$auth.user.type === 'employer') {
            await this.fetchMyEmployees();

            if(this.myEmployees.length) {
                await this.$router.push('/index-employer');
            } else {
                await this.$router.push('/index-employer-pending');
            }
        } else if (this.$auth.user && this.$auth.user.type === 'employee') {
            await this.$router.push('/index-employee');
        } else {
            await this.$router.push('/')
        }
    },
    methods: {
        async fetchMyEmployees() {
            try {
                let res = await this.$axios.get('/my/employees');

                this.myEmployees = res.data.data;

            } catch (e) {
                console.log(e)
            }
        },
    }
}
</script>
