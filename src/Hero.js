import React from 'react';
import './Hero.css';

class Hero extends React.PureComponent {
	render() {
		return (
			<div className={"hero " + this.props.direction} >
			  <div className="body"></div>
			  <span className="light"></span>
            </div>
		);
	}
}

export default Hero;