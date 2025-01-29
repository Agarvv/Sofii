<template>
    <div class="detail" @click="isSelf ? changeProfileInfo : null">
        <i v-if="icon" :class="icon"></i>
        <span>{{ detailValue }}</span>
    </div>
</template>


<script lang="ts">
    import { defineComponent } from 'vue'
    import useProfileDataChange from '@/composables/useProfileDataChange'
    
    export default defineComponent({
        name: 'ProfileDetail',
        props: {
            detailValue: {
                type: String,
                required: true 
            },
            icon: {
                type: String,
                required: false 
            },
            detail: {
                type: String,
                required: true 
            },
            isSelf: {
                type: Boolean, 
                required: true 
            }
        },
        setup(props) {
            const { changeProfileData } = useProfileDataChange(); 
            
            const changeProfileInfo = async () => {
                const value = prompt(`Enter your new ${props.detail}`)
                
                if(!value) return; 
                
                await changeProfileData({
                    field: props.detail,
                    value: value 
                })
            }
            
            return { changeProfileInfo } 
        }
    })
</script>