import React, { useContext } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const CourseModal = ({ course, onClose }) => {
  const { bookings, bookCourse } = useContext(AppContext);
  
  if (!course) return null;
  
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  const hasBooked = bookings.some(b => b.courseId === course.id && b.learnerName === currentUser?.name);

  const handleBook = () => {
    if (hasBooked) return;
    bookCourse(course.id);
    toast.success(`Successfully booked ${course.title}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div 
        className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full backdrop-blur-md transition-colors z-10"
        >
          <X className="w-5 h-5 text-slate-700" />
        </button>

        <div className="h-64 w-full relative">
          <img 
            src={course.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop'} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3 inline-block">
              {course.category}
            </span>
            <h2 className="text-3xl font-bold text-white">{course.title}</h2>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">About this lesson</h3>
              <p className="text-slate-600 leading-relaxed">
                {course.description}
              </p>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center text-slate-700">
                  <CheckCircle className="w-5 h-5 text-indigo-500 mr-3" />
                  <span>Interactive 1-on-1 session</span>
                </div>
                <div className="flex items-center text-slate-700">
                  <CheckCircle className="w-5 h-5 text-indigo-500 mr-3" />
                  <span>Access to premium materials</span>
                </div>
                <div className="flex items-center text-slate-700">
                  <CheckCircle className="w-5 h-5 text-indigo-500 mr-3" />
                  <span>Certificate of completion</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-64 bg-slate-50 p-6 rounded-xl border border-slate-100 flex flex-col">
              <div className="mb-4">
                <span className="text-slate-500 text-sm">Price</span>
                <div className="text-3xl font-bold text-indigo-600">
                  ${parseFloat(course.price).toFixed(2)}
                </div>
              </div>
              
              <button 
                onClick={handleBook}
                disabled={hasBooked}
                className={`w-full font-medium py-3 rounded-lg transition-colors mt-auto shadow-sm ${
                  hasBooked 
                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
                }`}
              >
                {hasBooked ? 'Already Booked' : 'Book Lesson'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseModal;
