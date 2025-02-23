import { useEffect, useState } from 'react';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import type Todo from '~/types/Todo';
import DroppableColumn from '~/components/todos/DraggableColumn';
import TodoItem from '~/components/todos/TodoItem';
import { useTodo } from '~/contexts/todo/todo.context';
import Button from '~/components/Button';
import { LuPlus } from 'react-icons/lu';

const statuses = {
    pending: 'Pending',
    'in progress': 'In Progress',
    completed: 'Completed',
};

const TodosPage = () => {
    const { todos, updateTodoStatus, createTodo } = useTodo();
    const [todosElements, setTodosElements] = useState<Todo[]>(todos);

    useEffect(() => {
        setTodosElements(todos);
    }, [todos]);

    const updateItems = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over) {
            const activeTodo = todos.find((todo) => todo.id?.toString() === active.id);
            const overStatus = over.id;

            if (activeTodo) {
                setTodosElements((prevTodos) => prevTodos.map((todo) => (todo.id === activeTodo.id ? { ...todo, status: overStatus } : todo)) as Array<Todo>);
                updateTodoStatus(activeTodo.id!, overStatus as 'pending' | 'in progress' | 'completed');
            }
        }
    };

    return (
        <>
            <div className='flex justify-between p-3 mt-6 px-3'>
                <h1 className='text-2xl font-bold'>To-do list</h1>
                <Button
                    startIcon={<LuPlus />}
                    type='button'
                    label='Adicionar um Todo'
                    className='text-sm'
                    onClick={async () => {
                        const newTodo: Todo = {
                            title: 'New Todo',
                            description: 'New Todo',
                            status: 'pending',
                        };
                        await createTodo(newTodo);
                    }}
                />
            </div>
            <DndContext onDragEnd={updateItems}>
                <div className='flex space-x-4 p-3'>
                    {Object.keys(statuses).map((status) => (
                        <DroppableColumn key={status} id={status} title={statuses[status as keyof typeof statuses]}>
                            {todosElements
                                .filter((todo) => todo.status === status)
                                .map((todo) => (
                                    <TodoItem key={todo.id} todo={todo} />
                                ))}
                        </DroppableColumn>
                    ))}
                </div>
            </DndContext>
        </>
    );
};

export default TodosPage;
