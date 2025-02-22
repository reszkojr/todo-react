import { useDroppable } from "@dnd-kit/core";

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

export default DroppableColumn;