import React, { useState } from "react";
import * as yup from "yup";
import "boxicons";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  TextField,
  Button,
  ListItem,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Content = ({ btnTitle }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [priority, setPriority] = useState("");
  const [assign, setAssign] = useState("");
  const [status, setStatus] = useState("");
  const [des, setDes] = useState("");
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const handlePriority = (event: SelectChangeEvent) => {
    setPriority(event.target.value as string);
  };

  const handleAssign = (event: SelectChangeEvent) => {
    setAssign(event.target.value as string);
  };

  const handleCreateTask = async () => {
    try {
      setErrors({});
      setAlertMessage(null);

      // Validate form fields
      await validationSchema.validate(
        { title, date, priority, assign, status, des },
        { abortEarly: false }
      );

      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const newTask = { title, date, priority, assign, status, des };
      tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(tasks));

      setAlertMessage({ type: "success", text: "Task created successfully!" });
      setOpen(true);
      setTitle("");
      setDate("");
      setPriority("");
      setAssign("");
      setStatus("");
      setDes("");
      setTimeout(() => {
        setOpen(false);
        navigate("/showDetails");
      }, 2000);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errorObj = {};
        err.inner.forEach((e) => {
          errorObj[e.path] = e.message;
        });
        setErrors(errorObj);
      }
    }
  };

  const isFormValid = () => {
    return (
      title.trim() &&
      date.trim() &&
      priority.trim() &&
      assign.trim() &&
      status.trim() &&
      des.trim() &&
      Object.keys(errors).length === 0
    );
  };

  const onSelectDate = () => {
    setShowCalendar(!showCalendar);
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    date: yup.date().required("Due Date is required"),

    priority: yup.string().required("Priority is required"),
    assign: yup.string().required("Assign is required"),
    status: yup.string().required("Status is required"),
    des: yup.string().required("Description is required"),
  });

  return (
    <div
      id="content"
      className="bg-white border border-gray-200 rounded-md m-4 md:m-10"
    >
      <body>
        {/* Alert Message */}
        {alertMessage && (
          <Alert severity={alertMessage.type} className="mb-4 mx-2 md:mx-4">
            {alertMessage.text}
          </Alert>
        )}

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 p-4">
          {/* Title Field */}
          <div>
            <ListItem>
              <TextField
                className={`w-full border ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                type="text"
                value={title}
                onChange={(e) => {
                  if (e.target.value.length <= 30) {
                    setTitle(e.target.value);
                  }
                }}
                id="outlined-basic"
                label="Title"
                variant="outlined"
              />
            </ListItem>
          </div>
          {/* Due Date Field */}

          <div>
            <ListItem>
              <TextField
                className="w-full"
                type="text"
                value={startDate ? startDate.toLocaleDateString() : ""}
                onChange={() => {}}
                id="outlined-basic"
                label="Due Date"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <i
                        onClick={onSelectDate}
                        className="bx bx-calendar text-xl cursor-pointer"
                      ></i>
                    </InputAdornment>
                  ),
                }}
              />
            </ListItem>

            {/* Calendar */}
            {showCalendar && (
              <div className="absolute mt-2 z-10">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    setDate(date?.toLocaleDateString() || "");
                    setShowCalendar(false);
                  }}
                  dateFormat="dd/MM/yyyy"
                  showYearDropdown
                  scrollableMonthYearDropdown
                  inline
                  minDate={new Date()}
                />
                ;
              </div>
            )}
          </div>

          {/* Priority Field */}
          <div>
            <ListItem>
              <FormControl
                className={`w-full border ${
                  errors.priority ? "border-red-500" : "border-gray-300"
                }`}
              >
                <InputLabel id="Priority">Priority</InputLabel>
                <Select
                  labelId="Priority"
                  id="Priority"
                  value={priority}
                  label="Priority"
                  onChange={handlePriority}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Normal">Normal</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
            </ListItem>
          </div>
          {/* Status Field */}
          <div>
            <ListItem>
              <TextField
                className={`w-full border ${
                  errors.status ? "border-red-500" : "border-gray-300"
                }`}
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                id="outlined-basic"
                label="Status"
                variant="outlined"
              />
            </ListItem>
          </div>
          {/* Assignee Field */}
          <div>
            <ListItem>
              <FormControl
                className={`w-full border ${
                  errors.assign ? "border-red-500" : "border-gray-300"
                }`}
              >
                <InputLabel id="Assignee">Assignee</InputLabel>
                <Select
                  labelId="Assignee"
                  id="Assignee"
                  value={assign}
                  label="Assignee"
                  onChange={handleAssign}
                >
                  <MenuItem value="Saeed Ahmed">Saeed Ahmed</MenuItem>
                  <MenuItem value="Mehedi Hasan">Mehedi Hasan</MenuItem>
                  <MenuItem value="Aminul Islam">Aminul Islam</MenuItem>
                  <MenuItem value="Abdul Majid">Abdul Majid</MenuItem>
                  <MenuItem value="Muhammad Ali">Muhammad Ali</MenuItem>
                  <MenuItem value="Muhammad Hashir">Muhammad Hashir</MenuItem>
                </Select>
              </FormControl>
            </ListItem>
          </div>
          {/* Description Field */}
          <div>
            <ListItem>
              <TextField
                className={`w-full border ${
                  errors.des ? "border-red-500" : "border-gray-300"
                }`}
                type="text"
                value={des}
                onChange={(e) => {
                  if (e.target.value.length <= 50) {
                    setDes(e.target.value);
                  }
                }}
                id="outlined-basic"
                label="Description"
                variant="outlined"
              />
            </ListItem>
          </div>
        </div>

        {/* Create Task Button */}
        <div className="flex justify-end mt-6 mb-4 mr-4 md:mr-10">
          <Button
            onClick={handleCreateTask}
            variant="contained"
            className={`w-32 sm:w-40 text-white h-10 font-semibold ${
              isFormValid()
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isFormValid()}
          >
            {btnTitle}
          </Button>
        </div>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Create Task Successful</DialogTitle>
          <DialogContent>
            <p>You have created a task successfully!</p>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpen(false)}
              color="primary"
              variant="contained"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </body>
    </div>
  );
};

export default Content;
