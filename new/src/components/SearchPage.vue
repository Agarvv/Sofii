<!-- IM NOT GOING TO CLEAN THIS COMPONENT, THAT WILL TAKE ME A LOT OF TIME SO I WILL JUST LET IT LIKE THAT BECAUSE THIS APP IS A DEMO. -->


<!-- IM NOT GOING TO CLEAN THIS COMPONENT, THAT WILL TAKE ME A LOT OF TIME SO I WILL JUST LET IT LIKE THAT BECAUSE THIS APP IS A DEMO. -->


<!-- IM NOT GOING TO CLEAN THIS COMPONENT, THAT WILL TAKE ME A LOT OF TIME SO I WILL JUST LET IT LIKE THAT BECAUSE THIS APP IS A DEMO. -->


<!-- IM NOT GOING TO CLEAN THIS COMPONENT, THAT WILL TAKE ME A LOT OF TIME SO I WILL JUST LET IT LIKE THAT BECAUSE THIS APP IS A DEMO. -->


<!-- IM NOT GOING TO CLEAN THIS COMPONENT, THAT WILL TAKE ME A LOT OF TIME SO I WILL JUST LET IT LIKE THAT BECAUSE THIS APP IS A DEMO. -->


<!-- IM NOT GOING TO CLEAN THIS COMPONENT, THAT WILL TAKE ME A LOT OF TIME SO I WILL JUST LET IT LIKE THAT BECAUSE THIS APP IS A DEMO. -->


<!-- IM NOT GOING TO CLEAN THIS COMPONENT, THAT WILL TAKE ME A LOT OF TIME SO I WILL JUST LET IT LIKE THAT BECAUSE THIS APP IS A DEMO. -->


