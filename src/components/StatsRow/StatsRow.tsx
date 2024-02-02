import './statsRowStyles.scss';

interface StatsRowProps {
    totalTimeSpent: string,
    numberWorkoutsCompleted: number
}

const StatsRow = ({totalTimeSpent, numberWorkoutsCompleted} : StatsRowProps) => {
    return (
        <div className='statsRowContainer'>
            <div className='statsRowTitleText'>Stats</div>
            
            <div className='statsContainer'>
                <div className='statContainer'>
                    <div className='statLabelText'>Total Time Spent</div>
                    <div>{totalTimeSpent}</div>
                </div>

                <div className='statContainer'>
                    <div className='statLabelText'>Workouts Completed</div>
                    <div>{numberWorkoutsCompleted}</div>
                </div>
            </div>
        </div>
    );
}

export default StatsRow;