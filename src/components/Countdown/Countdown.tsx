import { useEffect } from "react";

import './countdownStyles.scss';

const Countdown = ({setShowWorkoutIntroCountdown} : {setShowWorkoutIntroCountdown: any}) => {

	useEffect(() => {
		const nums = document.querySelectorAll('.nums span') as unknown as HTMLElement[];
		const counter = document.querySelector('.counter') as HTMLDivElement;
		
		runAnimation(nums, counter);
	}, [])
	
	function runAnimation(nums: HTMLElement[], counter: HTMLDivElement) {
		nums.forEach((num, index) => {
			const lastNumber = nums.length - 1;
			num.addEventListener('animationend', (e) => {
				if(e.animationName === 'goIn' && index !== lastNumber){
					num.classList.remove('in');
					num.classList.add('out');
				} else if (e.animationName === 'goOut' && num.nextElementSibling){
					num.nextElementSibling.classList.add('in');
				} else {
					counter.classList.add('hide');
					setTimeout(() => setShowWorkoutIntroCountdown(false), 500);
				}
			});
		});
	}

	return (
		<div className='counter'>
			<h4>Get Ready</h4>
			<div className="nums">
				<span className="in">3</span>
				<span>2</span>
				<span>1</span>
				<span>0</span>
			</div>
		</div>
	);
}

export default Countdown;