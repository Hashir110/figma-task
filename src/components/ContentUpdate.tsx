import {
  Alert,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useLocation, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "boxicons";
import * as yup from "yup";

const ContentUpdate = ({ btnTitle = "Update Task" }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { task, index } = location.state || {};
  const [title, setTitle] = useState(task?.title || "");
  const [startDate, setStartDate] = useState(
    task?.date ? new Date(task.date) : null
  );
  const [priority, setPriority] = useState(task?.priority || "");
  const [assign, setAssign] = useState(task?.assign || "");
  const [status, setStatus] = useState(task?.status || "");
  const [des, setDes] = useState(task?.des || "");
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    priority: yup.string().required("Priority is required"),
    assign: yup.string().required("Assignee is required"),
    status: yup.string().required("Status is required"),
    des: yup.string().required("Description is required"),
  });

  const handleUpdateTask = async () => {
    try {
      setErrors({});
      setAlertMessage(null);

      await validationSchema.validate(
        { title, priority, assign, status, des },
        { abortEarly: false }
      );

      const formattedDate = startDate?.toISOString().split("T")[0];

      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      if (index !== undefined) {
        tasks[index] = {
          title,
          date: formattedDate,
          priority,
          assign,
          status,
          des,
        };
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }

      setAlertMessage({ type: "success", text: "Task updated successfully!" });

      setTitle("");
      setStartDate(null);
      setPriority("");
      setAssign("");
      setStatus("");
      setDes("");

      setTimeout(() => {
        navigate("/showDetails");
      }, 2000);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errorObj = {};
        err.inner.forEach((error) => {
          errorObj[error.path] = error.message;
        });
        setErrors(errorObj);
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md m-4 md:m-10">
      <div className="p-4">
        {/* Alert Message */}
        {alertMessage && (
          <Alert severity={alertMessage.type} className="mb-4 mx-2 md:mx-4">
            {alertMessage.text}
          </Alert>
        )}

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <TextField
            className="w-full"
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
          />

          <div className="relative w-full">
            <TextField
              className="w-full"
              label="Due Date"
              variant="outlined"
              value={startDate ? startDate.toLocaleDateString() : ""}
              onClick={() => setShowCalendar(true)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <i
                      onClick={() => setShowCalendar(!showCalendar)}
                      className="bx bx-calendar text-xl cursor-pointer"
                    ></i>
                  </InputAdornment>
                ),
              }}
            />
            {showCalendar && (
              <div className="absolute mt-2 z-10">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    setShowCalendar(false);
                  }}
                  inline
                  dateFormat="MM/DD/YYYY"
                />
              </div>
            )}
          </div>

          <FormControl
            className="w-full"
            variant="outlined"
            error={!!errors.priority}
          >
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              label="Priority"
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Normal">Normal</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>

          <TextField
            className="w-full"
            label="Status"
            variant="outlined"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            error={!!errors.status}
            helperText={errors.status}
          />

          <FormControl
            className="w-full"
            variant="outlined"
            error={!!errors.assign}
          >
            <InputLabel>Assignee</InputLabel>
            <Select
              value={assign}
              onChange={(e) => setAssign(e.target.value)}
              label="Assignee"
            >
              <MenuItem value="Saeed Ahmed">Saeed Ahmed</MenuItem>
              <MenuItem value="Mehedi Hasan">Mehedi Hasan</MenuItem>
              <MenuItem value="Aminul Islam">Aminul Islam</MenuItem>
              <MenuItem value="Abdul Majid">Abdul Majid</MenuItem>
              <MenuItem value="Muhammad Ali">Muhammad Ali</MenuItem>
              <MenuItem value="Muhammad Hashir">Muhammad Hashir</MenuItem>
            </Select>
          </FormControl>

          <TextField
            className="w-full"
            label="Description"
            variant="outlined"
            value={des}
            onChange={(e) => setDes(e.target.value)}
            error={!!errors.des}
            helperText={errors.des}
            multiline
          />
        </div>

        <div className="flex justify-end mt-6">
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateTask}
          >
            {btnTitle}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentUpdate;
