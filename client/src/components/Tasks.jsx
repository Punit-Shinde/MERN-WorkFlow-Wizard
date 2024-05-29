import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "./utils/Loader";
import TaskPriority from "./TaskPriority";

const Tasks = () => {
  const authState = useSelector((state) => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 7;
  const [fetchData, { loading }] = useFetch();

  const fetchTasks = useCallback(() => {
    const config = {
      url: "/tasks",
      method: "get",
      headers: { Authorization: authState.token },
    };
    fetchData(config, { showSuccessToast: false }).then((data) =>
      setTasks(data.tasks)
    );
  }, [authState.token, fetchData]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    const config = {
      url: `/tasks/${id}`,
      method: "delete",
      headers: { Authorization: authState.token },
    };
    fetchData(config).then(() => fetchTasks());
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(tasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const currentTasks = tasks.slice(startIndex, startIndex + tasksPerPage);

  const lowPriorityTasks = currentTasks.filter(task => task.priority === 'low');
  const normalPriorityTasks = currentTasks.filter(task => task.priority === 'normal');
  const highPriorityTasks = currentTasks.filter(task => task.priority === 'high');

  return (
    <>
      <div className="my-2 mx-auto max-w-[700px] py-4 border-2 px-4 bg-zinc-800 rounded-lg">
        {tasks.length !== 0 && (
          <h2 className="my-2 ml-2 md:ml-0 text-xl text-emerald-500">
            Your Tasks: <span className="text-white">{tasks.length}</span>
          </h2>
        )}
        {loading ? (
          <Loader />
        ) : (
          <div>
            {tasks.length === 0 ? (
              <div className="w-[600px] h-[300px] flex items-center justify-center gap-4">
                <span>No tasks found</span>
                <Link
                  to="/tasks/add"
                  className="bg-emerald-500 text-white hover:bg-emerald-700 font-medium rounded-md px-4 py-2"
                >
                  + Add new task{" "}
                </Link>
              </div>
            ) : (
              <>
                <div className="flex flex-col">
                  <div >
                    <h3 className="text-lg font-medium text-center text-green-100">Low Priority</h3>
                    {lowPriorityTasks.map((task) => (
                      <TaskPriority key={task._id} task={task} handleDelete={handleDelete} className="bg-green-100" />
                    ))}
                  </div>
                  <div >
                    <h3 className="text-lg font-medium text-center text-yellow-100">Normal Priority</h3>
                    {normalPriorityTasks.map((task) => (
                      <TaskPriority key={task._id} task={task} handleDelete={handleDelete} className="bg-yellow-100" />
                    ))}
                  </div>
                  <div >
                    <h3 className="text-lg font-medium text-center text-red-100">High Priority</h3>
                    {highPriorityTasks.map((task) => (
                      <TaskPriority key={task._id} task={task} handleDelete={handleDelete} className="bg-red-100" />
                    ))}
                  </div>
                </div>

                {tasks.length > tasksPerPage && (
                  <div className="flex justify-center mt-4">
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        className={`mx-1 px-3 py-1 rounded ${
                          currentPage === index + 1
                            ? "bg-emerald-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Tasks;
