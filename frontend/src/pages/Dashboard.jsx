import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../config/api';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch statistics
      const statsResponse = await api.get('/tasks/stats');
      setStats(statsResponse.data.data);

      // Fetch recent tasks (limit to 5)
      const tasksResponse = await api.get('/tasks');
      setRecentTasks(tasksResponse.data.data.slice(0, 5));

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="container">
          <div className="loading">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>Welcome back, {user?.name}! 👋</h1>
            <p className="dashboard-subtitle">Here's an overview of your tasks</p>
          </div>
          <Link to="/tasks" className="btn btn-primary">
            View All Tasks
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card stat-total">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>Total Tasks</h3>
              <p className="stat-number">{stats?.total || 0}</p>
            </div>
          </div>

          <div className="stat-card stat-todo">
            <div className="stat-icon">📝</div>
            <div className="stat-content">
              <h3>To Do</h3>
              <p className="stat-number">{stats?.byStatus['To Do'] || 0}</p>
            </div>
          </div>

          <div className="stat-card stat-progress">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <h3>In Progress</h3>
              <p className="stat-number">{stats?.byStatus['In Progress'] || 0}</p>
            </div>
          </div>

          <div className="stat-card stat-done">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>Completed</h3>
              <p className="stat-number">{stats?.byStatus['Done'] || 0}</p>
            </div>
          </div>
        </div>

        {/* Priority Breakdown */}
        <div className="priority-section">
          <h2>Tasks by Priority</h2>
          <div className="priority-grid">
            <div className="priority-card priority-high">
              <span className="priority-label">High Priority</span>
              <span className="priority-count">{stats?.byPriority['High'] || 0}</span>
            </div>
            <div className="priority-card priority-medium">
              <span className="priority-label">Medium Priority</span>
              <span className="priority-count">{stats?.byPriority['Medium'] || 0}</span>
            </div>
            <div className="priority-card priority-low">
              <span className="priority-label">Low Priority</span>
              <span className="priority-count">{stats?.byPriority['Low'] || 0}</span>
            </div>
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="recent-tasks-section">
          <div className="section-header">
            <h2>Recent Tasks</h2>
            <Link to="/tasks" className="view-all-link">
              View All →
            </Link>
          </div>

          {recentTasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3>No tasks yet</h3>
              <p>Create your first task to get started!</p>
              <Link to="/tasks" className="btn btn-primary">
                Create Task
              </Link>
            </div>
          ) : (
            <div className="recent-tasks-list">
              {recentTasks.map((task) => (
                <div key={task._id} className="recent-task-item">
                  <div className="task-info">
                    <h4>{task.title}</h4>
                    <p>{task.description || 'No description'}</p>
                  </div>
                  <div className="task-meta">
                    <span className={`status-badge ${task.status.replace(' ', '-').toLowerCase()}`}>
                      {task.status}
                    </span>
                    <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;