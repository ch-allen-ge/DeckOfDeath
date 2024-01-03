import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { store } from './store.ts';
import { Provider } from 'react-redux';
import ErrorPage from './components/ErrorPage/ErrorPage.tsx';
import WorkoutPage from './components/WorkoutPage/WorkoutPage.tsx';

import './index.scss';

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
