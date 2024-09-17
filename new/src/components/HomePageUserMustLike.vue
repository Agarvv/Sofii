<template>
    <div>
        
    </div>
</template>

<script>
import {
followUser
} from('../services/usersService')
    export default {
        name: 'HomePageUserMustLike',
        props: {
            user: {}
        },
        data() {
            return {
               error: "",
               isFollowing: this.user.isFollowing
            }
        },
        methods: {
          async goToPage(route) {
             this.$router.push(route)
          },
          async followUser() {
            try {
               const data = await followUser(this.user)
               console.log('All Worked!', data)
               this.isFollowing = true
            } catch(e) {
                this.error = 'Ooops, Something Went Wrong On The Server...'
            }
          }
        }
    }
</script>

<style scoped>

</style>