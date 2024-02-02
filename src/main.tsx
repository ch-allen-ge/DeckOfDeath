import ReactDOM from 'react-dom/client';
import { store } from './store.ts';
import { Provider } from 'react-redux';
import HomePage from './Pages/HomePage/index.tsx'
import ErrorPage from './Pages/ErrorPage/ErrorPage.tsx';
import WorkoutPage from './Pages/WorkoutPage/WorkoutPage.tsx';
import RegisterPage from './Pages/RegisterPage/index.tsx';
import LoginPage from './Pages/LoginPage/index.tsx';
import ProfilePage from './Pages/ProfilePage/index.tsx';
import CoachPage from './Pages/CoachPage/index.tsx';
import SavedWorkoutsPage from './Pages/SavedWorkoutsPage';
import './index.scss';

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />
    },
    {
        path: "/workout",
        element: <WorkoutPage />
    },
    {
        path: "/register",
        element: <RegisterPage />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/profile",
        element: <ProfilePage />
    },
    {
        path: "/coach",
        element: <CoachPage />
    },
    {
        path: '/savedWorkouts',
        element: <SavedWorkoutsPage />
    }
]);

ReactDOM.createRoot(document.getElementById('root') as Element).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)
