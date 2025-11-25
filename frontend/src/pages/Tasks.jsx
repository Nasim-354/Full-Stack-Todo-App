import { useState, useEffect } from 'react';
import api from '../config/api';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import './Tasks.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: ''
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [tasks, filters]);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...tasks];

    // Filter by status
    if (filters.status) {
      result = result.filter((task) => task.status === filters.status);
    }

    // Filter by priority
    if (filters.priority) {
      result = result.filter((task) => task.priority === filters.priority);
    }

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(searchLower) ||
          (task.description && task.description.toLowerCase().includes(searchLower))
      );
    }

    setFilteredTasks(result);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      if (response.data.success) {
        setTasks([response.data.data, ...tasks]);
        setShowForm(false);
        alert('Task created successfully!');
      }
    } catch (error) {
      console.error('Error creating task:', error);
      alert(error.response?.data?.message || 'Failed to create task');
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const response = await api.put(`/tasks/${editingTask._id}`, taskData);
      if (response.data.success) {
        setTasks(
          tasks.map((task) =>
            task._id === editingTask._id ? response.data.data : task
          )
        );
        setShowForm(false);
        setEditingTask(null);
        alert('Task updated successfully!');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      alert(error.response?.data?.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      const response = await api.delete(`/tasks/${taskId}`);
      if (response.data.success) {
        setTasks(tasks.filter((task) => task._id !== taskId));
        alert('Task deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      alert(error.response?.data?.message || 'Failed to delete task');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      priority: '',
      search: ''
    });
  };

  if (loading) {
    return (
      <div className="tasks-page">
        <div className="container">
          <div className="loading">Loading tasks...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="tasks-page">
      <div className="container">
        {/* Header */}
        <div className="tasks-header">
          <h1>My Tasks</h1>
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
          >
            + Create Task
          </button>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filter-group">
            <label htmlFor="search">Search</label>
            <input
              type="text"
              id="search"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search tasks..."
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Status</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={filters.priority}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {(filters.status || filters.priority || filters.search) && (
            <button onClick={clearFilters} className="btn-clear-filters">
              Clear Filters
            </button>
          )}
        </div>

        {/* Task Count */}
        <div className="task-count">
          Showing {filteredTasks.length} of {tasks.length} tasks
        </div>

        {/* Tasks Grid */}
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              {tasks.length === 0 ? '📭' : '🔍'}
            </div>
            <h3>
              {tasks.length === 0 ? 'No tasks yet' : 'No tasks found'}
            </h3>
            <p>
              {tasks.length === 0
                ? 'Create your first task to get started!'
                : 'Try adjusting your filters'}
            </p>
            {tasks.length === 0 && (
              <button
                onClick={() => setShowForm(true)}
                className="btn btn-primary"
              >
                Create Your First Task
              </button>
            )}
          </div>
        ) : (
          <div className="tasks-grid">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}

        {/* Task Form Modal */}
        {showForm && (
          <TaskForm
            task={editingTask}
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            onCancel={handleCloseForm}
          />
        )}
      </div>
    </div>
  );
};

export default Tasks;