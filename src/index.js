import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import MenuBar from './components/MenuBar';
import ResourcesSideBar from './components/ResourcesSideBar';

import Home from './routes/Home'
import ErrorPage from './routes/ErrorPage'
import ResourceTables from './routes/ResourceTables';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MenuBar/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "resources",
        element: <ResourcesSideBar/>,
        children: [
          {
            path: "videos/:resourceName"
          },
          {
            path: ":resourceName",
            element: <ResourceTables/>
          }
        ]
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
