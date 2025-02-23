import { useDraggable } from "@dnd-kit/core";
import { CSS } from '@dnd-kit/utilities';
import type Todo from "~/types/Todo";

const TodoItem = ({ todo }: { todo: Todo }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: todo.id.toString(),
    });

    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className='p-4 mb-2 bg-background-500 rounded shadow'>
            <h3 className='font-bold'>{todo.title}</h3>
            <p>{todo.description}</p>
        </div>
    );
};

export default TodoItem;