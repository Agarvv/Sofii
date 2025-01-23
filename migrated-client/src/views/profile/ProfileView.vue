<template>
  <div v-if="data">
    <ProfileHeader :profile="data.profile" />

    <div class="responsive-user-details">
      <ProfileDetail 
        :detail="data.profile.bio || 'Not Provided'" 
      />
      
      <div class="r-info">
        <ProfileDetail 
          :detail="data.profile.ubication || 'Ubication Not Provided'" 
          icon="fa fa-map-marker-alt" 
          iconColor="red" 
        />
        <ProfileDetail 
          :detail="data.profile.native_city || 'Native City Not Provided'" 
          icon="fa fa-globe" 
          iconColor="black" 
        />
        <ProfileDetail 
          :detail="data.profile.gender || 'Gender Not Provided'" 
          icon="fas fa-venus-mars" 
          iconColor="hotpink" 
        />
        <ProfileDetail 
          :detail="data.profile.job || 'Job Not Provided'" 
          icon="fas fa-briefcase" 
          iconColor="gray" 
        />
        <ProfileDetail 
          :detail="data.profile.civil_status || 'Civil Status Not Provided'" 
          icon="fa fa-heart" 
          iconColor="red" 
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
                :detail="data.profile.bio || 'Bio Not Provided'" 
              />
              <ProfileDetail 
                :detail="data.profile.ubication || 'Ubication Not Provided'" 
                icon="fas fa-map-marker-alt" 
                iconColor="red" 
              />
              <ProfileDetail 
                :detail="data.profile.native_city || 'Native City Not Provided'" 
                icon="fas fa-globe" 
                iconColor="black" 
              />
              <ProfileDetail 
                :detail="data.profile.gender || 'Gender Not Provided'" 
                icon="fas fa-venus-mars" 
                iconColor="hotpink" 
              />
              <ProfileDetail 
                :detail="data.profile.job || 'Job Not Provided'" 
                icon="fas fa-briefcase" 
                iconColor="gray" 
              />
              <ProfileDetail 
                :detail="data.profile.civil_status || 'Civil Status Not Provided'" 
                icon="fa fa-heart" 
                iconColor="red" 
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
        PostCard 
    }, 
    setup() {
      const route = useRoute(); 
      const data = ref<Profile | null>(null);
      
      
      const getProfile = async () => {
        const id = route.params.id as string; 
        if(id == "s") {
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
      };
    },
  });
</script>

<style src="./ProfileView.css"></style>