import { Stack } from "@mui/material";
import Chatitem from "../shared/Chatitem";

const Chatlist = ({
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
      {chats?.map((data, index) => {
        const { avatar, _id, name, groupChat, members } = data;

        const messageAlert = newMessageAlert.find(
          ({ chatId }) => chatId === _id,
        );

        const isOnline = members?.some((member) =>
          onlineUsers.includes(member),
        );

        console.log(members, onlineUsers, isOnline);

        return (
          <Chatitem
            index={index}
            newMessageAlert={messageAlert}
            isOnline={isOnline}
            avatar={avatar}
            _id={_id}
            key={_id}
            groupChat={groupChat}
            name={name}
            sameSender={chatId === _id}
            handleDeleteChat={handleDeleteChat}
          />
        );
      })}
    </Stack>
  );
};

export default Chatlist;
