import React, { useState } from 'react';
import { BookOpen, Presentation, Zap, ArrowRight } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [role, setRole] = useState(''); // 'learner' | 'vendor'
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role && name.trim()) {
      onLogin({ role, name });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="mx-auto bg-indigo-600 p-3 rounded-2xl inline-flex justify-center items-center shadow-lg mb-4">
          <Zap className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Welcome to Power-Up
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Sign in to access your marketplace
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                I am a...
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div 
                  onClick={() => setRole('learner')}
                  className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center text-center transition-all ${
                    role === 'learner' 
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                      : 'border-slate-200 hover:border-indigo-300 text-slate-500'
                  }`}
                >
                  <BookOpen className={`w-8 h-8 mb-2 ${role === 'learner' ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span className="font-semibold">Learner</span>
                </div>
                
                <div 
                  onClick={() => setRole('vendor')}
                  className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center text-center transition-all ${
                    role === 'vendor' 
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                      : 'border-slate-200 hover:border-indigo-300 text-slate-500'
                  }`}
                >
                  <Presentation className={`w-8 h-8 mb-2 ${role === 'vendor' ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span className="font-semibold">Vendor</span>
                </div>
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                Your Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g. Alex"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={!role || !name.trim()}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Sign In
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
