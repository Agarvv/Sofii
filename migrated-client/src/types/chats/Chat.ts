import { ChatSender } from './ChatSender'
import { ChatReceiver } from './ChatReceiver'
import { UserToDisplayInfo } from './UserToDisplayInfo'

export interface Chat {
    chat_id: number,
    last_message: string,
    Sender: ChatSender,
    Receiver: ChatReceiver,
    userToDisplayInfo: UserToDisplayInfo
}