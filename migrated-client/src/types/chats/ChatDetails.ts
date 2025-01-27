import { Chat } from './Chat'
import { Message } from './Message'

export interface ChatDetails extends Chat {
    messages: Message[] 
}