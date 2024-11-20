import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Skeleton,
} from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { format } from "timeago.js";
import {
  deleteUserByAdmin,
  getAllUsers,
  updateUserRoleByAdmin,
} from "../../../../redux/slices/userSlice";
import { GoMail } from "react-icons/go";

const ManageTeam = () => {
  const dispatch = useAppDispatch();
  const { getAllUsersLoading, users, deleteUserByAdminLoading, updateUserRoleByAdminLoading } =
    useAppSelector((state) => state.user);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const [openManageAdmin, setOpenManageAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const checkLocalStorageTheme = () => {
      const localStorageTheme = localStorage.getItem("theme") || "light";
      if (localStorageTheme !== theme) {
        setTheme(localStorageTheme);
      }
    };

    const intervalId = setInterval(checkLocalStorageTheme, 1000);

    return () => clearInterval(intervalId);
  }, [theme]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDeleteClick = (id: string) => {
    setSelectedUserId(id);
    setOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedUserId) {
      await dispatch(deleteUserByAdmin(selectedUserId));
    }
    setOpen(false);
    setSelectedUserId(null);
    dispatch(getAllUsers());
  };

  const handleCancel = () => {
    setOpen(false);
    setSelectedUserId(null);
  };

  const handleManageAdmin = async () => {
    await dispatch(updateUserRoleByAdmin({email, role}));
    setOpenManageAdmin(false);
    dispatch(getAllUsers());
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1, },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "purchasedCourses", headerName: "Purchased Courses", flex: 0.5 },
    { field: "joinedAt", headerName: "Joined At", flex: 0.5 },
    {
      field: "  ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: { row: { id: string } }) => (
        <Button
          onClick={() => handleDeleteClick(params.row.id)}
          sx={{
            minWidth: 0,
            padding: 0,
            color: theme === "dark" ? "#fff" : "#000",
          }}
        >
          <AiOutlineDelete size={20} />
        </Button>
      ),
    },
    {
      field: " ",
      headerName: "Email",
      flex: 0.2,
      renderCell: () => (
        <Button
          sx={{
            minWidth: 0,
            padding: 0,
            color: theme === "dark" ? "#fff" : "#000",
          }}
        >
          <GoMail size={20} />
        </Button>
      ),
    },
  ];

  const rows =
    users
      ?.filter((user) => user.role === "admin")
      .map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        purchasedCourses: user.courses.length,
        joinedAt: format(user.createdAt),
      })) || [];

  return (
    <div className="w-full m-auto">
      {getAllUsersLoading ? (
        <Box m="20px">
          <Box display="grid" gap={2}>
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width="100%"
                height={100}
                animation="wave"
              />
            ))}
          </Box>
        </Box>
      ) : (
        <Box m="20px">
          <div className="w-full flex justify-end">
          <button
            onClick={() => setOpenManageAdmin(true)}
            className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-500 dark:text-white font-semibold py-2 px-4 rounded"
          >
            Manage Admin
          </button>
          </div>

          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              height: 400,
              width: "100%",
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom: `1px solid ${
                  theme === "dark" ? "#ffffff30!important" : "#ccc!important"
                }`,
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeader": {
                color: theme === "dark" ? "#fff" : "#000",
                backgroundColor: theme === "dark" ? "#4B5563" : "#D1D5DB",
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1f2a40" : "#f2f0f0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#4B5563" : "#D1D5DB",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? "#b7ebde!important" : "#000!important",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-root": {
                color: "#fff!important",
              },
            }}
          >
            <DataGrid rows={rows} columns={columns} checkboxSelection />
          </Box>

          {/* Delete Confirmation Modal */}
          <Dialog open={open} onClose={handleCancel}>
            <Box
              sx={{
                backgroundColor: theme === "dark" ? "#4B5563" : "#fff",
                color: theme === "dark" ? "#fff" : "#000",
              }}
            >
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogContent>
                <DialogContentText
                  sx={{ color: theme === "dark" ? "#fff" : "#000" }}
                >
                  Are you sure you want to delete this user?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancel} color="inherit">
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmDelete}
                  color="error"
                  variant="contained"
                  sx={{
                    backgroundColor: theme === "dark" ? "#b71c1c" : "#f44336",
                  }}
                >
                  {deleteUserByAdminLoading ? "Deleting..." : "Delete"}
                </Button>
              </DialogActions>
            </Box>
          </Dialog>

          {/* Manage Admin Modal */}
          <Dialog
            open={openManageAdmin}
            onClose={() => setOpenManageAdmin(false)}
          >
            <Box
              sx={{
                backgroundColor: theme === "dark" ? "#4B5563" : "#fff",
                color: theme === "dark" ? "#fff" : "#000",
              }}
            >
              <div className="text-lg font-semibold px-6 pt-2">Manage Admin</div>
              <div className="px-6">You can channge the role of the user</div>
              <DialogContent>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 600px:p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Email"
                  required
                />
                <select
                  value={role}
                  required
                  onChange={(e) => setRole(e.target.value)}
                  className={`w-full p-2 600px:p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-3 ${
                    role === ""
                      ? "text-gray-400 dark:text-[#9CA3AF]"
                      : ""
                  }`}                >
                  <option value=""  className="text-gray-400">Select Role</option>
                  <option value="admin"  className="text-black dark:text-white">Admin</option>
                  <option value="user"  className="text-black dark:text-white">User</option>
                </select>
              </DialogContent>
              <div className="flex justify-end px-6 pb-3 gap-4">
                <button
                  onClick={() => setOpenManageAdmin(false)}
                  className="bg-gray-100 dark:bg-gray-500 hover:bg-gray-50 dark:hover:bg-gray-400 dark:text-white border font-semibold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleManageAdmin}
                  className="bg-gray-300 dark:bg-gray-900 hover:bg-gray-400 dark:hover:bg-gray-800 dark:text-white font-semibold py-2 px-4 rounded"
                >
                  {updateUserRoleByAdminLoading ? "Updating..." : "Update"}
                </button>
              </div>
            </Box>
          </Dialog>
        </Box>
      )}
    </div>
  );
};

export default ManageTeam;
