import React, { useState, useContext } from 'react';
import { Search, Filter } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import CourseCard from './CourseCard';
import CourseModal from './CourseModal';

const categories = ['All', 'Development', 'Design', 'Business', 'Marketing', 'Music'];

const LearnerDashboard = () => {
  const { courses } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Filter logic
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header and Search/Filter */}
      <div className="mb-10 space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Find your next skill</h1>
          <p className="text-lg text-slate-500">Explore thousands of classes in design, business, and more.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search for courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
            />
          </div>
          
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <Filter className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course Grid */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
          <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No courses found</h3>
          <p className="text-slate-500">Try adjusting your search or filters.</p>
          <button 
            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
            className="mt-4 text-indigo-600 font-medium hover:text-indigo-700"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map(course => (
            <CourseCard 
              key={course.id} 
              course={course} 
              onClick={() => setSelectedCourse(course)} 
            />
          ))}
        </div>
      )}

      {/* Course Detail Modal */}
      {selectedCourse && (
        <CourseModal 
          course={selectedCourse} 
          onClose={() => setSelectedCourse(null)} 
        />
      )}
    </div>
  );
};

export default LearnerDashboard;
