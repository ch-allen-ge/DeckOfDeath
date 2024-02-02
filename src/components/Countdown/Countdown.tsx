import { useEffect } from "react";
import { useAppDispatch } from '../../hooks';
import { setShowCountdownAnimation } from "../../reduxSlices/UISlice";

import './countdownStyles.scss';

const Countdown = () => {
	const dispatch = useAppDispatch();
	
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
					dispatch(setShowCountdownAnimation(false));
				}
			});
		});
	}

	return (
		<div className='counter'>
			<div className="nums">
				<span className="in">3</span>
				<span>2</span>
				<span>1</span>
				<span>0</span>
			</div>
			<h4>Get Ready</h4>
		</div>
	);
}

export default Countdown;