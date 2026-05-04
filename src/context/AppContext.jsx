import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem('powerup_courses');
    if (savedCourses) {
      return JSON.parse(savedCourses);
    }
    return [
      {
        id: '1',
        title: 'Mastering React 19',
        category: 'Development',
        price: 49.99,
        description: 'Learn the latest features of React 19, including the new hook paradigms and concurrent rendering.',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop',
        vendorId: 'vendor1',
        vendorName: 'Sarah Smith'
      },
      {
        id: '2',
        title: 'Advanced Tailwind CSS',
        category: 'Design',
        price: 29.99,
        description: 'Build beautiful, responsive designs using modern Tailwind CSS techniques.',
        imageUrl: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=800&auto=format&fit=crop',
        vendorId: 'vendor1',
        vendorName: 'Sarah Smith'
      }
    ];
  });

  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem('powerup_bookings');
    if (savedBookings) {
      return JSON.parse(savedBookings);
    }
    return [];
  });

  // Cross-tab synchronization
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'powerup_courses' && e.newValue) {
        setCourses(JSON.parse(e.newValue));
      }
      if (e.key === 'powerup_bookings' && e.newValue) {
        setBookings(JSON.parse(e.newValue));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Update localStorage when state changes
  useEffect(() => {
    localStorage.setItem('powerup_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('powerup_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const addCourse = (courseData) => {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const newCourse = {
      ...courseData,
      id: Date.now().toString(),
      vendorId: currentUser?.name || 'UnknownVendor',
      vendorName: currentUser?.name || 'Unknown Vendor'
    };
    setCourses(prev => [newCourse, ...prev]);
  };

  const bookCourse = (courseId) => {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const newBooking = {
      id: Date.now().toString(),
      courseId,
      learnerId: currentUser?.name || 'UnknownLearner',
      learnerName: currentUser?.name || 'Unknown Learner',
      date: new Date().toISOString()
    };
    setBookings(prev => [newBooking, ...prev]);
  };

  return (
    <AppContext.Provider value={{ courses, bookings, addCourse, bookCourse }}>
      {children}
    </AppContext.Provider>
  );
};

