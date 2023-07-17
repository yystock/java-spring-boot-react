import { useEffect, useState } from "react";
import { api } from "../api/axiosConfig";
import toast from "react-hot-toast";
import { Button } from "@nextui-org/react";

import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/react";
import ChangeUserName from "./change-username";

export default function UserList() {
  const [users, setUsers] = useState<userArray>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await api({ method: "get", url: "/user" });
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Something wrong1!");
      }
    };
    getUsers();
  }, []);

  const onDelete = async (id: number) => {
    try {
      const response = await api({ method: "delete", url: "/user", data: { id: id } });
      console.log(response);
      const updatedData = users.filter((user) => user.id !== id);
      setUsers(updatedData);
      toast.success("Deleted Sucesscfully!");
    } catch (error) {
      console.log(error);
      toast.error("Something wrong2!");
    }
  };

  const onUIUpdate = (email: string, newUserName: string) => {
    console.log("update");
    setUsers((prevUsers) => prevUsers.map((user) => (user.email === email ? { ...user, username: newUserName } : user)));
    console.log(email, newUserName);
    toast.success("Edited Sucesscfully!");
  };

  return (
    <>
      {users ? (
        <Table aria-label="Example table with dynamic content">
          <TableHeader>
            <TableColumn>Email</TableColumn>
            <TableColumn>UserName</TableColumn>
            <TableColumn>Edit</TableColumn>
            <TableColumn>Delete</TableColumn>
          </TableHeader>
          <TableBody>
            {users.map((x) => (
              <TableRow key={x.email}>
                <TableCell>{x.email}</TableCell>
                <TableCell>{x.userName}</TableCell>
                <TableCell>
                  <ChangeUserName userName={x.userName} email={x.email} update={onUIUpdate} />
                </TableCell>
                <TableCell>
                  <Button color="danger" onClick={() => onDelete(x.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div>No Users Found</div>
      )}
    </>
  );
}
