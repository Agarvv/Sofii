import { apiService } from '@/api/ApiService';

interface UseLikeOptions {
    type: 'POST' | 'COMMENT' | 'ANSWER';
    postId: number;
    commentId?: number;
    answerId?: number;
}

export async function useLike({ type, postId, commentId, answerId }: UseLikeOptions) {
    const paths = {
        POST: '/posts/like',
        COMMENT: '/posts/comments/likes',
        ANSWER: '/posts/answers/likes'
    };

    if (!paths[type]) {
        throw new Error('Unknown Like Type');
    }

    const payload: Record<string, unknown> = { postId };
    if (type === 'COMMENT' || type === 'ANSWER') {
        payload.commentId = commentId;
    }
    if (type === 'ANSWER') {
        payload.answerId = answerId;
    }

    return await apiService.post(paths[type], payload);
}