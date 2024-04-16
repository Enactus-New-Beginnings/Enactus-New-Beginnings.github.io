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
import NewHome from './routes/newHome'
import ErrorPage from './routes/ErrorPage'
import ResourceTables from './routes/ResourceTables';
import VideoGallery from './routes/VideoGallery';
import Profile from './routes/Profile';
import Employment from './routes/Employment';
import ReactGA from "react-ga4";
import Contact from './routes/Contact';
import About from './routes/About';
import Aibot from './routes/Aibot';

ReactGA.initialize("G-FVYZBPF2XJ");

const videos=require('./components/VideoData')

/**
 * Enables client-side routing for our web app. We take advantage of v6 features such as loaders to provide data to our resource tables before rendering. A helpful tutorial for quickly learning React Router can be found [here.]{@link https://reactrouter.com/en/main/start/tutorial}
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <MenuBar/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "",
        element: <NewHome />,
      },
      {
        path: "test",
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
      },{
        path: "employment",
        element: <Employment />,
        loader: async ()=> {
          return fetch (`https://us-central1-newbeginnings-7fed9.cloudfunctions.net/widgets/resources/employment`);
        },
      },{
        path: "Aibot",
        element: <Aibot />,
      },
      {
        path: "contact",
        element: <Contact />
      },{
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
