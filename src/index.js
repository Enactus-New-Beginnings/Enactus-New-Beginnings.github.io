import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import MenuBar from './components/MenuBar';
import ResourcesSideBar from './components/ResourcesSideBar';

import Home from './routes/Home'
import ErrorPage from './routes/ErrorPage'
import ResourceTables from './routes/ResourceTables';
import VideoGallery from './routes/VideoGallery';
import Profile from './routes/Profile';

const videos=require('./components/VideoData')

const router = createHashRouter([
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
        path: "profile",
        element: <Profile />
      },
      {
        path: "resources",
        element: <ResourcesSideBar/>,
        children: [
          {
            path: "videos/:resourceName",
            element: <VideoGallery/>,
            loader: (({params})=>{
              return videos[params.resourceName]
            })
          },
          {
            path: ":resourceName",
            element: <ResourceTables/>,
            loader: async ({ params }) => {
              return fetch(`https://us-central1-newbeginnings-7fed9.cloudfunctions.net/widgets/resources/${params.resourceName}`);
            },
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
