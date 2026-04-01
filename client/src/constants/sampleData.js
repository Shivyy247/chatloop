import { Attachment } from "@mui/icons-material";

export const sampleChats = [
  {
    avatar: "./gittyhub.jpeg",
    name: "Luffy",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: "./githubdp.jpeg",
    name: "Zoro",
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
    name: "Ussop",
    _id: "4",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: "./githubdp.jpeg",
    name: "Sanji",
    _id: "4",
    groupChat: false,
    members: ["1", "2"],
  },

];

export const sampleUsers = [
  {
    avatar: "https://img.icons8.com/?size=96&id=JFJ1boRErP2w&format=png",
    name: "nami",
    _id: 1,
  },
  {
    avatar: "https://img.icons8.com/?size=160&id=SsKnVcW7t5dd&format=png",
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
      avatar: "https://img.icons8.com/?size=100&id=lDbtRAxqXF4Q&format=png",
      name: "niya",
    },
    _id: 2,
  },
];

export const sampleMessage = [
  {
    attachments: [
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
    attachments: [
      {
        public_id: "zoro",
        url: "https://img.icons8.com/?size=100&id=7OMdCpw0sxP6&format=png",
      },
    ],
    content: "",
    _id: "3344",
    sender: {
      _id: "112233",
      name: "chopper",
    },
    chat: "chatId",
    createdAt: "2026-03-14T10:41:30.630Z",
  },
];


export const dashboardData = {
  users: [
    {
      name: "Eren Yeager",
      avatar:
        "https://i.pinimg.com/1200x/b6/6d/22/b66d22a8b57900e75cbab27192cd58a3.jpg",
      _id: "1",
      username: "eren",
      friends: 40,
      groups: 5,
    },
    {
      name: "Mikasa Ackerman",
      avatar:
        "https://aniyuki.com/wp-content/uploads/2021/07/aniyuki-mikasa_ackerman-14.jpg",
      _id: "2",
      username: "mikasa",
      friends: 20,
      groups: 25,
    },
  ],

  chats: [
    {
      name: "Homies",
      avatar: [
        "https://i.pinimg.com/736x/fa/7a/b2/fa7ab2b703da6fae85e83d7d75754797.jpg",
      ],
      _id: "1",
      groupChat: false,
      members: [
        {
          _id: "1",
          avatar:
            "https://i.pinimg.com/736x/fa/7a/b2/fa7ab2b703da6fae85e83d7d75754797.jpg",
        },
        {
          _id: "2",
          avatar:
            "https://i.pinimg.com/736x/fa/7a/b2/fa7ab2b703da6fae85e83d7d75754797.jpg",
        },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "shivi",
        avatar:
          "https://cdn.inspireuplift.com/uploads/images/seller_products/33104/1705825347_FlorkmemeinloveflowerLong.png",
      },
    },
    {
      name: "Pshychopaths",
      avatar: [
        "https://i.pinimg.com/736x/fa/7a/b2/fa7ab2b703da6fae85e83d7d75754797.jpg",
      ],
      _id: "2",
      groupChat: false,
      members: [
        {
          _id: "1",
          avatar:
            "https://i.pinimg.com/736x/fa/7a/b2/fa7ab2b703da6fae85e83d7d75754797.jpg",
        },
        {
          _id: "2",
          avatar:
            "https://i.pinimg.com/736x/fa/7a/b2/fa7ab2b703da6fae85e83d7d75754797.jpg",
        },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "siri",
        avatar:
          "https://cdn.inspireuplift.com/uploads/images/seller_products/33104/1705825347_FlorkmemeinloveflowerLong.png",
      },
    },
  ],
};