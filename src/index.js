import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import MenuBar from './components/MenuBar';
import NewResources from './routes/newResources'; // Import the new NewResources component
import Profile from './routes/Profile'; // Ensure this import is present
import Home from './routes/Home';
import ErrorPage from './routes/ErrorPage';
import Employment from './routes/Employment';
import ReactGA from "react-ga4";
import Contact from './routes/Contact';
import About from './routes/About';

ReactGA.initialize("G-FVYZBPF2XJ");

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
        element: <Profile />
      },
      {
        path: "resources/:tab", // Capture the tab as a parameter (e.g., food, housing, clothing)
        element: <NewResources />, // Show NewResources component
      },
      {
        path: "employment",
        element: <Employment />,
        loader: async () => {
          return fetch("https://us-central1-newbeginnings-7fed9.cloudfunctions.net/widgets/resources/employment");
        },
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "about",
        element: <About />
      }
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
