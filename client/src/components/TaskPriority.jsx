import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Tooltip from "./utils/Tooltip";

const TaskPriority = ({ task, handleDelete, className }) => {
  const navigate = useNavigate();
  
  return (
    <div className={`${className} my-4 p-4 text-gray-600 rounded-md shadow-md`}>
      <div className="flex">
        <div className="flex w-[80%]">
          <Tooltip text={"View Full Details"}>
            <div
              className="font-medium cursor-pointer w-1/3 hover:scale-110"
              onClick={() => navigate(`/tasksdetail/${task._id}`)}
            >
              {task.title}
            </div>
          </Tooltip>
          <Tooltip text={"Status"}>
            <div className="w-1/3">{task.status}</div>
          </Tooltip>
          <Tooltip text={"Due Date"}>
            <div className="w-1/3">
              {new Date(task.dueDate).toLocaleDateString()}
            </div>
          </Tooltip>
        </div>
        <Tooltip text={"Edit this task"} position={"top"}>
          <Link
            to={`/tasks/${task._id}`}
            className="ml-auto mr-2 text-green-600 cursor-pointer hover:scale-110"
          >
            <i className="fa-solid fa-pen"></i>
          </Link>
        </Tooltip>
        <Tooltip text={"Delete this task"} position={"top"}>
          <span
            className="text-red-500 cursor-pointer hover:scale-110"
            onClick={() => handleDelete(task._id)}
          >
            <i className="fa-solid fa-trash"></i>
          </span>
        </Tooltip>
      </div>
    </div>
  );
};

export default TaskPriority;
