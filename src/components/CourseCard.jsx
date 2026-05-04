import React from 'react';
import { Clock, Users, BookOpen } from 'lucide-react';

const CourseCard = ({ course, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer flex flex-col h-full border border-slate-100"
    >
      <div className="relative h-48 w-full">
        <img 
          src={course.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop'} 
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-indigo-600">
          {course.category}
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-2">
          {course.title}
        </h3>
        {course.vendorName && (
          <p className="text-xs text-indigo-600 font-medium mb-2">By {course.vendorName}</p>
        )}
        
        <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-1">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
          <div className="flex items-center space-x-4 text-slate-400 text-sm">
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              2h
            </span>
            <span className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              1.2k
            </span>
          </div>
          <span className="text-lg font-bold text-indigo-600">
            ${parseFloat(course.price).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
