import { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './store.ts';
import { Provider } from 'react-redux';
import Navbar from './components/Navbar/Navbar.tsx';
import {
    BrowserRouter,
    Routes,
    Route,
    useMatch
} from "react-router-dom";
import { AuthProvider } from './auth/AuthContext.tsx';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import './index.scss';

const HomePage = lazy(() =>  import('./Pages/HomePage'));
const WorkoutPage = lazy(() => import('./Pages/WorkoutPage'));
const RegisterPage = lazy(() => import('./Pages/RegisterPage'));
const LoginPage = lazy(() =>  import('./Pages/LoginPage'));
const ProfilePage = lazy(() => import('./Pages/ProfilePage'));
const CoachPage = lazy(() => import('./Pages/CoachPage'));
const SavedWorkoutsPage = lazy(() => import('./Pages/SavedWorkoutsPage'));
const ErrorPage = lazy(() => import('./Pages/ErrorPage'));
const queryClient = new QueryClient();

const HideOnErrorPage = ({children} : {children : React.ReactNode}) => {
    const onHomePage = useMatch('/');
    const onWorkoutPage = useMatch('/workout');
    const onRegisterPage = useMatch('/register');
    const onLoginPage = useMatch('login');
    const onProfilePage = useMatch('/profile');
    const onCoachPage = useMatch('/coach');
    const onSavedWorkoutsPage = useMatch('savedWorkouts');

    if (onHomePage || onWorkoutPage || onRegisterPage || onLoginPage || onProfilePage || onCoachPage || onSavedWorkoutsPage) {
        return children;
    } else {
        return null;
    }
};

const App = () => {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                <BrowserRouter>
                    <Suspense>
                        <HideOnErrorPage>
                            <Navbar />
                        </HideOnErrorPage>
                        
                        <Routes>
                            <Route index element={<HomePage /> } />
                            <Route path="/workout" element={<WorkoutPage />} />                         
                            <Route path="/register" element={<RegisterPage /> } />
                            <Route path="/login" element={<LoginPage /> } />
                            <Route path="/profile" element={<ProfilePage /> } />
                            <Route path="/coach" element={ <CoachPage />} />
                            <Route path="/savedWorkouts" element={<SavedWorkoutsPage /> } />
                            <Route path='*' element={<ErrorPage /> } />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
                </AuthProvider>
            </QueryClientProvider>
        </Provider>
    );
}

ReactDOM.createRoot(document.getElementById('root') as Element).render(
    <App />
);
