import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import reportWebVitals from './reportWebVitals';

import MenuBar from './components/MenuBar';
import Home from './routes/Home';
import Readings from './routes/ReadingsPage';  // Add this line for Readings
import ErrorPage from './routes/ErrorPage';
import Profile from './routes/Profile';
import Employment from './routes/Employment';
import Contact from './routes/Contact';
import About from './routes/About';
import CourseRouter from './routes/CourseRouter';
import CoursesPage from './routes/CoursesPage';

// Initialize the router
const router = createBrowserRouter([
  {
    path: "/",
    element: <MenuBar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "employment",
        element: <Employment />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "readings", // New route for readings
        element: <Readings />,
      },
      {
        path: "courses/:courseId/:pageType",
        element: <CourseRouter />,
      },
      {
        path: "courses",
        element: <CoursesPage />,  // Add CoursesPage at /courses
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
