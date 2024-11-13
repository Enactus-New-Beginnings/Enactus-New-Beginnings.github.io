import React, { useEffect, useState } from 'react';
import '../styles/CourseOverviewPage.css'; // Import CSS for this component

const CourseOverviewPage = ({ courseId }) => {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const data = await import(`../courses/${courseId}/readings.json`);
        setCourse(data.default);
      } catch (error) {
        console.error('Error loading course data:', error);
      }
    };

    fetchCourseData();
  }, [courseId]);

  if (!course) {
    return <p>Loading course data...</p>;
  }

  return (
    <div className="course-page">
      <div className="course-overview">
        <h1>{course.title}</h1>
        <p>{course.description}</p>

        <h2>Course Sections</h2>
        <ul>
          {course.sections.map((section) => (
            <li key={section.id}>{section.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseOverviewPage;
