import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CoursesPage.css'; // Import the styles

// Example course data, replace this with dynamic fetching if necessary
const courses = [
  {
    id: 'course1',
    title: 'GED Preparation - Course 1',
    description: 'Prepare for the GED with this comprehensive guide.',
  },
  {
    id: 'course2',
    title: 'GED Preparation - Course 2',
    description: 'Advanced topics for GED preparation.',
  },
  // Add more courses as needed
];

const CoursesPage = () => {
  return (
    <div className="courses-page">
      <h1>Available Courses</h1>
      <div className="courses-list">
        {courses.map((course) => (
          <div key={course.id} className="course-item">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <Link to={`/courses/${course.id}/overview`} className="course-link">
              View Overview
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
