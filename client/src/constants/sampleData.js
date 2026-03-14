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
    createdAt: "2026-03-12T10:41:30.630Z",
  },
  {
    attachment: [
      {
        public_id: "zoro-robin",
        url: "https://www.bing.com/ck/a?!&&p=8a08e01911efce6515524c89227b3cc57d87e0e98090f4c68fab3c798c1a51dcJmltdHM9MTc3MzQ0NjQwMA&ptn=3&ver=2&hsh=4&fclid=30271025-8ffc-673f-344c-03428eda66f1&u=a1L2ltYWdlcy9zZWFyY2g_cT16b3JvK3JvYmluK2ltYWdlJmlkPUQzQzI2MkRFQjY1MUY1MTc5OTAwMkQxNjk1RkMyMzQxRTIwRkFBRUEmRk9STT1JUUZSQkE",
      },
    ],
    content: "achcha phir mile ki nahi ??",
    _id: "3344",
    sender: {
      _id: "112233",
      name: "chopper",
    },
    chat: "chatId",
    createdAt: "2026-03-14T10:41:30.630Z",
  },
];
