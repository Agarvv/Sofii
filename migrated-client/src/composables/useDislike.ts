import { apiService } from '@/api/ApiService';

interface UseDislikeOptions {
    type: 'COMMENT' | 'ANSWER';
    postId: number;
    commentId?: number;
    answerId?: number;
}

export async function useDislike({ type, postId, commentId, answerId }: UseDislikeOptions) {
    const paths = {
        COMMENT: '/posts/comments/dislike',
        ANSWER: '/posts/answers/dislike'
    };

    if (!paths[type]) {
        throw new Error('Unknown Dislike Type');
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