import { useState, useEffect } from 'react';
import { useTodo } from '~/contexts/todo/todo.context';
import Button from '~/components/Button';
import { LuMenu, LuPlus, LuClipboard, LuTrash2, LuTrash } from 'react-icons/lu';
import { toast } from 'react-toastify';

const Sidebar = () => {
	const { activeTodo, updateTodo, isSidebarOpen, setActiveTodo, toggleSidebar, deleteTodo } = useTodo();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	useEffect(() => {
		if (activeTodo) {
			setTitle(activeTodo.title);
			setDescription(activeTodo.description);
		}
	}, [activeTodo]);

	const handleSave = async () => {
		if (activeTodo) {
			await updateTodo({
				...activeTodo,
				title,
				description,
			});
			toast.success(`Todo "${title}" updated successfully!`);
		}
	};

    const handleDelete = async () => {
        if (activeTodo) {
            await deleteTodo(activeTodo);
            toast.success(`Todo "${activeTodo.title}" deleted successfully!`);
            setActiveTodo(null);
        }
    };

	if (!activeTodo) {
		return (
			<>
				<div className='flex justify-between items-center mb-4 p-3 md:p-12'>
					<button type='button' onClick={toggleSidebar} className='w-auto text-sm block md:hidden'>
						<LuMenu size={18} />
					</button>
				</div>
				<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center h-full p-3 md:p-12'>
					<LuClipboard size={64} className='text-gray-400 mb-4' />
					<h3 className='text-gray-500 text-center w-10/12'>Please select a todo on the panel on the side to start editing.</h3>
				</div>
			</>
		);
	}

	return (
		<div className='p-3 md:p-12'>
			<div className='flex justify-between sm:justify-end items-center w-full mb-4'>
				<button type='button' onClick={toggleSidebar} className='w-auto text-sm block md:hidden'>
					<LuMenu size={18} />
				</button>
				<Button type='button' label='Save' onClick={handleSave} className='w-auto text-sm' />
			</div>
			<h1 className='text-2xl font-bold'>Edit Todo</h1>
			<div className='mb-4'>
				<label className='block text-sm font-medium text-gray-700'>Title</label>
				<input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className='mt-1 block w-full px-3 py-2 bg-background-600 border border-background-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm' />
			</div>
			<div className='mb-4'>
				<label className='block text-sm font-medium text-gray-700'>Description</label>
				<textarea value={description} onChange={(e) => setDescription(e.target.value)} className='mt-1 block w-full h-80 px-3 py-2 bg-background-600 border border-background-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm' />
			</div>
            <div>
                <button
                    type='button'
                    onClick={handleDelete}
                    className='cursor-pointer p-1 text-red-500 hover:text-red-700'
                >
                    <LuTrash size={25} />
                </button>
            </div>
		</div>
	);
};

export default Sidebar;
