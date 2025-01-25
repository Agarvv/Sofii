<template>
  <div>
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

        <section v-if="content === 'requests'" class="friends-requests">
          <h4>Your Friend Requests</h4>
          <!-- <div v-for="request in friend_requests" :key="request.id" class="friend">
            <FriendRequest />
          </div> -->
        </section>

        <section v-if="content === 'friends'" class="friends">
          <h4>Your Friends</h4>
         <!--  <div
            v-for="friend in friends"
            :key="friend.friendToDisplayInfo.id"
            class="friend"
          >
            <FriendCard />
          </div>  --> 
        </section>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import FriendsAside from '@/components/friends/friends-aside/FriendsAside.vue';
import FriendsSelector from '@/components/friends/friends-selector/FriendsSelector.vue';
import FriendCard from '@/components/friends/friend/FriendCard.vue';
import FriendRequest from '@/components/friends/friend-request/FriendRequest.vue';
import { useGet } from '@/composables/useGet';
import { Friends } from '@/types/users/Friends';


export default defineComponent({
  name: 'FriendsView',
  components: {
    FriendsAside,
    FriendsSelector,
    FriendCard,
    FriendRequest,
  },
  setup() {
    const content = ref('friends');
    const friend_requests = ref([]);
    const friends = ref([]);

    const toggleContent = (newContent: string) => {
      content.value = newContent;
    };

    const getFriends = async () => {
        const data = await useGet<Friends>({
          endpoint: '/users/friends',
          withError: true,
        });

        console.log("data from friends", data);
    };

    onMounted(() => {
      getFriends();
    });

    return { content, toggleContent, friend_requests, friends };
  },
});
</script>

<style scoped src="./FriendsView.css"></style>
