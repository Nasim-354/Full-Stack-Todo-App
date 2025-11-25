import './TaskCard.css';

const TaskCard = ({ task, onEdit, onDelete }) => {
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get status class
  const getStatusClass = (status) => {
    switch (status) {
      case 'To Do':
        return 'status-todo';
      case 'In Progress':
        return 'status-progress';
      case 'Done':
        return 'status-done';
      default:
        return '';
    }
  };

  // Get priority class
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'Low':
        return 'priority-low';
      case 'Medium':
        return 'priority-medium';
      case 'High':
        return 'priority-high';
      default:
        return '';
    }
  };

  return (
    <div className="task-card">
      <div className="task-card-header">
        <h3 className="task-title">{task.title}</h3>
        <div className="task-badges">
          <span className={`badge status-badge ${getStatusClass(task.status)}`}>
            {task.status}
          </span>
          <span className={`badge priority-badge ${getPriorityClass(task.priority)}`}>
            {task.priority}
          </span>
        </div>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-card-footer">
        <div className="task-date">
          <span className="date-icon">📅</span>
          <span>{formatDate(task.dueDate)}</span>
        </div>

        <div className="task-actions">
          <button
            onClick={() => onEdit(task)}
            className="btn-icon btn-edit"
            title="Edit Task"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="btn-icon btn-delete"
            title="Delete Task"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;