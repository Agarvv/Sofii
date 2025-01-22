
import { reactive, onMounted, onBeforeUnmount } from 'vue';
import io from 'socket.io-client';

const socket = reactive({
    instance: io('https://sofii-vsly.onrender.com', { withCredentials: true }),
});

export function useSocket() {
    onMounted(() => {
        socket.instance.on('connect', () => {
            console.log('Socket connected!');
        });
    }); 

    return { socket };
}