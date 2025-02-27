import { useState, type FC, type FormEvent, type SelectHTMLAttributes } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import FloatingTextInput from '~/components/FloatingTextInput';
import Button from '~/components/Button';
import type Todo from '~/types/Todo';
import { toast } from 'react-toastify';

interface CreateTodoProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	handleClose: () => void;
	handleCreate: (todo: Todo) => void;
}

const CreateTodo: FC<CreateTodoProps> = ({ isOpen, setIsOpen, handleClose, handleCreate }) => {
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [status, setStatus] = useState<'pending' | 'in progress' | 'completed' | ''>('');

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (status === '') {
			return toast.error('Please select a valid status.');
		}

		handleCreate({ title, description, status: status as 'pending' | 'in progress' | 'completed' });
		setTitle('');
		setDescription('');
		setStatus('');
		handleClose();
	};

	const handleSelectStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const status = event.target.value;

        setStatus(status as 'pending' | 'in progress' | 'completed' | '');
	};

	return (
		<Dialog open={isOpen} onClose={handleClose} className='fixed inset-0 z-10 overflow-y-auto transition duration-300 ease-out data-[closed]:opacity-0'>
			<DialogBackdrop className='fixed inset-0 bg-black/30' />
			<div className='flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0'>
				<span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
					&#8203;
				</span>
				<DialogPanel className='inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
					<div className='bg-background-500 p-4 border-b border-background-200'>
						<DialogTitle className='text-2xl font-serif font-bold text-white'>Create New Todo</DialogTitle>
					</div>
					<form onSubmit={onSubmit}>
						<div className='px-6 pt-6'>
							<FloatingTextInput label='Title' name='title' type='text' register={() => ({ onChange: (e: any) => setTitle(e.target.value), value: title })} requiredMessage='Title is required' errorMessage='' />
							<FloatingTextInput label='Description' name='description' type='text' register={() => ({ onChange: (e: any) => setDescription(e.target.value), value: description })} requiredMessage='Description is required' errorMessage='' />
							<div className='mt-4'>
								<select id='status' name='status' className='w-full px-3 py-4 mt-1 rounded-xl border-0 shadow-sm bg-gray-700 text-teal-100 focus:outline-none focus:ring focus:ring-teal-500' value={status} onChange={handleSelectStatus}>
									<option value=''>Status</option>
									<option value='pending'>Pending</option>
									<option value='in progress'>In Progress</option>
									<option value='completed'>Completed</option>
								</select>
							</div>
						</div>
						<div className='bg-background-500 px-4 gap-3 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
							<Button type='submit' label='Create' className='text-sm' />
							<Button type='button' label='Cancel' onClick={handleClose} className='text-sm' />
						</div>
					</form>
				</DialogPanel>
			</div>
		</Dialog>
	);
};

export default CreateTodo;
