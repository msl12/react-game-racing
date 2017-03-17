import React from 'react';
import './RoadBed.css';

class RoadBed extends React.Component {
	render() {
		return <div className={this.props.gameState ? "roadbed roadRun" : "roadbed"}></div>;
	}
}

export default RoadBed;