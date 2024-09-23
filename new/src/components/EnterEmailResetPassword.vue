<template>
    
</template>

<script>
import sendPasswordResetUrl from '../services/usersService'

export default {
    name: 'EnterEmailResetPassword',
    data() {
        return {
            email: "",
            error: ""
        }
    },
    props: {

    },
    methods: {
        async sendResetPasswordCode() {
            try {
                const data = await sendPasswordResetUrl(this.email)
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