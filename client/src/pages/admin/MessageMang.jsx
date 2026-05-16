import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { Avatar, Box, Skeleton, Stack } from "@mui/material";
import { fileFormat, transfromImage } from "../../lib/features";
import moment from "moment";
import RenderAttachment from "../../components/shared/RenderAttachment";
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
    field: "attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {
      const { attachments } = params.row;

      return attachments?.length > 0
        ? attachments.map((i, index) => {
            const url = i.url;
            const file = fileFormat(url);

            return (
              <Box key={index}>
                <a
                  href={url}
                  download
                  target="_blank"
                  style={{
                    color: "black",
                  }}
                >
                  {RenderAttachment(file, url)}
                </a>
              </Box>
            );
          })
        : "No Attachments";
    },
  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 250,
  },
  {
    field: "sender",
    headerName: "Sent By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => (
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    ),
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 180,
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 250,
  },
];

const MessageMang = () => {
  const [messages, setMessages] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(`${server}/api/v1/admin/messages`, {
          withCredentials: true,
        });

        setMessages(data.messages);

        console.log("RAW DATA:", data);
        console.log("MESSAGES:", data.messages);
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

    fetchMessages();
  }, []);

  useEffect(() => {
    if (messages.length) {
      setRows(
        messages.map((i) => ({
          ...i,
          id: i._id,
          sender: {
            name: i.sender.name,
            avatar: transfromImage(i.sender.avatar, 50),
          },
          groupChat: i.groupChat ? "Yes" : "No",
          createdAt: moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
        })),
      );
    }
  }, [messages]);

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={"100vh"} />
      ) : (
        <Table
          heading={"All Messages"}
          columns={columns}
          rows={rows}
          rowHeight={200}
        />
      )}
    </AdminLayout>
  );
};

export default MessageMang;
