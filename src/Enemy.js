import React from 'react';
import './Enemy.css';

class Enemy extends React.Component {
	componentDidMount() {
		this.refs.enemy.addEventListener("webkitAnimationEnd", () => {
			this.props.changeToTheEnd(true);
		});
	}

	render() {
		var direction = this.props.enemyDirectionNum === 1 ? "right" : "left";
		var enemyClass = (this.props.gameState && !this.props.toTheEnd) ? ("enemy speed " + direction) : "enemy";

		return (
			<div className={enemyClass} id="enemy" ref="enemy">
              <div className="body"></div>
            </div>
		);
	}
}

export default Enemy;