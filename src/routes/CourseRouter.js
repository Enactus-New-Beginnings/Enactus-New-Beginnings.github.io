import React from 'react';
import { useParams } from 'react-router-dom';
import ReadingsPage from './ReadingsPage'; // Adjust based on structure
import CourseOverviewPage from './CourseOverviewPage'; // Example component

const CourseRouter = () => {
  const { courseId, pageType } = useParams();

  const renderPage = () => {
    switch (pageType) {
      case 'readings':
        return <ReadingsPage courseId={courseId} />;
      case 'overview':
        return <CourseOverviewPage courseId={courseId} />;
      // Add other cases for different page types, if needed
      default:
        return <p>Page type not found.</p>;
    }
  };

  return (
    <div className="course-router">
      {/* <h1>Course: {courseId}</h1> */}
      {renderPage()}
    </div>
  );
};

export default CourseRouter;
