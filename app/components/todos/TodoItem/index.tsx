import { useState, useRef, useEffect } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { LuGripHorizontal, LuPencil, LuTrash } from 'react-icons/lu';
import type Todo from '~/types/Todo';
import { useTodo } from '~/contexts/todo/todo.context';
import { toast } from 'react-toastify';

const TodoItem = ({ todo }: { todo: Todo }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: todo.id!.toString(),
    });

    const { deleteTodo, updateTodo } = useTodo();
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);
    const todoRef = useRef<HTMLDivElement>(null);

    const style = {
        transform: CSS.Translate.toString(transform),
    };

    const handleDelete = async () => {
        await deleteTodo(todo);
        toast.success(`Todo "${title}" deleted successfully!`);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        await updateTodo({
            ...todo,
            title,
            description,
        });
        setIsEditing(false);
        toast.success(`Todo "${title}" updated successfully!`);
    };

    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (todoRef.current && !todoRef.current.contains(event.target as Node)) {
                handleSave();
            }
        };
        if (isEditing) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditing, title, description]);

    return (
        <div ref={setNodeRef} style={style} className='relative p-4 mb-2 bg-background-500 w-[320px] rounded shadow group flex items-center justify-between min-h-20 max-h-50'>
            <div ref={todoRef} className='flex items-center justify-between w-full'>
                <div>
                    {isEditing ? (
                        <>
                            <input
                                type='text'
                                autoFocus
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className='bg-background-100 rounded-md border-1 border-background-200 w-11/12 font-bold'
                            />
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className='bg-background-100 rounded-md border-1 border-background-200 line-clamp-6 w-11/12 mt-3 h-25 max-h-28'
                            />
                        </>
                    ) : (
                        <>
                            <h3 className='font-bold'>{title}</h3>
                            <p className='line-clamp-6'>{description}</p>
                        </>
                    )}
                </div>
                <button {...listeners} {...attributes} className='cursor-grab mr-2 mix-blend-soft-light'>
                    <LuGripHorizontal size={20} />
                </button>
            </div>
            <div className='absolute top-[1px] right-[1px] flex space-x-1'>
                <button className='cursor-pointer p-1 text-teal-600 hover:text-teal-700 opacity-0 group-hover:opacity-100 transition-opacity' onClick={handleEdit}>
                    <LuPencil size={18} />
                </button>
                <button className='cursor-pointer p-1 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity' onClick={handleDelete}>
                    <LuTrash size={18} />
                </button>
            </div>
        </div>
    );
};

export default TodoItem;