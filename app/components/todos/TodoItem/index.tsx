import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { LuGripHorizontal, LuTrash } from 'react-icons/lu';
import type Todo from '~/types/Todo';
import { useTodo } from '~/contexts/todo/todo.context';

const TodoItem = ({ todo }: { todo: Todo }) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: todo.id!.toString(),
	});

	const { deleteTodo } = useTodo();

	const style = {
		transform: CSS.Translate.toString(transform),
	};

	const handleDelete = async () => {
		await deleteTodo(todo);
	};

	return (
		<div ref={setNodeRef} style={style} className='relative p-4 mb-2 bg-background-500 w-[320px] rounded shadow group flex items-center justify-between min-h-20 max-h-50'>
			<div className='flex items-center justify-between w-full'>
				<div>
					<h3 className='font-bold'>{todo.title}</h3>
					<p className='line-clamp-6'>{todo.description}</p>
				</div>
				<button {...listeners} {...attributes} className='cursor-grab mr-2 mix-blend-soft-light'>
					<LuGripHorizontal size={20} />
				</button>
			</div>
			<button className='absolute top-[1px] right-[1px] cursor-pointer p-1 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity' onClick={handleDelete}>
				<LuTrash size={18} />
			</button>
		</div>
	);
};

export default TodoItem;