import React from 'react';
import './Hero.css';

function Hero(props) {
	return (
		<div className={"hero " + props.direction}>
		  <div className="body"></div>
		  <span className="light"></span>
		</div>
	);
}

export default Hero;