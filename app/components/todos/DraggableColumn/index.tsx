import { useDroppable } from '@dnd-kit/core';

const DroppableColumn = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => {
	const { setNodeRef } = useDroppable({
		id,
	});

	return (
		<div ref={setNodeRef} className='w-[350px] max-h-[80vh] overflow-auto p-4 bg-background-600 rounded-md'>
            <h2 className='mb-4 text-xs uppercase font-semibold text-gray-100 mix-blend-soft-light'>{title}</h2>
			{children}
		</div>
	);
};

export default DroppableColumn;
