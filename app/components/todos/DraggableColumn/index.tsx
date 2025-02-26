import { useDroppable, type UniqueIdentifier } from '@dnd-kit/core';

const DroppableColumn = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => {
	const { setNodeRef } = useDroppable({
		id,
	});

	return (
		<div ref={setNodeRef} className='w-[350px] h-50 overflow-y-auto overflow-x-hidden p-4 bg-background-600 rounded-md'>
			<h3 className='mb-4 text-xs uppercase font-semibold text-white-100 mix-blend-soft-light'>{title}</h3>
			{children}
		</div>
	);
};

export default DroppableColumn;