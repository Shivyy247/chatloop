import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { Avatar, Skeleton, Stack } from "@mui/material";
import { transfromImage } from "../../lib/features";
import AvatarCard from "../../components/shared/AvatarCard";
import axios from "axios";
import { server } from "../../constants/config";
import toast from "react-hot-toast";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => <AvatarCard avatar={params.row.avatar} />,
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 300,
  },
  {
    field: "groupChat",
    headerName: "Group",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => (
      <AvatarCard max={100} avatar={params.row.members} />
    ),
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => (
      <Stack direction="row" alignItems="center" spacing={"1rem"}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },
];

const ChatManag = () => {
  const [chats, setChats] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await axios.get(`${server}/api/v1/admin/chats`, {
          withCredentials: true,
        });

        setChats(data.chats);

        console.log("RAW DATA:", data);
        console.log("CHATS:", data.chats);
      } catch (error) {
        console.log(error);

        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Something went wrong!",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  useEffect(() => {
    if (chats.length) {
      setRows(
        chats.map((i) => ({
          ...i,
          id: i._id,
          avatar: i.avatar.map((img) => transfromImage(img, 50)),
          members: i.members.map((member) => transfromImage(member.avatar, 50)),
          creator: {
            name: i.creator.name,
            avatar: transfromImage(i.creator.avatar, 50),
          },
        })),
      );
    }
  }, [chats]);

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={"100vh"} />
      ) : (
        <Table heading={"All Chats"} columns={columns} rows={rows} />
      )}
    </AdminLayout>
  );
};

export default ChatManag;
