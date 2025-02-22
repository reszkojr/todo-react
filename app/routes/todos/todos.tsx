import React, { useState } from 'react';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import type Todo from '~/types/Todo';
import DroppableColumn from '~/components/todos/DraggableColumn';
import TodoItem from '~/components/todos/TodoItem';

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
