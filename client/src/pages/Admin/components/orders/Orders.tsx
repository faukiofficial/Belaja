import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Skeleton } from "@mui/material";
import { format } from "timeago.js";
// import { GoMail } from "react-icons/go";
import { getOrders } from "../../../../redux/slices/orderSlice";


const Orders = () => {
  const dispatch = useAppDispatch();

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const { orders, getOrdersLoading } = useAppSelector((state) => state.order);

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
    dispatch(getOrders());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "courseTitle", headerName: "Course Title", flex: 1 },
    { field: "price", headerName: "Price", flex: 0.75 },
    { field: "orderedAt", headerName: "Ordered At", flex: 0.5 },
    // {
    //   field: " ",
    //   headerName: " ",
    //   flex: 0.2,
    //   renderCell: () => (
    //     <Button
    //       sx={{
    //         minWidth: 0,
    //         padding: 0,
    //         color: theme === "dark" ? "#fff" : "#000",
    //       }}
    //     >
    //       <GoMail size={20} />
    //     </Button>
    //   ),
    // },
  ];

  const rows = orders?.map((order) => ({
    id: order?._id,
    name: order?.user?.name,
    email: order?.user?.email,
    courseTitle: order?.course?.name,
    price: "Rp. " + order?.course?.price,
    orderedAt: format(order?.createdAt),
  })) || [];

  return (
    <div className="w-full m-auto">
      {getOrdersLoading ? (
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
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              height: 800,
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
        </Box>
      )}
    </div>
  );
};

export default Orders;
