import { NotificationTarget } from './NotificationTarget'
import { NotificationSender } from './NotificationSender'

export interface Notification {
    id: number,
    user_id: number,
    user_target: number,
    notification_type: string,
    notification: string,
    type_id: number,
    targetUser: NotificationTarget,
    sender: NotificationSender 
}