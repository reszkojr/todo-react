import { useState } from 'react';
import { LuPlus, LuX, LuColumns3 } from 'react-icons/lu';
import { Link, Outlet } from 'react-router';
import Button from '~/components/Button';
import { useTodo } from '~/contexts/todo/todo.context';
import type Todo from '~/types/Todo';

const statuses = {
    pending: 'Pending',
    'in progress': 'In Progress',
    completed: 'Completed',
};

export default function Sidebar() {
    const { todos, setActiveTodo, createTodo, isSidebarOpen, toggleSidebar } = useTodo();
    const [activeStatus, setActiveStatus] = useState<keyof typeof statuses>('pending');

    const handleTodoClick = (todo: Todo) => {
        toggleSidebar();
        setActiveTodo(todo);
    };

    const handleCreateTodo = async () => {
        const newTodo: Todo = {
            title: 'New Todo',
            description: 'This is a new todo',
            status: 'pending',
        };
        const returnedTodo = await createTodo(newTodo);
        setActiveTodo(returnedTodo);
    };

    return (
        <div className='flex'>
            <div
                className={`flex flex-col w-10/12 h-screen bg-background-800 md:relative md:w-1/4 fixed top-0 left-0 z-50 p-4 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className='flex justify-between items-center mb-3'>
                    <h1 className='text-2xl font-bold text-white'>To-do list</h1>
                    <div className='flex items-center space-x-2'>
                        <Link to='/todos/view/columns' className='text-teal-700 hover:text-teal-800 transition-all duration-175 hidden md:block' title='Return to Columns view'>
                            <LuColumns3 size={24} />
                        </Link>
                        <button onClick={toggleSidebar} className='text-white block md:hidden'>
                            <LuX size={24} />
                        </button>
                    </div>
                </div>
                <div className='flex flex-col flex-1 overflow-y-auto'>
                    {Object.keys(statuses).map((status) => (
                        <div key={status} className='mb-4'>
                            <div className="flex items-center justify-center w-full gap-3">
                                <h2 className='text-sm font-bold mb-2 whitespace-nowrap text-gray-50'>{statuses[status as keyof typeof statuses]}</h2>
                                <div className="border-t-1 border-gray-50 w-full"></div>
                            </div>
                            <div className='space-y-2 ml-3'>
                                {todos
                                    .filter((todo) => todo.status === status)
                                    .map((todo) => (
                                        <div
                                            key={todo.id}
                                            className='p-2 bg-background-500 rounded cursor-pointer hover:bg-gray-600'
                                            onClick={() => handleTodoClick(todo)}
                                        >
                                            <h3 className='font-bold text-sm'>{todo.title}</h3>
                                            <p className='text-sm truncate'>{todo.description}</p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className='absolute bottom-0 left-0 w-full p-4 cursor-pointer bg-background-700 bg-opacity-75 backdrop-blur-md text-white flex items-center justify-center space-x-2'
                    onClick={handleCreateTodo}
                >
                    <LuPlus size={18} />
                    <span>Create Todo</span>
                </button>
            </div>
            <div className='flex-1 relative'>
                <Outlet />
            </div>
        </div>
    );
};