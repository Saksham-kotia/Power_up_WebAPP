import React, { useState, useContext, useEffect } from 'react';
import { PlusCircle, Image as ImageIcon, Users, BookOpen } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import CourseCard from './CourseCard';
import toast from 'react-hot-toast';

const VendorDashboard = () => {
  const { courses, bookings, addCourse } = useContext(AppContext);
  const [currentUser, setCurrentUser] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Development',
    price: '',
    description: '',
    imageUrl: ''
  });

  useEffect(() => {
    const savedUser = sessionStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // Filter only courses created by the current vendor
  const myCourses = courses.filter(c => currentUser && c.vendorId === currentUser.name);

  // Filter bookings that belong to my courses
  const myCourseIds = myCourses.map(c => c.id);
  const myBookings = bookings.filter(b => myCourseIds.includes(b.courseId));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    addCourse(formData);
    toast.success('Course created successfully!');
    setFormData({
      title: '',
      category: 'Development',
      price: '',
      description: '',
      imageUrl: ''
    });
  };

  if (!currentUser) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form & Bookings */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Create Course Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center mb-6">
              <PlusCircle className="w-6 h-6 text-indigo-600 mr-2" />
              <h2 className="text-xl font-bold text-slate-900">Create New Course</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                <input 
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Master React Hooks"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
                  >
                    <option value="Development">Development</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Music">Music</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Price ($) *</label>
                  <input 
                    type="number" 
                    name="price"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="49.99"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="What will students learn?"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ImageIcon className="h-5 w-5 text-slate-400" />
                  </div>
                  <input 
                    type="url" 
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors mt-2 shadow-sm shadow-indigo-200"
              >
                Publish Course
              </button>
            </form>
          </div>

          {/* Bookings Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-indigo-600 mr-2" />
                <h2 className="text-lg font-bold text-slate-900">Recent Bookings</h2>
              </div>
              <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2 py-1 rounded-full">
                {myBookings.length}
              </span>
            </div>
            
            <div className="space-y-4">
              {myBookings.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-4">No bookings yet. Publish a course to get started!</p>
              ) : (
                myBookings.map(booking => {
                  const course = myCourses.find(c => c.id === booking.courseId);
                  return (
                    <div key={booking.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-semibold text-slate-800 text-sm">{booking.learnerName}</span>
                        <span className="text-xs text-slate-400">
                          {new Date(booking.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 flex items-center">
                        <BookOpen className="w-3 h-3 mr-1" />
                        {course?.title || 'Unknown Course'}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* My Courses List */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">My Published Courses</h2>
            <span className="bg-indigo-100 text-indigo-700 py-1 px-3 rounded-full text-sm font-medium">
              {myCourses.length} Total
            </span>
          </div>

          {myCourses.length === 0 ? (
            <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <PlusCircle className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-1">No courses yet</h3>
              <p className="text-slate-500">Create your first course using the form to start earning.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myCourses.map(course => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  onClick={() => toast('This is a preview of your course card.', { icon: '👁️' })} 
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default VendorDashboard;

