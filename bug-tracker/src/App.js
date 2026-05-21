import React, { useState } from 'react';

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
  }
];

const PRIORITIES = ['Low', 'Medium', 'High'];
const STATUSES = ['Open', 'In Progress', 'Fixed'];

function App() {
  const [bugs, setBugs] = useState(initialBugs);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Open'
  });

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Bug Tracker</h1>
          <p className="mt-1 text-sm text-gray-600">Track and manage development issues</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Bug Button */}
        <div className="mb-8 flex justify-end">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold 
                     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                     focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl
                     transform hover:scale-105 active:scale-95"
          >
            {showForm ? 'Cancel' : '+ Add Bug'}
          </button>
        </div>

        {/* Add Bug Form */}
        {showForm && (
          <div className="mb-8 bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Report New Bug</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                           focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Brief description of the bug"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                           focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Detailed description of the issue..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                             focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    {PRIORITIES.map(priority => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                             focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    {STATUSES.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg 
                         font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                Submit Bug Report
              </button>
            </form>
          </div>
        )}

        {/* Bug List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bugs.map((bug) => (
            <div
              key={bug.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow 
                       duration-200 p-6 border border-gray-200"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900 flex-1">
                  {bug.title}
                </h3>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {bug.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
                  {bug.priority}
                </span>
                <span className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                  {bug.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
