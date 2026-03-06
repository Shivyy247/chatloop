import { Stack } from '@mui/material'     
import Chatitem from '../shared/Chatitem'

const  Chatlist = ({
    w = "100%",
    chats = [],
    chatId,
    onlineUsers = [],
    newMessageAlert = [
        {
            chatId: "",
            count: 0,
        },
    ],
    handleDeleteChat,
}) => {
  return (
    <Stack width={w} direction={"column"}>
          {
              chats?.map(data => {
                  return <Chatitem/>
              })
      }
    </Stack>
  )
}

export default Chatlist
