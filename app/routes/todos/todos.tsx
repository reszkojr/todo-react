import React, { use, useState } from 'react';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import type Todo from '~/types/Todo';
import DroppableColumn from '~/components/todos/DraggableColumn';
import TodoItem from '~/components/todos/TodoItem';
import { useTodo } from '~/contexts/todo.context';

const statuses = {
	pending: 'Pending',
	'in progress': 'In Progress',
	completed: 'Completed',
};


const TodosPage = () => {
    const { todos } = useTodo();

	const updateItems = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over) {
			const activeTodo = todos.find((todo) => todo.id.toString() === active.id);
			const overStatus = over.id;

            // TODO: update todo status on drag end
			// if (activeTodo && activeTodo.status !== overStatus) {
			// 	setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === activeTodo.id ? { ...todo, status: overStatus } : todo)) as Array<Todo>);
			// }
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
