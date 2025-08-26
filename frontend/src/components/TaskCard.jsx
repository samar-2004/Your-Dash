import React from 'react';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4757';
      case 'medium': return '#ffa502';
      case 'low': return '#26de81';
      default: return '#747d8c';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#26de81';
      case 'in-progress': return '#3742fa';
      case 'pending': return '#ffa502';
      default: return '#747d8c';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const isOverdue = (dueDate) => {
    if (!dueDate || task.status === 'completed') return false;
    return new Date(dueDate) < new Date();
  };

  return (
    <div className={`task-card ${isOverdue(task.dueDate) ? 'overdue' : ''}`}>
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <div className="task-actions">
          <button 
            onClick={() => onEdit(task)}
            className="edit-btn"
            title="Edit task"
          >
            ✏️
          </button>
          <button 
            onClick={() => onDelete(task._id)}
            className="delete-btn"
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        <div className="task-priority">
          <span 
            className="priority-badge"
            style={{ backgroundColor: getPriorityColor(task.priority) }}
          >
            {task.priority}
          </span>
        </div>

        <div className="task-status">
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task._id, e.target.value)}
            className="status-select"
            style={{ color: getStatusColor(task.status) }}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="task-footer">
        <div className="task-due-date">
          <span className={isOverdue(task.dueDate) ? 'overdue-text' : ''}>
            📅 {formatDate(task.dueDate)}
          </span>
        </div>
        {task.category && (
          <div className="task-category">
            <span className="category-tag">#{task.category}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;