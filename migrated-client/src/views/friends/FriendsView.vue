<template>
  <div>
    <header>
      <div class="logo">
        <i class="fa fa-arrow-left"></i>
        <h1>Sofii</h1>
      </div>
    </header>

    <div class="container">
      <FriendsAside />
      <main>
        <!-- Allows to toggle between friends and friend requests -->
        <FriendsSelector />

        <section class="friends-requests">
          <h4>Your Friend Requests</h4>
          <div v-for="request in friend_requests" :key="request.id" class="friend">
            <FriendRequest />
          </div>
        </section>

        <section class="friends">
          <h4>Your Friends</h4>
          <div
            v-for="friend in friends"
            :key="friend.friendToDisplayInfo.id"
            class="friend"
          >
            <FriendCard />
          </div>
        </section>
      </main>
    </div>
  </div>
</template>


<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import FriendsAside from '@/components/friends/friends-aside/FriendsAside.vue'
  import FriendsSelector from '@/components/friends/friends-selector/FriendsSelector.vue'
  import FriendCard from '@/components/friends/friend/FriendCard.vue'
  import FriendRequest from '@/components/friends/friend-request/FriendRequest.vue'

  export default defineComponent({
    name: 'FriendsView',
    components: {
      FriendsAside,
      FriendsSelector,
      FriendCard,
      FriendRequest
    },
    setup() {
      const content = ref("friends")

      const toggeContent = (content: string) => {
          content.value = content; 
      }
      
    }
  })
</script>

<style scope src="./FriendsView.css"></style>