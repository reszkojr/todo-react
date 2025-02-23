import { useDroppable } from '@dnd-kit/core';

const DroppableColumn = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => {
	const { setNodeRef } = useDroppable({
		id,
	});

	return (
		<div ref={setNodeRef} className='w-[400px] p-4 bg-background-600 rounded-md'>
			<h2 className='mb-4 text-sm uppercase font-semibold text-gray-300'>{title}</h2>
			{children}
		</div>
	);
};

export default DroppableColumn;
