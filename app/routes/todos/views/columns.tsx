import { useEffect, useState } from 'react';
import { DndContext, DragOverlay, type DragEndEvent, type DragStartEvent, type UniqueIdentifier } from '@dnd-kit/core';
import type Todo from '~/types/Todo';
import DroppableColumn from '~/components/todos/DraggableColumn';
import TodoItem from '~/components/todos/TodoItem';
import { useTodo } from '~/contexts/todo/todo.context';
import Button from '~/components/Button';
import { LuPanelRight, LuPlus } from 'react-icons/lu';
import CreateTodo from '~/components/todos/CreateTodo/';
import { Link } from 'react-router';

const statuses = {
    pending: 'Pending',
    'in progress': 'In Progress',
    completed: 'Completed',
};

const TodosPage = () => {
    const { todos, updateTodoStatus, createTodo } = useTodo();
    const [activeId, setActiveId] = useState<UniqueIdentifier | undefined>(undefined);
    const [droppedItem, setDroppedItem] = useState<UniqueIdentifier | undefined>(undefined);
    const [todosElements, setTodosElements] = useState<Todo[]>(todos);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const findTodoById = (id: UniqueIdentifier) => todos.find((todo) => todo.id?.toString() === id);

    useEffect(() => {
        setTodosElements(todos);
    }, [todos]);

    const updateItems = (event: DragEndEvent) => {
        const { active, over } = event;

        setActiveId(undefined);
        if (event.over) setDroppedItem(event.active.id);

        if (over) {
            const activeTodo = todos.find((todo) => todo.id?.toString() === active.id);
            const overStatus = over.id;

            if (activeTodo) {
                setTodosElements((prevTodos) => prevTodos.map((todo) => (todo.id === activeTodo.id ? { ...todo, status: overStatus } : todo)) as Array<Todo>);
                updateTodoStatus(activeTodo.id!, overStatus as 'pending' | 'in progress' | 'completed');
            }
        }
    };

    const handleCreate = async (newTodo: Todo) => {
        await createTodo(newTodo);
        setIsModalOpen(false);
    };

    return (
        <div id='todos' className='h-full'>
            <div className='flex justify-between pt-6 mt-8 pb-4 mb-4 border-b-1 mx-8 border-b-background-300'>
                <h1 className='text-4xl font-bold'>To-do list</h1>
                <div className="flex items-center gap-6">
                    <Link to='/todos/view/sidebar' className='text-teal-700 hover:text-teal-800 transition-all duration-175' title='View as a sidebar/active Todo'>
                        <LuPanelRight size={26} />
                    </Link>
                    <Button startIcon={<LuPlus size={18} />} type='button' label='Create a Todo' className='text-sm' onClick={() => setIsModalOpen(true)} />
                </div>
            </div>
            <DndContext onDragStart={(event: DragStartEvent) => setActiveId(event.active.id)} onDragEnd={updateItems}>
                <div className='flex space-x-4 pt-3 px-8'>
                    {Object.keys(statuses).map((status) => (
                        <DroppableColumn key={status} id={status} title={statuses[status as keyof typeof statuses]}>
                            {todosElements
                                .filter((todo) => todo.status === status)
                                .map((todo) => (
                                    <TodoItem key={todo.id} todo={todo} />
                                ))}
                        </DroppableColumn>
                    ))}
                    <DragOverlay>{activeId && <TodoItem todo={findTodoById(activeId)!} />}</DragOverlay>
                </div>
            </DndContext>
            <CreateTodo isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} setIsOpen={setIsModalOpen} handleCreate={handleCreate} />
        </div>
    );
};

export default TodosPage;
