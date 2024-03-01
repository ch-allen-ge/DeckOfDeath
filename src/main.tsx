import ReactDOM from 'react-dom/client';
import { store } from './store.ts';
import { Provider } from 'react-redux';
import HomePage from './Pages/HomePage'
import ErrorPage from './Pages/ErrorPage';
import WorkoutPage from './Pages/WorkoutPage';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';
import CoachPage from './Pages/CoachPage';
import SavedWorkoutsPage from './Pages/SavedWorkoutsPage';
import Navbar from './components/Navbar/Navbar.tsx';
import FinishedPage from './Pages/FinishedPage/FinishedPage.tsx';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as Element).render(
    <Provider store={store}>
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<HomePage /> } />
                <Route path="/workout" element={<WorkoutPage />} />                         
                <Route path="/register" element={<RegisterPage /> } />
                <Route path="/login" element={<LoginPage /> } />
                <Route path="/profile" element={<ProfilePage /> } />
                <Route path="/coach" element={ <CoachPage />} />
                <Route path="/savedWorkouts" element={<SavedWorkoutsPage /> } />
                

                {/* test route */}
                <Route path="/finished" element={ <FinishedPage />} />

                <Route element={<ErrorPage /> } />

            </Routes>
        </BrowserRouter>
    </Provider>
);
