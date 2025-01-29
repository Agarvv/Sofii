<template>
  <div v-if="data">
    <ProfileHeader :profile="data.profile" :isSelf="isSelf" />

    <div class="responsive-user-details">
      <ProfileDetail 
        :detailValue="data.profile.bio || 'Not Provided'" 
        detail="bio"
        :isSelf="isSelf"
      />
      
      <div class="r-info">
        <ProfileDetail 
          :detailValue="data.profile.ubication || 'Ubication Not Provided'" 
          icon="fa fa-map-marker-alt" 
          detail="ubication"
          :isSelf="isSelf"
        />
        <ProfileDetail 
          :detailValue="data.profile.native_city || 'Native City Not Provided'" 
          icon="fa fa-globe" 
          detail="native_city"
          :isSelf="isSelf"
        />
        <ProfileDetail 
          :detailValue="data.profile.gender || 'Gender Not Provided'" 
          icon="fas fa-venus-mars" 
          detail="gender"
          :isSelf="isSelf"
        />
        <ProfileDetail 
          :detailValue="data.profile.job || 'Job Not Provided'" 
          icon="fas fa-briefcase" 
          detail="job"
          :isSelf="isSelf"
        />
        <ProfileDetail 
          :detailValue="data.profile.civil_status || 'Civil Status Not Provided'" 
          icon="fa fa-heart" 
          detail="civil_status"
          :isSelf="isSelf"
        />
      </div>
    </div>

    <div class="container">
      <aside>
        <div class="user-info">
          <div class="info">
            <div class="info-header">
              <h4>Info</h4>
            </div>
            <div class="user-i">
              <ProfileDetail 
                :detailValue="data.profile.bio || 'Bio Not Provided'" 
                detail="bio"
                :isSelf="isSelf"
              />
              <ProfileDetail 
                :detailValue="data.profile.ubication || 'Ubication Not Provided'" 
                icon="fas fa-map-marker-alt" 
                detail="ubication"
                :isSelf="isSelf"
              />
              <ProfileDetail 
                :detailValue="data.profile.native_city || 'Native City Not Provided'" 
                icon="fas fa-globe"
                detail="native_city"
                :isSelf="isSelf"
              />
              <ProfileDetail 
                :detailValue="data.profile.gender || 'Gender Not Provided'" 
                icon="fas fa-venus-mars" 
                detail="gender"
                :isSelf="isSelf"
              />
              <ProfileDetail 
                :detailValue="data.profile.job || 'Job Not Provided'" 
                icon="fas fa-briefcase" 
                detail="job"
                :isSelf="isSelf"
              />
              <ProfileDetail 
                :detailValue="data.profile.civil_status || 'Civil Status Not Provided'" 
                icon="fa fa-heart" 
                detail="civil_status"
                :isSelf="isSelf"
              />
            </div>
          </div>
        </div>
      </aside>

      <main>
        <div v-if="data.profile.posts.length > 0" class="posts">
          <div v-for="post in data.profile.posts" :key="post.id" class="post">
            <PostCard 
              :post="post" 
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>


<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import ProfileHeader from '@/components/profile/profile-header/ProfileHeader.vue';
  import { useGet } from '@/composables/useGet';
  import { useRoute } from 'vue-router';
  import { Profile } from '@/types/profile/Profile';
  import ProfileDetail from '@/components/profile/profile-detail/ProfileDetail.vue'
  import PostCard from '@/shared/post/PostCard.vue'

  export default defineComponent({
    name: 'ProfileView',
    components: {
        ProfileDetail,
        PostCard,
        ProfileHeader
    }, 
    setup() {
      const route = useRoute(); 
      const isSelf = ref<boolean>(false); 
      const data = ref<Profile | null>(null);
      const userId = (localStorage.getItem("userId"))
      
      
      const getProfile = async () => {
        const id = route.params.id as string; 
        if(id == "s" || id == userId) {
          isSelf.value = true; 
          console.log("SELF");
        }

        const fetchedData = await useGet<Profile>({
           endpoint: `/profile/${id}`,
           withError: true 
        });

        data.value = fetchedData; 

        console.log('profile data', fetchedData);
      };

      onMounted(() => {
        getProfile();
      });

      return {
        data,
        getProfile,
        isSelf 
      };
    },
  });
</script>

<style src="./ProfileView.css"></style>