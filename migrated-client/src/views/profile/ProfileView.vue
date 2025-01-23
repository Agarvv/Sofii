<template>
  <div>
    <p>profile soon</p>
  </div>
   <!--  <div>
      <ProfileHeader />
      
      <div class="responsive-user-details">
          
          <div class="r-bio">
              <p>{{user.bio ? user.bio : 'BIO Not Provided'}}</p>
          </div>
          
          <div class="r-info">
              <div class="ubication">
                <font-awesome-icon icon="fas fa-map-marker-alt" style="color: red" />
                <span>{{ user.ubication ? user.ubication : 'Ubication Not Provided' }}</span>
              </div>
              
              <div class="native">
                <font-awesome-icon icon="fas fa-globe" style="color: black" />
                <span>{{ user.native_city ? user.native_city : 'Native City Not Provided' }}</span>
              </div>
              
              <div class="gender">
                <font-awesome-icon icon="fas fa-venus-mars" style="color: hotpink" />
                <span>{{ user.gender ? user.gender : 'Gender Not Provided' }}</span>
              </div>
              
              <div class="work">
                <font-awesome-icon icon="fas fa-briefcase" style="color: gray" />
                <span>{{ user.job ? user.job : 'Job Not Provided' }}</span>
              </div>
              
              <div class="love">
                <font-awesome-icon icon="fa fa-heart" style="color: red" />
                <span>{{ user.civil_status ? user.civil_status : 'Civil Status Not Provided' }}</span>
              </div>
              
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
                 
                 
               <div  class="description">
                 <p>{{ user.bio ? user.bio  : 'Bio Not Provided' }}</p>
               </div>
               
              <div class="ubication">
                <font-awesome-icon icon="fas fa-map-marker-alt" style="color: red" />
                <span>{{ user.ubication ? user.ubication : 'Ubication Not Provided' }}</span>
              </div>
              
              <div class="native">
                <font-awesome-icon icon="fas fa-globe" style="color: black" />
                <span>{{ user.native_city ? user.native_city : 'Native City Not Provided' }}</span>
              </div>
              
              <div class="gender">
                <font-awesome-icon icon="fas fa-venus-mars" style="color: hotpink" />
                <span>{{ user.gender ? user.gender : 'Gender Not Provided' }}</span>
              </div>
              
              <div class="work">
                <font-awesome-icon icon="fas fa-briefcase" style="color: gray" />
                <span>{{ user.job ? user.job : 'Job Not Provided' }}</span>
              </div>
              
              <div class="love">
                <font-awesome-icon icon="fa fa-heart" style="color: red" />
                <span>{{ user.civil_status ? user.civil_status: 'Civil Status Not Provided' }}</span>
              </div>
              
              
             </div>
            </div>
          </div>
        </aside>
  
        <main>
            <h4 style="width: 100%;
             display: flex;
             align-items: center;
             justify-content: center;
             font-size: 20px;
             padding: 10px;
             color: gray" v-if="userPosts.length == 0">This User Does Not Have Posts...</h4>
               <div v-if="user.posts.length > 0" class="posts">
                  
            <div  v-for="post in user.posts" :key="post.id" class="post" >
                <PostCard :post="post"
                  @delete="handlePostRemoval"
                />
            </div>

          </div> 
        </main>
      </div>
    </div> -->
  </template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import ProfileHeader from '@/components/profile/profile-header/ProfileHeader.vue';
  import { useGet } from '@/composables/useGet';
  import { useRoute } from 'vue-router';

  export default defineComponent({
    name: 'ProfileView',
    setup() {
      const route = useRoute(); 

      const getProfile = async () => {
        const id = route.params.id as string; 
        if(id == "s") {
          console.log("SELF");
        }

        const data = await useGet<any>({
           endpoint: `/profile/${id}`,
           withError: true 
        });

        console.log('profile data', data);
      };

      onMounted(() => {
        getProfile();
      });

      return {
        getProfile,
      };
    },
  });
</script>
