<template>
     <header>
    <h1>Sofii</h1>
</header>

<div class="wrapper"> 
    <div class="container">
        <h4 style="font-size: 25px">Saved</h4>

        <div  class="container-header">
            <div @click="toggleContentToShow('posts')" class="posts-s">
                <h4>Posts</h4>
                <i class="fa fa-image"></i>
            </div>

            <div @click="toggleContentToShow('videos')" class="videos-s">
                <h4>Videos</h4>
                <i class="fa fa-camera"></i>
            </div>
        </div>

        <div class="saved">

            <div v-if="contentToDisplay == 'posts'"  class="saved-posts">
                            <div class="content_length_zero" v-if="posts.length == 0">
                    <p>You Do Not Have Posts Saved, <a href="/">Go And Explore !</a></p>
                </div>
                
                
                <div v-for="post in posts" key="post.saved_post.id" class="post">
                    
                    <div class="post-header">
                        <div class="post-user-details">
                            <div class="post-user-img">
                                <img style="border-radius: 50%; width: 60px" :src="'http://localhost:3000/' + post.saved_post.user.profilePicture">
                            </div>
                            <div class="post-username">
                                <h4>{{ post.saved_post.user.username }}</h4>
                            </div>
                        </div>
                    </div>
                    <div class="post-description">
                        <p>{{ post.saved_post.description}}</p>
                    </div>
                    <div class="post-image">
                        <img :src="'http://localhost:3000/' + post.saved_post.postPicture">
                    </div>
                    <div class="post-footer">
                        <div class="like">
                            <font-awesome-icon icon="heart"/>
                            <span>{{post.saved_post.postLikes.length}}</span>
                        </div>
                        <div class="comment">
                                                         <font-awesome-icon icon="comments"/>
                            <span>{{post.saved_post.postComments.length}}</span>
                        </div>
                        <div class="share">
                                                        <font-awesome-icon icon="share"/>
                            
                        </div>
                        <div class="save">
                                                         <font-awesome-icon icon="bookmark"/>
                            <span>{{post.saved_post.saved_post.length}}</span>
                        </div>
                    </div>
                </div>
            </div>
            
                <div v-if="contentToDisplay == 'videos'"  class="saved-videos">
                    
                                    <div class="content_length_zero" v-if="videos.length == 0">
                    <p>You Do Not Have Videos Saved, <a href="/watch">Go And Explore !</a></p>
                </div>
                
                <div v-for="video in videos" :key="video.video_id" class="post">
                    
                    <div class="post-header">
                        <div class="post-user-details">
                            <div class="post-user-img">
                                <img style="border-radius: 50%; width: 60px" :src="'http://localhost:3000/' + video.saved_video_video.user_video.profilePicture">
                            </div>
                            <div class="post-username">
                                <h4>{{ video.saved_video_video.user_video.username }}</h4>
                            </div>
                        </div>
                    </div>
                    <div class="post-description">
                        <p>{{ video.saved_video_video.description }}</p>
                    </div>
                    <div class="post-video">
                        <video style="width: 100%; height: 100%; object-fit: cover;" controls> 
                        
                            <source :src="'http://localhost:3000/' + video.saved_video_video.video_content">
                        </video>
                    </div>
                    <div class="post-footer">
                        <div class="like">
                            <font-awesome-icon icon="heart"/>
                            <span>{{video.saved_video_video.video_likes.length}}</span>
                        </div>
                        <div class="comment">
                                                         <font-awesome-icon icon="comments"/>
                            <span>{{ video.saved_video_video.video_comments.length }}</span>
                        </div>
                        <div class="share">
                                                        <font-awesome-icon icon="share"/>
                            
                        </div>
                        <div class="save">
                                                         <font-awesome-icon icon="bookmark"/>
                                                      <span>{{ video.saved_video_video.videos_saved.length }}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            



        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'SavedPage',
    data() {
    return {
        posts: [
            
        ],
        videos: [
        
        ],
        contentToDisplay: 'posts'
    };
},
    methods: {
        redirectToContent(type, id) {
            switch (type) {
                case 'video': {
                    this.$router.push('/watch/' + id);
                    break; // Añadido para evitar la ejecución del siguiente case
                }
                case 'post': {
                    this.$router.push('/post/' + id);
                    break; // Añadido para evitar la ejecución del siguiente case
                }
                default: {
                    console.warn('Unknown content type:', type); // Manejo para tipos no reconocidos
                }
            }
        },
        toggleContentToShow(type) {
            this.contentToDisplay = type
          
        }
    },
    async created() {
        try {
            console.log('Saved pave workinv')
            const response = await fetch('http://localhost:3000/api/sofi/get_user_saved_content', {
                method: 'GET',
                credentials: 'include'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Saved server data: ', data);
            this.posts = data.saved.savedPosts
            this.videos = data.saved.savedVideos
            
            console.log('This.posts', this.posts)
            console.log('This.videos ', this.videos)
            // Aquí puedes manejar los datos guardados como lo necesites
        } catch (error) {
            console.error('Error fetching user saved content:', error);
        }
    }
};
</script>

<style scoped>
    *{
  padding: 0;
  margin: 0;
}

body {
    font-family: 'Poppins', sans-serif;
    background-color: #f5f5f5;
    margin: 0;
    padding: 0;
}

header {
    text-align: center;
    padding: 20px;
    background-color: #007bff;
    color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.wrapper {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.container {
    width: 80%;
    max-width: 600px;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.container-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.container-header div {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  gap: 10px;
}

.container-header h4 {
    margin: 0;
    font-size: 18px;
}

.container-header i {
    font-size: 20px;
    color: #007bff;
}

.post, .video {
    margin-bottom: 20px;
    background-color: #fff;
    padding: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.post-header, .video-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.post-user-details, .video-user-details {
    display: flex;
    align-items: center;
}

.post-user-img img, .video-user-img img {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    object-fit: cover;
    margin-right: 10px;
}

.post-username h4, .video-username h4 {
    margin: 0;
    font-weight: 600;
    font-size: 16px;
}

.post-description p, .video-description p {
    margin: 0 0 10px;
    color: #666;
}

.post-image img {
    width: 100%;
    border-radius: 10px;
    object-fit: cover;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.video-content video {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.post-footer, .video-footer {
    display: grid;
    grid-template-columns: repeat(4, 1fr)
}

.post-footer div, .video-footer div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 10px;
}

.post-footer i, .video-footer i {
    color: #007bff;
    margin-right: 5px;
}

.post-footer span, .video-footer span {
    font-size: 14px;
    color: #333;
}

.content_length_zero {
    width: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: gray;
}



@media(max-width: 600px) {
    .container {
        width: 100%;
    }
}
</style>