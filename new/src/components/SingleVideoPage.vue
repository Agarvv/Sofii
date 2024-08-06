<template>
    <VideoCard :video="video"/>
</template>

<script>
import VideoCard from './VideoCard.vue';

    export default {
        name: 'SingleVideoPage',
        components: {
            VideoCard
        },
        data() {
            return {
                video: {}
            }
        },
        methods: {
            async getVideo() {
                const videoId = this.$route.params.video_id
                
                const response = await fetch('http://localhost:3000/api/sofi/video/' + videoId)
                
                const data = await response.json()
                
                console.log('Server data: ', data)
                
                this.video = data.video
            }
        },
        async created() {
            this.getVideo()
        }
    }
</script>

<style scoped>
    
</style>