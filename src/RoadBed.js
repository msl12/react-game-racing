import React from 'react';
import './RoadBed.css';

function RoadBed(props) {
	return <div className={props.gameState ? "roadbed roadRun" : "roadbed"}></div>;
}

export default RoadBed;