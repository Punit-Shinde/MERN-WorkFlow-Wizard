import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from '../components/utils/Loader';
import { useSelector } from "react-redux";
import MainLayout from '../layouts/MainLayout';

const TaskDetail = () => {
  const authState = useSelector((state) => state.authReducer);
  const [task, setTask] = useState(null);
  const [fetchData, { loading }] = useFetch();
  const { taskId } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    const config = { url: `/tasks/${taskId}`, method: "get", headers: { Authorization: authState.token } };
    fetchData(config, { showSuccessToast: false }).then((data) => {
      setTask(data.task);
    });
  }, [taskId, fetchData, authState.token]);

  return (
    <>
    <MainLayout>
      {loading ? (
        <Loader />
      ) : (
        task && (
            <div className='m-auto my-16 max-w-[1000px] bg-white  text-emerald-500 font-semibold p-8 border-2 shadow-md rounded-md'>
            <button className="bg-primary text-white px-4 py-2 font-medium hover:bg-primary-dark rounded-md" onClick={()=>navigate("/")}>Back</button>
            <h2 className='text-center mb-4 text-emerald-500'>Title: <span className='text-black font-normal'>{task.title}</span></h2> 
            <p className="mb-4 p-8">Description: <span className='text-black font-normal'>{task.description}</span></p>
            <div className=' flex justify-between items-center m-auto mb-2 max-w-[1000px] bg-white p-8'>
            <p className="mb-4 text-emerald-500">Status: <span className='text-black font-normal'>{task.status}</span></p>
            <p className="mb-4">Priority: <span className='text-black font-normal'>{task.priority}</span></p>
            <p className="mb-4">Due Date: <span className='text-black font-normal'>{new Date(task.dueDate).toLocaleDateString()}</span></p>
            </div>
          </div>
        )
      )}
      </MainLayout>
    </>
  );
};

export default TaskDetail;
