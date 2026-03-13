import { Attachment } from "@mui/icons-material";

export const sampleChats = [
  {
    avatar: "./gittyhub.jpeg",
    name: "Shivi",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: "./githubdp.jpeg",
    name: "laila",
    _id: "2",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: "./githubdp.jpeg",
    name: "Nami",
    _id: "3",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: "./githubdp.jpeg",
    name: "Robin",
    _id: "4",
    groupChat: false,
    members: ["1", "2"],
  },
];

export const sampleUsers = [
  {
    avatar:
      "https://as1.ftcdn.net/jpg/14/04/65/88/1000_F_1404658802_qSXASYeuQA3yeEzO1ZZzTdP4IE6yGHm3.jpg",
    name: "nami",
    _id: 1,
  },
  {
    avatar:
      "https://static.vecteezy.com/system/resources/previews/037/047/063/non_2x/ai-generated-user-web-icon-symbol-3d-isolated-on-transparent-background-png.png",
    name: "niya",
    _id: 2,
  },
];

export const sampleNotifications = [
  {
    sender: {
      avatar:
        "https://as1.ftcdn.net/jpg/14/04/65/88/1000_F_1404658802_qSXASYeuQA3yeEzO1ZZzTdP4IE6yGHm3.jpg",
      name: "nami",
    },
    _id: 1,
  },
  {
    sender: {
      avatar:
      "https://static.vecteezy.com/system/resources/previews/037/047/063/non_2x/ai-generated-user-web-icon-symbol-3d-isolated-on-transparent-background-png.png",
    name: "niya",
    },
    _id: 2,
  },

];

export const sampleMessage = [
  {
    attachment: [
      {
        public_id: "nami-sanji",
        url: "https://tse2.mm.bing.net/th/id/OIP.K8cPOh5r0vB7pYG19sONrgHaGa?rs=1&pid=ImgDetMain&o=7&rm=3",
      },
    ],
    content: "saboady me separate ho gye sab!!",
    _id: "1122",
    sender: {
      _id: "user._id",
      name: "chopper",
    },
    chat: "chatId",
    createdAt: "2024-03-12T10:41:30.630Z",
  },
];
