import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tasks from '../components/Tasks';
import MainLayout from '../layouts/MainLayout';

const Home = () => {

  const authState = useSelector(state => state.authReducer);
  const { isLoggedIn } = authState;

  useEffect(() => {
    document.title = authState.isLoggedIn ? `${authState.user.name}'s tasks` : "Task Manager";
  }, [authState]);



  return (
    <>
      <MainLayout>
        {!isLoggedIn ? (
          <div className='flex flex-col justify-center items-center bg-gray-300 w-full h-[90%] py-8 text-center m-0'>
            <h1 className='text-5xl'>Welcome to <span className="font-bold text-white md:bg-gray-700 p-5 rounded-lg"> WorkFlow <span className='text-emerald-400'>Wizard</span></span> a Task Manager App</h1>
            <Link to="/signup" className='mt-10 text-xl block space-x-2 hover:space-x-4 group'>
              <span className='transition-[margin]'>Join now to manage your tasks</span>
              <span className='relative ml-4 text-base transition-[margin]'><i className="fa-solid fa-arrow-right group-hover:text-emerald-400"></i></span>
            </Link>
          </div>
        ) : (
          <>
            <h1 className='w-fit text-lg font-semibold mt-8 mx-8'><span className='mx-1 text-black border-b-2 border-emerald-600'>Welcome</span> <span className='text-emerald-600 border-b-2 border-black'>{authState.user.name}</span></h1>
            <Tasks />
          </>
        )}
      </MainLayout>
    </>
  )
}

export default Home