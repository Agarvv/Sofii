<template>
    
</template>

<script>
import changeUserPassword from '../services/usersService'

export default {
    name: 'ResetPassword',
    data() {
        return {
            newPassword: "",
            error: ""
        }
    },
    props: {

    },
    methods: {
        async changePassword() {
             try {
                const data = await changeUserPassword(this.password, this.$route.params.reset_token)
                console.log('all ok', data)
             } catch (e) {
                this.error = e
             }
        }
    }
}
</script>

<style scoped>

</style>