<!-- IM NOT GOING TO CLEAN THIS COMPONENT, THAT WILL TAKE ME A LOT OF TIME SO I WILL JUST LET IT LIKE THAT BECAUSE THIS APP IS A DEMO. -->
<template>
  <div>
    <header>
      <div class="logo">
        <h2>Sofii</h2>
      </div>
      <div class="search-input">
        <input v-model="searchQ" type="search"/>
      </div>
      <div class="icons">
        <font-awesome-icon icon="search" @click="search"/>
        <font-awesome-icon icon="microphone" />
        <font-awesome-icon icon="filter" @click="toggleFiltersButton" 
        
        />
      </div>
    </header>
    
    
     <div v-show="showFiltersButton" class="filter-div">
         
          <div @click="toggleFiltersButton" class="close-filters">

            <font-awesome-icon icon="close"/>
          </div>
          
          <div @click="showFilters('users')" class="aside-users">
            <div @click="toggleUsers">
              <font-awesome-icon icon="user" />
              <span>Users</span>
            </div>
            <div>
              <font-awesome-icon icon="caret-down" />
            </div>
          </div>

          <div v-show="showUsersFilters" class="hidden-users">
            <div class="order-by-son">
              <div class="following">
                <label>Following</label>
                <input type="checkbox" v-model="filters.users.following" />
              </div>
              <div class="friend">
                <label>Friend</label>
                <input type="checkbox" v-model="filters.users.friend" />
              </div>
              <div class="followers">
                <label>Popular</label>
                <input type="checkbox" v-model="filters.users.followers" />
              </div>
            </div>
          </div>

          <div @click="showFilters('posts')" class="aside-posts">
            <div>
              <font-awesome-icon icon="newspaper" />
              <span>Posts</span>
            </div>
            <div>
              <font-awesome-icon icon="caret-down" />
            </div>
          </div>

          <div class="hidden-posts" v-show="showPostsFilters">
            <div class="sort-options">
                
                <div class="most-liked">
                    <label>Most Liked</label>
                    <input type="checkbox" v-model="filters.posts.most_liked">
                </div>
                
                <div class="most-saved">
                    <label>Most Saved</label>
                    <input type="checkbox" v-model="filters.posts.most_saved">
                </div>
                
                <div class="most-commented">
                    <label>Most Commented</label>
                    <input type="checkbox" v-model="filters.posts.most_commented">
                </div>
                
                <div class="liked">
                    <label>Liked</label>
                    <input type="checkbox" v-model="filters.posts.liked">
                </div>
                
                
              <div class="latest">
                <label>Latest</label>
                <input type="checkbox" name="sort-posts" v-model="filters.latest" />
              </div>
              <div class="popular">
                <label>Popular</label>
                <input type="checkbox" name="sort-posts" value="popular" v-model="filters.posts.popular" />
              </div>
              <div class="trending">
                <label>Trending</label>
                <input type="checkbox" name="sort-posts" value="trending" v-model="filters.posts.trending" />
              </div>
            </div>
          </div>
          
          <div class="hidden-videos" @click="showFilters('videos')">
              <div>
                  <span>Videos</span>
              </div>
              <div>
                  <font-awesome-icon icon="caret-down"/>
              </div>
          </div>
          
          <div class="hidden-videos" v-show="showVideosFilters">
              <div class="sort-options">
                  
                  <div class="most-liked">
                      <label>Most Liked</label>
                      <input type="checkbox" v-model="filters.videos.most_liked">
                  </div>
                  
                  <div class="most_saved">
                     <label>Most Saved</label>
                     <input type="checkbox" v-model="filters.videos.most_saved">
                  </div>
                      
                      
                  <div class="most_commented">
                    <label>Most Commented</label>
                    <input type="checkbox" v-model="filters.videos.most_commented">
                  </div>
                      
                  <div class="trending">
                    <label>Trending</label>
                    <input type="checkbox" v-model="filters.videos.trending">
                  </div>
                  
                  <div class="liked">
                      <label>Liked</label>
                      <input type="checkbox" v-model="filters.videos.liked">
                  </div>
                      
              </div>
          </div>

           <div class="show_filters_button_div">
         <button @click="applyFilters">Apply Filters</button>
           </div>
          
          
          
          
          
        </div>
        
        
        
  
  
        

    <div class="container">
      <aside>
        <div class="aside-header">
          <div class="logo">
            <h1>Sofii</h1>
          </div>
        </div>
        
        
        <nav>
                   
         <div class="filter-div-pc">
          
          <div style="display: none" @click="toggleFiltersButton" class="close-filters">
            <i style="color: gray"class="fa fa-close"></i>
            <font-awesome-icon icon="close"/>
          </div>
          
          <!-- breef styles -->
          <div @click="showFilters('users')" class="aside-users.pc" style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          ">
            <div @click="toggleUsers">
              <font-awesome-icon icon="user" />
              <span>Users</span>
            </div>
            <div>
              <font-awesome-icon icon="caret-down" />
            </div>
          </div>

          <div v-show="showUsersFilters" class="hidden-users">
            <div class="order-by-son">
              <div class="following">
                <label>Following</label>
                <input type="checkbox" v-model="filters.users.following" />
              </div>
              <div class="friend">
                <label>Friend</label>
                <input type="checkbox" v-model="filters.users.friend" />
              </div>
              <div class="followers">
                <label>Popular</label>
                <input type="checkbox" v-model="filters.users.followers" />
              </div>
            </div>
          </div>

          <div @click="showFilters('posts')" class="aside-posts.pc" style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          ">
            <div>
              <font-awesome-icon icon="newspaper" />
              <span>Posts</span>
            </div>
            <div>
              <font-awesome-icon icon="caret-down" />
            </div>
          </div>

          <div class="hidden-posts" v-show="showPostsFilters">
            <div class="sort-options">
                
                <div class="most-liked">
                    <label>Most Liked</label>
                    <input type="checkbox" v-model="filters.posts.most_liked">
                </div>
                
                <div class="most-saved">
                    <label>Most Saved</label>
                    <input type="checkbox" v-model="filters.posts.most_saved">
                </div>
                
                <div class="most-commented">
                    <label>Most Commented</label>
                    <input type="checkbox" v-model="filters.posts.most_commented">
                </div>
                
                <div class="liked">
                    <label>Liked</label>
                    <input type="checkbox" v-model="filters.posts.liked">
                </div>
                
                
              <div class="latest">
                <label>Latest</label>
                <input type="checkbox" name="sort-posts" v-model="filters.latest" />
              </div>
              <div class="popular">
                <label>Popular</label>
                <input type="checkbox" name="sort-posts" value="popular" v-model="filters.posts.popular" />
              </div>
              <div class="trending">
                <label>Trending</label>
                <input type="checkbox" name="sort-posts" value="trending" v-model="filters.posts.trending" />
              </div>
            </div>
          </div>
          
          <div class="aside-videos" @click="showFilters('videos')" style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          ">
              <div>
                  <span>Videos</span>
              </div>
              <div>
                  <font-awesome-icon icon="caret-down"/>
              </div>
          </div>
          
          <div class="hidden-videos" v-show="showVideosFilters">
              <div class="sort-options">
                  
                  <div class="most-liked">
                      <label>Most Liked</label>
                      <input type="checkbox" v-model="filters.videos.most_liked">
                  </div>
                  
                  <div class="most_saved">
                     <label>Most Saved</label>
                     <input type="checkbox" v-model="filters.videos.most_saved">
                  </div>
                      
                      
                  <div class="most_commented">
                    <label>Most Commented</label>
                    <input type="checkbox" v-model="filters.videos.most_commented">
                  </div>
                      
                  <div class="trending">
                    <label>Trending</label>
                    <input type="checkbox" v-model="filters.videos.trending">
                  </div>
                  
                  <div class="liked">
                      <label>Liked</label>
                      <input type="checkbox" v-model="filters.videos.liked">
                  </div>
                      
              </div>
          </div>

           <div class="show_filters_button_div">
         <button @click="applyFilters">Apply Filters</button>
           </div>
          
          
          
          
          
        </div>
        
          
        </nav>
        
        
      </aside>

      <div class="content">
        <div v-if="!filteredContent.posts.length && !filteredContent.users.length && !filteredContent.videos.length" class="zero_content_found">
          <h4>No Content Found...</h4>
        </div>

        <div v-if="filteredContent.users.length > 0 && content_to_show == 'all' || content_to_show == 'users'" class="users">
          <h4>Users</h4>
          <div v-for="user in filteredContent.users" :key="user.id" class="user">
            
             <UserCard :user="user"/>
            
          </div>
        </div>

        <div class="posts" v-if="filteredContent.posts.length > 0 && content_to_show == 'posts' || content_to_show == 'all' ">
          <h4 v-if="content.posts.length > 0">Posts</h4>
          <div v-for="post in filteredContent.posts" :key="post.id" class="post" @click="goToPostPage(post.id)">
            <PostCard :post="post"/>
          </div>
        </div>

        <div class="videos" v-if="filteredContent.videos.length > 0 && content_to_show == 'videos' || content_to_show == 'all'">
          <div v-for="video in filteredContent.videos" :key="video.id" class="video">
            <VideoCard :video="video" />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import VideoCard from './VideoCard';
