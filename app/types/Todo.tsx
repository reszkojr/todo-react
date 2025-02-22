export default interface Todo {
    id: number;
    title: string;
    description: string;
    status: 'pending' | 'in progress' | 'completed';
}