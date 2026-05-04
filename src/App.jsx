import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Zap, LogOut } from 'lucide-react';
import LearnerDashboard from './components/LearnerDashboard';
import VendorDashboard from './components/VendorDashboard';
import Login from './components/Login';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = sessionStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    sessionStorage.setItem('currentUser', JSON.stringify(userData));
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  if (!currentUser) {
    return (
      <>
        <Toaster position="top-right" />
        <Login onLogin={handleLogin} />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" />
      
      {/* Global Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">
              Power-Up
            </span>
            <span className="ml-2 px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md uppercase tracking-wider">
              {currentUser.role} Mode
            </span>
          </div>

          {/* User Profile & Logout */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-slate-700 hidden sm:block">
                Hello, {currentUser.name}
              </span>
              <div className="w-8 h-8 rounded-full bg-indigo-100 border-2 border-white shadow-sm flex items-center justify-center text-indigo-700 font-bold text-sm">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 bg-slate-50">
        {currentUser.role === 'learner' ? <LearnerDashboard /> : <VendorDashboard />}
      </main>
      
    </div>
  );
}

export default App;

