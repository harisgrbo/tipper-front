<template>
    <div>test</div>
</template>

<script>
export default {
    name: "stripe-register",
    data() {
        return {
            state: '',
            code: ''
        }
    },
    async created() {
        this.code = this.$route.query.code;
        this.state = this.$route.query.state;

        if(this.code.length && this.state.length) {
            await this.sendRequest();
        }
    },
    methods: {
        async sendRequest() {
            try {
                let res = await this.$axios.post('/employee/register', {
                    code: this.code,
                    uuid: this.state
                })

                console.log(res, 'response loggg')
            } catch(e) {
                console.log(e)
            }
        }
    }

}
</script>

<style scoped>

</style>
