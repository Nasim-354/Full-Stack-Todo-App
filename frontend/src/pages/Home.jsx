import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Home.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <div className="container">
        <div className="hero-section">
          <h1 className="hero-title">
            Welcome to <span className="highlight">Task Manager</span>
          </h1>
          <p className="hero-subtitle">
            Organize your tasks efficiently and boost your productivity
          </p>

          <div className="hero-actions">
            {user ? (
              <Link to="/dashboard" className="btn btn-large btn-primary">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-large btn-primary">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-large btn-outline">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="features-section">
          <h2 className="section-title">Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>Task Management</h3>
              <p>Create, update, and organize your tasks with ease</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Priority Levels</h3>
              <p>Set priorities to focus on what matters most</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Track Progress</h3>
              <p>Monitor your task status from To Do to Done</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Due Dates</h3>
              <p>Never miss a deadline with due date reminders</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Search & Filter</h3>
              <p>Quickly find tasks with powerful search and filters</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Private</h3>
              <p>Your tasks are secure and accessible only to you</p>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Ready to Get Organized?</h2>
          <p>Start managing your tasks efficiently today</p>
          {!user && (
            <Link to="/register" className="btn btn-large btn-primary">
              Create Free Account
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;