import UserCard from './UserCard'
import PostCard from './PostCard'

import userMixin from '../mixins/userMixin'


export default {
    mixins: [userMixin], 
    
    components: {
        VideoCard,
        UserCard,
        PostCard
    }, 
    data() {
        return {
            searchQ: "",
            content: {
                users: [],
                posts: [],
                videos: [],
            },
            filteredContent: {
                users: [],
                posts: [],
                videos: []
            },
            showUsers: true,
            showPosts: true,
            content_to_show: "all",
            filters: {
                users: {
                    following: false,
                    friend: false,
                    blocked: false,
                    popular: false,
                    followers: 0,
                },
                posts: {
                   most_liked: false,
                   latest: false,
                   popular: false,
                   trending: false,
                   liked: false,
                   most_commented: false,
                   most_saved: false
                },
                videos: {
                    most_liked: false,
                    liked: false,
                    trending: false,
                    popular: false,
                    most_commented: false,
                    most_saved: false,
                }
            },
            showPostsFilters: false,
            showUsersFilters: false,
            showVideosFilters: false,
            showFiltersButton: false
        };
    },
    methods: {
        
        search() {
          
            this.$router.push('/search/' + this.searchQ)
        }, 
        
        
        toggleFiltersButton() {
            
            this.showFiltersButton = !this.showFiltersButton
            
        }, 
        
        showFilters(type) {
            switch(type) {
                case "users":
                this.showUsersFilters = !this.showUsersFilters
                break;
            case "posts":
               
                this.showPostsFilters = !this.showPostsFilters

                break;
            case "videos":
                this.showVideosFilters = !this.showVideosFilters
                break;
            }
        }, 
    
        
        goToUserPage(user_id) {
            this.$router.push('/user/' + user_id);
        }, 
        goToPostPage(post_id) {
            this.$router.push('/post/' + post_id);
        },
      
        async followUser(following_id) {
            console.log('Follow user method called, ', following_id);
            const response = await fetch('http://localhost:3000/api/sofi/follow', {
                body: JSON.stringify({ following_id }),
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                console.log('response not ok');
            }

            const data = await response.json();
            console.log('follow server data', data);
        },
      
      applyFilters() {
    alert('Filter method called');

    
    this.content_to_show = 'all'
    this.filteredContent.users = [...this.content.users];
    this.filteredContent.posts = [...this.content.posts];
    this.filteredContent.videos = [...this.content.videos]


    if (this.filters.users.following) {
        this.content_to_show = 'users'
        
        
        console.log('Applying following filter...', this.content.users);
        
        const filteredUsers = this.filteredContent.users.filter(user => user.following === true);
        this.filteredContent.users = filteredUsers;

        console.log('FilteredContent users after applying following filter:', this.filteredContent.users);
    }

    if (this.filters.users.friend) {
        this.content_to_show = 'users'
        const filteredFriends = this.filteredContent.users.filter(user => user.isYourFriend === true);
        this.filteredContent.users = filteredFriends;
    }

    if (this.filters.users.followers) {
        this.content_to_show = 'users'
        const filteredFollowers = this.filteredContent.users.sort((a, b) => b.followers.length - a.followers.length)
        this.filteredContent.users = filteredFollowers;
    }

    // FILTROS DE POSTS
    if (this.filters.posts.popular) {
        this.content_to_show = 'posts'
        
        const filteredPosts = this.filteredContent.posts.filter(post => post.postLikes.length > 100);
        this.filteredContent.posts = filteredPosts;
    }

    if (this.filters.posts.latest) {
        this.content_to_show = 'posts'
        this.filteredContent.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (this.filters.posts.trending) {
        this.content_to_show = 'posts'
        console.log('Posts avant filtter: ', this.filteredContent.posts)
        const filteredTrendingPosts = this.filteredContent.posts.filter(post => post.postLikes.length > 100 && post.postComments.length > 100 && post.saved_post.length > 100);
        this.filteredContent.posts = filteredTrendingPosts;
        console.log('Filtered content pists fusjd ', filteredTrendingPosts)
        console.log('filtered content new post: ', this.filteredContent.posts)
    }
    
    if(this.filters.posts.most_liked) {
        this.content_to_show = 'posts'
        let filteredMostLikedPosts = this.filteredContent.posts.sort((a, b) => b.postLikes.length - a.postLikes.length)
        
        console.log('filtered most liked posts: ', filteredMostLikedPosts)
        this.filteredContent.posts = filteredMostLikedPosts
    }
    
    if(this.filters.posts.most_saved) {
        this.content_to_show = 'posts'
        let filteredMostSavedPosts = this.filteredContent.posts.sort((a, b) => b.saved_post.length - a.saved_post.length)
        
        console.log('Most saved posts: ', filteredMostSavedPosts)
        
        this.filteredContent.posts = filteredMostSavedPosts
    }
    
    if(this.filters.posts.most_commented) {
        this.content_to_show = 'posts'
        let filteredMostCommentedPosts = this.filteredContent.posts.sort((a, b) => b.postComments.length - a.postComments.length)
        
        console.log('Filtered mosy commented post: ', filteredMostCommentedPosts)
        
        this.filteredContent.posts = filteredMostCommentedPosts
    }
    
    if(this.filters.posts.liked) {
        this.content_to_show = 'posts'
        let filteredLikedPosts = this.filteredContent.posts.filter(post => post.isLiked == true)
        console.log('filteredLikedPosts', filteredLikedPosts)
        this.filteredContent.posts = filteredLikedPosts
        
    }
    
    //VIDEOS 
    
    
    if(this.filters.videos.most_liked) {
        this.content_to_show = 'videos'
        let filteredVideosMostLiked = this.filteredContent.videos.sort((a, b) => b.video_likes.length - a.video_likes.length)
        console.log('filtered videos likes: ', filteredVideosMostLiked)
        this.filteredContent.videos = filteredVideosMostLiked
    }
    
    if(this.filters.videos.most_saved) {
        this.content_to_show = 'videos'
        let filteredVideosMostSaved = this.filteredContent.videos.sort((a, b) => b.videos_saved.length - a.videos_saved.length)
        console.log('filtered videos saveds: ', filteredVideosMostSaved)
        this.filteredContent.videos = filteredVideosMostSaved
    }
    
    if(this.filters.videos.most_commented) {
        this.content_to_show = 'videos'
        let filteredVideosMostCommented = this.filteredContent.videos.sort((a, b) => b.video_comments.length - a.video_comments.length)
        console.log('filtered videos comments: ', filteredVideosMostCommented)
        this.filteredContent.videos = filteredVideosMostCommented
    }
    
    if(this.filters.videos.trending) {
        this.content_to_show = 'videos'
        let filteredVideosTreding = this.filteredContent.videos.filter(video => video.video_likes.length > 100 && video.video_saved.length > 100 && video.video_comments.length > 100)
        this.filteredContent.videos = filteredVideosTreding
    }
    
    if(this.filters.videos.liked) {
        this.content_to_show = 'videos'
        let filteredVideosLiked = this.filteredContent.videos.filter(video => video.isLiked == true)
        console.log('filtered video liked: ', filteredVideosLiked)
        this.filteredContent.videos = filteredVideosLiked
    }
    
    console.log('Filtered content users:', this.filteredContent.users);
    console.log('Filtered content posts:', this.filteredContent.posts);
    console.log('Filtered content videos:', this.filteredContent.videos);
  
  
}
        
    },
    
    async mounted() {
        this.searchQ = this.$route.params.query
    try {
        const response = await fetch('http://localhost:3000/api/sofi/search/' + this.$route.params.query, {
            method: 'POST',
            credentials: 'include'
        });

        if (!response.ok) {
            console.error('Something went wrong!');
            return;
        }

        const data = await response.json();
console.log('srvr data: ', data)
        // Asignar atributos extra al contenido original
data.results.results.users.forEach(user => {
    
    user.followers.forEach((follower) => {
        console.log('recorriendo follower', follower)
        if(follower.follower.follower_id == this.usuario.user_id) {
            user.following = true
        } else {
            user.following = false
        }
    })
    
    user.friends.forEach((friend) => {
       if(friend.friend_one_id == this.usuario.id || friend.friend_two_id == this.usuario.id) {
           user.isYourFriend = true
       } else {
           user.isYourFriend = false
       }
    })
});
        
        data.results.results.posts.forEach(post => {
            post.postLikes.forEach((like) => {
                if(like.user_id == this.usuario.user_id) {
                    post.isLiked = true
                } else {
                    post.isLiked = false
                }
            })
            
            post.saved_post.forEach((saved) => {
                if(saved.user_id == this.usuario.user_id) {
                    post.isSaved = true
                } else {
                    post.isSaved = false
                }
            })
        });
        
        
        
        data.results.results.videos.forEach((video) => {
            video.video_likes.forEach((like) => {
                if(like.user_id == this.usuario.user_id) {
                    video.isLiked = true
                } else {
                    video.isLiked = false
                }
            })
            
            video.videos_saved.forEach((saved) => {
                if(saved.user_id == this.usuario.user_id) {
                    video.isSaved = true
                } else {
                    video.isSaved = false
                }
            })
        })

        this.content = data.results.results;
        this.filteredContent = { ...this.content };

        console.log('Final filteredContent:', this.filteredContent);
    } catch (error) {
        console.error('Fetch error:', error);
    }
},
    
    
    
    async created() {
        
    
}
    
};
</script>


<style scoped>
    html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
}

* {
    box-sizing: border-box;
}


/* Header */
header {
    background-color: #ff6347;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    padding: 0 20px;
}

header .search-input {
    flex: 1;
    margin: 0 20px;
}

header .search-input input {
    width: 100%;
    height: 100%;
    padding: 10px;
    font-size: 16px;
    border: 2px solid #ccc;
    border-radius: 20px;
    outline: none;
    transition: border-color 0.3s ease;
}

header .search-input input:focus {
    border-color: #ff6347;
}

header .icons {
    display: flex;
    gap: 10px;
    align-items: center;
}

header .icons i {
    font-size: 24px;
    color: white;
}

/* Contenedor principal */
.container {
    display: grid;
    grid-template-columns: 1.5fr 3fr;
    height: 100vh; /* Asegura que el contenedor ocupe el 100% del viewport height */
    gap: 20px;
    padding: 20px;
}

@media(max-width: 600px) {
    .container {
        grid-template-columns: 1fr;
    }
}

/* Sidebar */
aside {
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

aside .aside-header {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}

aside .menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

aside .menu-item:hover {
    background-color: #e0e0e0;
}


aside i {
    font-size: 20px;
}

/* Contenido principal */
.content {
    padding: 20px;
    overflow-y: auto; /* Habilita scroll si el contenido es más largo que el área visible */
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.users {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 10px;
}


.zero_content_found {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    font-weight: 700;
    color: gray;
}

.close-filters {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}


.filter-div {
    position: fixed;
    top: 0;
    right: 0;
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 320px; /* Ajuste para pantallas pequeñas */
    margin: auto; /* Centrado en la página */
}

.filter-div > div {
    margin-bottom: 15px;
    cursor: pointer;
    background-color: #ffffff;
    border: 1px solid #e9ecef;
    border-radius: 5px;
    padding: 10px;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.filter-div > div:hover {
    background-color: #e2e6ea;
    transform: translateY(-2px);
}

.filter-div .aside-users, 
.filter-div .aside-posts, 
.filter-div .hidden-videos {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.filter-div.pc .aside-users, 
.filter-div.pc .aside-posts, 
.filter-div.pc .aside-videos {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid red;
}


.filter-div span {
    font-weight: bold;
    font-size: 1em;
    color: #495057;
}

.filter-div label {
    font-size: 0.9em;
    color: #495057;
}

.filter-div input[type="checkbox"],
.filter-div input[type="number"] {
    margin-left: 10px;
    transform: scale(1.2);
}

/* .hidden-users, .hidden-posts, .hidden-videos {
    padding-left: 15px;
    border: 1px solid red;
} */

.show_filters_button_div {
    text-align: center;
    margin-top: 10px;
}

.show_filters_button_div button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
}

.show_filters_button_div button:hover {
    background-color: #0056b3;
}

.hidden-videos {
    display: flex;
    justify-content: space-between;
}

 @media (max-width: 768px) { 
    .filter-div {
        width: 90%; /* Ajuste para pantallas pequeñas 
        margin-top: 10px; */
   }
} 



/* Media queries */
@media (max-width: 600px) {
    aside,
    nav {
        display: none;
    }
}

@media (max-width: 400px) {
    .container {
        padding: 10px;
    }

    .content {
        padding: 10px;
    }
}



</style> 
<!-- 949 LINES OF CODE -->