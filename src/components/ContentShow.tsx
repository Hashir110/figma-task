import React, { useEffect, useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FlagIcon from "@mui/icons-material/Flag";
import EditIcon from "@mui/icons-material/Edit";

import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const ContentShow = ({ btnTitle = "Create New Task" }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const navigate = useNavigate();

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleEdit = (task, index) => {
    navigate("/updateDetails", { state: { task, index } });
  };

  return (
    <div className="flex flex-col items-center m-10 gap-4 md:m-10">
      <div className="flex justify-end w-full relative">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/createDetails")}
        >
          {btnTitle}
        </Button>
      </div>
      {/* Table */}
      <div className="w-full overflow-x-auto border rounded-lg mt-10 gap-4 grid grid-cols-1 ">
        <TableContainer component="table">
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "gray" }}>Name</TableCell>
              <TableCell style={{ color: "gray" }}>Due Date</TableCell>
              <TableCell style={{ color: "gray" }}>Assignee</TableCell>
              <TableCell style={{ color: "gray" }}>Priority</TableCell>
              <TableCell style={{ color: "gray" }}>Status</TableCell>
              <TableCell style={{ color: "gray" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task, index) => (
              <TableRow key={index}>
                <TableCell className="text-blue-600">{task.title}</TableCell>
                <TableCell>{task.date}</TableCell>
                <TableCell>{task.assign}</TableCell>
                <TableCell>
                  <i
                    className={` ${
                      task.priority === "Normal"
                        ? "text-green-500"
                        : task.priority === "Low"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    <FlagIcon className="mr-1" />
                  </i>
                  {task.priority}
                </TableCell>
                <TableCell>
                  <button
                    type="button"
                    className={`${
                      task.status === "Pending"
                        ? "bg-yellow-500"
                        : task.status === "Active"
                        ? "bg-green-500"
                        : "bg-red-600"
                    } text-white w-20 h-6 rounded-lg cursor-auto`}
                  >
                    {task.status}
                  </button>
                </TableCell>
                <TableCell>
                  <DeleteOutlineIcon
                    className="text-red-600 cursor-pointer"
                    onClick={() => handleDelete(index)}
                  />
                  <EditIcon
                    className="text-blue-600 cursor-pointer ml-2"
                    onClick={() => handleEdit(task, index)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableContainer>
      </div>
    </div>
  );
};

export default ContentShow;
