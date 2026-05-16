import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { Avatar, Skeleton } from "@mui/material";
import { transfromImage } from "../../lib/features";
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
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 150,
  },
];

const UserMang = () => {
  const [users, setUsers] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${server}/api/v1/admin/users`, {
          withCredentials: true,
        });

        setUsers(data.users);

        console.log("RAW DATA:", data);
        console.log("USERS:", data.users);
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

    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length) {
      setRows(
        users.map((i) => ({
          ...i,
          id: i._id,
          avatar: transfromImage(i.avatar, 50),
        })),
      );
    }
  }, [users]);

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={"100vh"} />
      ) : (
        <Table heading={"All Users"} columns={columns} rows={rows} />
      )}
    </AdminLayout>
  );
};

export default UserMang;
