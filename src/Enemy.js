import React from 'react';
import './Enemy.css';

function Enemy(props) {
	var enemyClass = (props.gameState && !props.toTheEnd) ? ("enemy speed" + props.enemySpeed + " " + props.enemyDirection + " enemy" + props.enemyType) : "enemy";
	var enemyBodyClass = props.enemyBounced ? 'body bounced' : 'body' ;

	return (
		<div className={enemyClass} id="enemy">
		  <div className={enemyBodyClass}></div>
		</div>
	);	
}

export default Enemy;