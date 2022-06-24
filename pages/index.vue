<template>
    <div class="w-full flex flex-col index-wrapper">
        <div class="max-w-7xl mx-auto" v-if="loaded">
        </div>
        <Loader v-else></Loader>
    </div>
</template>

<script>
import Header from "@/components/Header"
import Loader from "@/components/Loader"

export default {
    components: {
        Header,
        Loader
    },
    layout: 'standard',
    data() {
        return {
            myEmployees: [],
            loaded: false,
        }
    },
    async mounted() {
        this.laded = false;
        if (this.$auth.user && this.$auth.user.type === 'employer') {
            await this.fetchMyEmployees();

            if(this.myEmployees.length) {
                await this.$router.push('/index-employer');
            } else {
                await this.$router.push('/index-employer-pending');
            }
        } else if (this.$auth.user && this.$auth.user.type === 'employee') {
            await this.$router.push('/index-employee');
        } else if (this.$auth.user && this.$auth.user.type === 'admin') {
            await this.$router.push('/admin')
        } else {
            await this.$router.push('/home')
        }

        this.loaded = true;
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
