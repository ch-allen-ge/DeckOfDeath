import { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './store.ts';
import { Provider } from 'react-redux';
import Navbar from './components/Navbar/Navbar.tsx';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import { AuthProvider } from './auth/AuthContext.tsx';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import './index.scss';

const HomePage = lazy(() =>  import('./Pages/HomePage'));
const ErrorPage = lazy(() => import('./Pages/ErrorPage'));
const WorkoutPage = lazy(() => import('./Pages/WorkoutPage'));
const RegisterPage = lazy(() => import('./Pages/RegisterPage'));
const LoginPage = lazy(() =>  import('./Pages/LoginPage'));
const ProfilePage = lazy(() => import('./Pages/ProfilePage'));
const CoachPage = lazy(() => import('./Pages/CoachPage'));
const SavedWorkoutsPage = lazy(() => import('./Pages/SavedWorkoutsPage'));
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as Element).render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
            <BrowserRouter>
                <Suspense>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<HomePage /> } />
                        <Route path="/workout" element={<WorkoutPage />} />                         
                        <Route path="/register" element={<RegisterPage /> } />
                        <Route path="/login" element={<LoginPage /> } />
                        <Route path="/profile" element={<ProfilePage /> } />
                        <Route path="/coach" element={ <CoachPage />} />
                        <Route path="/savedWorkouts" element={<SavedWorkoutsPage /> } />
                        <Route element={<ErrorPage /> } />
                    </Routes>
                </Suspense>
            </BrowserRouter>
            </AuthProvider>
        </QueryClientProvider>
    </Provider>
);
