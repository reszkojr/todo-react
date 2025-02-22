import React, { useState } from 'react';
import { DndContext, useDraggable, useDroppable, type DragEndEvent } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type Todo from '~/types/Todo';

const statuses = {
	pending: 'Pending',
	'in progress': 'In Progress',
	completed: 'Completed',
};

const initialTodos: Array<Todo> = [
	{ id: 1, title: 'Todo 1', description: 'Description 1', status: 'pending' },
	{ id: 2, title: 'Todo 2', description: 'Description 2', status: 'in progress' },
	{ id: 3, title: 'Todo 3', description: 'Description 3', status: 'completed' },
];

const TodoItem = ({ todo }: { todo: Todo }) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: todo.id.toString(),
	});

	const style = {
		transform: CSS.Translate.toString(transform),
	};

	return (
		<div ref={setNodeRef} style={style} {...listeners} {...attributes} className='p-4 mb-2 bg-gray-700 rounded shadow'>
			<h3 className='font-bold'>{todo.title}</h3>
			<p>{todo.description}</p>
		</div>
	);
};

const DroppableColumn = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => {
	const { setNodeRef } = useDroppable({
		id,
	});

	return (
		<div ref={setNodeRef} className='w-1/3 p-4 bg-gray-800 rounded'>
			<h2 className='mb-4 text-xl font-bold'>{title}</h2>
			{children}
		</div>
	);
};

const TodosPage = () => {
	const [todos, setTodos] = useState(initialTodos);

	const updateItems = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over) {
			const activeTodo = todos.find((todo) => todo.id.toString() === active.id);
			const overStatus = over.id;

			if (activeTodo && activeTodo.status !== overStatus) {
				setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === activeTodo.id ? { ...todo, status: overStatus } : todo)) as Array<Todo>);
			}
		}
	};

	return (
		<DndContext onDragEnd={updateItems}>
			<div className='flex space-x-4 p-36'>
				{Object.keys(statuses).map((status) => (
					<DroppableColumn key={status} id={status} title={statuses[status as keyof typeof statuses]}>
						{todos
							.filter((todo) => todo.status === status)
							.map((todo) => (
								<TodoItem key={todo.id} todo={todo} />
							))}
					</DroppableColumn>
				))}
			</div>
		</DndContext>
	);
};

export default TodosPage;
