<template>
  <div v-if="friends">
    <header>
      <div class="logo">
        <i class="fa fa-arrow-left"></i>
        <h1>Sofii</h1>
      </div>
    </header>

    <div class="container">
      <FriendsAside @changeOption="toggleContent" />
      <main>
        <FriendsSelector @changeOption="toggleContent" />

        <div v-if="content === 'requests'" class="friends-requests">
          <h4>Your Friend Requests</h4>
          <div v-for="request in friends.requests" :key="request.id" class="friend">
              <FriendRequest
                :request="request"
              /> 
          </div>
        </div>

        <div v-if="content === 'friends'" class="friends">
          <h4>Your Friends</h4>
          <div v-for="friend in friends.friends" :key="friend.id" class="friend">
              <FriendCard 
                :friend="friend"
              />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import FriendsAside from '@/components/friends/friends-aside/FriendsAside.vue';
import FriendsSelector from '@/components/friends/friends-selector/FriendsSelector.vue';
import { useGet } from '@/composables/useGet';
import { Friends } from '@/types/users/Friends';
import FriendCard from '@/components/friends/friend/FriendCard.vue';
import FriendRequest from '@/components/friends/friend-request/FriendRequest.vue';


export default defineComponent({
  name: 'FriendsView',
  components: {
    FriendsAside,
    FriendsSelector,
    FriendCard,
    FriendRequest
  },
  setup() {
    const content = ref('friends');
    const friends = ref<Friends>()

    const toggleContent = (newContent: string) => {
      content.value = newContent;
    };

    const getFriends = async () => {
        const data = await useGet<Friends>({
          endpoint: '/users/friends',
          withError: true,
        });
        if(data) {
          friends.value = data; 
        }
        console.log("data from friends", data);
    };

    onMounted(() => {
      getFriends();
    });

    return { content, toggleContent, friends };
  },
});
</script>

<style scoped src="./FriendsView.css"></style>
