import { useTasks } from '../hooks/useTasks.js';
import TaskCard from './TaskCard.jsx';

export default function TaskList({ limit }) {
	const { tasks, loading } = useTasks();
	const display = limit ? tasks.slice(0, limit) : tasks;
	return (
		<div className="flex flex-col gap-2">
			{loading && <div className="text-xs text-muted-foreground">Loading tasks...</div>}
			{!loading && display.length === 0 && <div className="text-xs text-muted-foreground">No tasks yet.</div>}
			{!loading && display.map(t => <TaskCard key={t._id || t.id} task={t} />)}
		</div>
	);
}
