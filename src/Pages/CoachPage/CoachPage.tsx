import CoachZone from "../../components/CoachZone";
import Navbar from "../../components/Navbar";
import './coachPageStyles.scss';

const CoachPage = () => {
    return (
        <div className="coachPageContainer">
            <Navbar />
            <CoachZone />
        </div>
    );
}

export default CoachPage;