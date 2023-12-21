import { useEffect } from "react";
import './countdownStyles.css';

const Countdown = ({setShowCountdownAnimation, bottomCountdown}) => {
	
	useEffect(() => {
		const nums = document.querySelectorAll('.nums span');
		const counter = document.querySelector('.counter');
		
		runAnimation(nums, counter);
	}, [])

	function resetDOM() {
		counter.classList.remove('hide');
		finalMessage.classList.remove('show');
		
		nums.forEach(num => {
			num.classList.value = '';
		});
	
		nums[0].classList.add('in');
	}
	
	function runAnimation(nums, counter) {
		nums.forEach((num, idx) => {
			const lastNumber = nums.length - 1;
			num.addEventListener('animationend', (e) => {
				if(e.animationName === 'goIn' && idx !== lastNumber){
					num.classList.remove('in');
					num.classList.add('out');
				} else if (e.animationName === 'goOut' && num.nextElementSibling){
					num.nextElementSibling.classList.add('in');
				} else {
					counter.classList.add('hide');
					setShowCountdownAnimation(false);
				}
			});
		});
	}

	return (
		<div className={bottomCountdown ? 'bottomCountdown' : 'counter'}>
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