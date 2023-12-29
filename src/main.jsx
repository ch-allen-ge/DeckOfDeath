import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import store from './store.js';
import { Provider } from 'react-redux';
import ErrorPage from './components/ErrorPage/ErrorPage.jsx';
import WorkoutPage from './components/WorkoutPage/WorkoutPage.jsx';

import './index.css';

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />
    },
    {
        path: "/workout",
        element: <WorkoutPage />
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)
