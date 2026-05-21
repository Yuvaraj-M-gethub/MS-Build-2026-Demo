import React, { useState, useEffect } from 'react';

// Sample data
const initialBugs = [
  {
    id: 1,
    title: 'Login form validation not working on mobile',
    description: 'Email validation regex fails for valid email addresses on iOS Safari. Users cannot submit the login form.',
    priority: 'High',
    status: 'Open'
  },
  {
    id: 2,
    title: 'Dashboard charts not rendering in Firefox',
    description: 'SVG charts appear blank in Firefox 120+. Console shows WebGL context errors.',
    priority: 'Medium',
    status: 'In Progress'
  },
  {
    id: 3,
    title: 'Memory leak in file upload component',
    description: 'Uploading large files (>50MB) causes browser tab to consume excessive memory and eventually crash.',
    priority: 'High',
    status: 'Open'
  },
  {
    id: 4,
    title: 'Typo in settings page header',
    description: 'Header says "Prefferences" instead of "Preferences".',
    priority: 'Low',
    status: 'Fixed'
  },
  {
    id: 5,
    title: 'API rate limit not enforced correctly',
    description: 'Rate limiting middleware allows 150 requests per minute instead of the documented 100.',
    priority: 'Medium',
    status: 'In Progress'
  },
  {
    id: 6,
    title: 'Dark mode toggle persists incorrectly',
    description: 'User preference for dark mode resets to light mode after browser refresh.',
    priority: 'Low',
    status: 'Fixed'
  },
  {
    id: 7,
    title: 'Database connection pool exhausted under load',
    description: 'Server returns 503 errors when concurrent users exceed 1000. Connection pool needs tuning.',
    priority: 'Critical',
    status: 'Open'
  },
  {
    id: 8,
    title: 'Notification bell icon misaligned',
    description: 'Bell icon in header is 2px lower than other icons. Inconsistent vertical alignment.',
    priority: 'Low',
    status: 'In Progress'
  }
];

const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];
const STATUSES = ['Open', 'In Progress', 'Fixed'];

// Priority badge component
const PriorityBadge = ({ priority }) => {
  const styles = {
    Low: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    Medium: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    High: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
    Critical: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[priority]}`}>
      {priority}
    </span>
  );
};

// Status badge component
const StatusBadge = ({ status }) => {
  const styles = {
    'Open': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    'In Progress': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    'Fixed': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
};

// Dark mode toggle component
const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 
                 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        // Sun icon
        <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        // Moon icon
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
};

// Filter buttons component
const FilterButtons = ({ currentFilter, setCurrentFilter }) => {
  const filters = ['All', ...STATUSES];
  
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setCurrentFilter(filter)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                     dark:focus:ring-offset-gray-900
                     ${currentFilter === filter
                       ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700'
                       : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                     }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

function App() {
  const [bugs, setBugs] = useState(initialBugs);
  const [showForm, setShowForm] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('All');
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize from localStorage
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Open'
  });

  // Apply dark mode class to html element and persist to localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBug = {
      id: bugs.length > 0 ? Math.max(...bugs.map(b => b.id)) + 1 : 1,
      ...formData
    };
    setBugs([newBug, ...bugs]);
    setFormData({
      title: '',
      description: '',
      priority: 'Medium',
      status: 'Open'
    });
    setShowForm(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Filter bugs based on current filter
  const filteredBugs = currentFilter === 'All' 
    ? bugs 
    : bugs.filter(bug => bug.status === currentFilter);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Bug Tracker
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Track and manage development issues
              </p>
            </div>
            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions Bar */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <FilterButtons currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />
          
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold 
                     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                     focus:ring-offset-2 dark:focus:ring-offset-gray-900 
                     transition-all duration-200 shadow-lg hover:shadow-xl
                     transform hover:scale-105 active:scale-95"
          >
            {showForm ? 'Cancel' : '+ Add Bug'}
          </button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {bugs.filter(b => b.status === 'Open').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Open Issues</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {bugs.filter(b => b.status === 'In Progress').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">In Progress</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {bugs.filter(b => b.status === 'Fixed').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Fixed</div>
          </div>
        </div>

        {/* Add Bug Form */}
        {showForm && (
          <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Add New Bug
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           transition-colors duration-200"
                  placeholder="Enter bug title..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           transition-colors duration-200"
                  placeholder="Describe the bug in detail..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             transition-colors duration-200"
                  >
                    {PRIORITIES.map(priority => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             transition-colors duration-200"
                  >
                    {STATUSES.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold 
                           hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:ring-offset-2 dark:focus:ring-offset-gray-800
                           transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Add Bug
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 
                           rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 
                           focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                           dark:focus:ring-offset-gray-800 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Bug List */}
        <div className="space-y-4">
          {filteredBugs.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center border border-gray-200 dark:border-gray-700 transition-colors duration-200">
              <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No bugs found for filter: <span className="font-semibold">{currentFilter}</span>
              </p>
            </div>
          ) : (
            filteredBugs.map((bug) => (
              <div
                key={bug.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl 
                         p-6 border border-gray-200 dark:border-gray-700
                         transition-all duration-200 transform hover:-translate-y-1"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {bug.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                      {bug.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <PriorityBadge priority={bug.priority} />
                      <StatusBadge status={bug.status} />
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-500 font-mono">
                    #{bug.id}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Stats */}
        {filteredBugs.length > 0 && (
          <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
            Showing {filteredBugs.length} of {bugs.length} bugs
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
