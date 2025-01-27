import { MessageUser } from './MessageUser'

export interface Message {
    id: number,
    readed: boolean,
    message_content: string,
    message_user: MessageUser 
}