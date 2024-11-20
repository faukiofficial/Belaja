import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { deleteCourse, getAllCourses } from "../../../../redux/slices/courseSlice";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Skeleton } from "@mui/material";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import {format} from "timeago.js"
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const { getAllCoursesLoading, courses, deleteCourseLoading } = useAppSelector(
    (state) => state.course
  );

  const [open, setOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const localStorageTheme = localStorage.getItem("theme") || "light";
      if (localStorageTheme !== theme) {
        setTheme(localStorageTheme);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [theme]);


  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const openDeleteClick = (id: string) => {
    setOpen(true);
    setSelectedCourseId(id);
  };

  const handleConfirmDelete = async () => {
    if (selectedCourseId) {
        await dispatch(deleteCourse(selectedCourseId));
    };
    setOpen(false);
    setSelectedCourseId(null);
    dispatch(getAllCourses());
  };

  const handleCancel = () => {
    setOpen(false);
    setSelectedCourseId(null);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Course Name", flex: 2 },
    { field: "ratings", headerName: "Ratings", flex: 0.25 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "createdAt", headerName: "Created At", flex: 0.5 },
    {
      field: "  ",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: { row: { id: string } }) => (
        <Button
          onClick={async () => {
            navigate(`/admin/edit-course/${params.row.id}`)
          }}
          sx={{
            minWidth: 0,
            padding: 0,
            color: theme === "dark" ? "#fff" : "#000",
          }}
        >
          <AiOutlineEdit size={20} />
        </Button>
      ),
    },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: { row: { id: string } }) => (
        <Button
          onClick={() => openDeleteClick(params.row.id)}
          sx={{
            minWidth: 0,
            padding: 0,
            color: theme === "dark" ? "#ff4d4d" : "#d32f2f",
          }}
        >
          <AiOutlineDelete size={20} />
        </Button>
      ),
    },
  ];

  const rows = courses?.map((course) => ({
    id: course._id,
    name: course.name,
    ratings: course.ratings,
    purchased: course.purchased,
    createdAt: format(course.createdAt),
  })) || [];

  return (
    <div className="w-full m-auto">
      {getAllCoursesLoading ? (
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

          {/* Delete Confirmation Modal */}
          <Dialog open={open} onClose={handleCancel}>
            <Box sx={{ backgroundColor: theme === "dark" ? "#4B5563" : "#fff", color: theme === "dark" ? "#fff" : "#000", }}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ color: theme === "dark" ? "#fff" : "#000", }}>
                Are you sure you want to delete this course?
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
                sx={{ backgroundColor: theme === "dark" ? "#b71c1c" : "#f44336" }}
              >
                {deleteCourseLoading ? "Deleting..." : "Delete"}
              </Button>
            </DialogActions>
            </Box>
          </Dialog>
        </Box>
      )}
    </div>
  );
};

export default Courses;
