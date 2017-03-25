import React from 'react';
import RoadBed from './RoadBed';
import Hero from './Hero';
import Enemy from './Enemy';
import './Game.css';

var HeroTick = null, EnemyTick = null;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: 0,
      kilo: 0,
      enemyDirectionNum: 0,
      toTheEnd: true,
      direction: "left",
      enemyType: 0,
      enemySpeed: 0,
      showSuperHelp: false
    };

    this.handleClickStartButton = this.handleClickStartButton.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keydown", e => {
      if (this.state.gameState === 1) {
        switch(e.keyCode) {
          case 37:
            this.setState({direction : "left"});
            break;
          case 39:
            this.setState({direction : "right"});
            break;
          default:
            break;
        }
      }
    });

    var enemy = document.getElementById("enemy");
    enemy.addEventListener("webkitAnimationEnd", () => {      
      this.setState({
        toTheEnd: true
      });
    });
  }

  gameStart() {
    this.setState({
      gameState: 1,
      kilo: 0,
      toTheEnd: true,
      showSuperHelp: false
    });

    this.gameTick(true);
    this.createEnemy();
  }

  gameTick(status) {
    if (status) {
      var kilo = 0, enemy = document.getElementById("enemy"), carY = 620, enemyY = 0;
      HeroTick = setInterval(() => {
        kilo += 0.01;
        this.setState({
          kilo: kilo
        });

        var transform = window.getComputedStyle(enemy, null).getPropertyValue("transform");
        if (transform !== "none") {
          enemyY = transform.split(",")[5].replace(")","");
        }
        var enemyDirection = this.state.enemyDirectionNum === 1 ? "right" : "left";
        var direction = this.state.direction;
        if (enemyY > carY && enemyY < (carY + 220) && enemyDirection === direction) {
          this.gameOver();
        }

        if (!this.state.showSuperHelp && kilo >= 2) {
          this.renderSuperHelp();
          this.setState({
            showSuperHelp: true
          });
        }
      }, 100);
    } else {
      clearInterval(HeroTick);
    }
  }

  gameOver() {
    this.gameTick(false);
    clearInterval(EnemyTick);
    this.setState({
      gameState: -1
    });

    var failBub = document.createElement("DIV");
    failBub.className = "failbub";
    var span1 = document.createElement("SPAN");
    var span2 = document.createElement("SPAN");
    span1.className = "failtext";
    span2.className = "retry";
    failBub.appendChild(span1);
    failBub.appendChild(span2);
    var board = document.getElementById("board");
    board.appendChild(failBub);

    span2.addEventListener("click", () => {
      this.gameStart();
      board.removeChild(failBub);
    });
  }

  createEnemy() {
    EnemyTick = setInterval(() => {
      if (this.state.gameState === 1) {
        var enemyDirectionNum = Math.round(Math.random());
        var enemyType = Math.floor(3 * Math.random());
        var enemySpeed = Math.floor(3 * Math.random());
        this.setState({
          enemyDirectionNum : enemyDirectionNum,
          toTheEnd: false,
          enemyType: enemyType,
          enemySpeed: enemySpeed
        });
      }
    }, 3000);
  }

  handleClickStartButton() {
    this.gameStart();

    var startHelp = document.createElement("P");
    startHelp.className = "start-help help";
    startHelp.innerHTML = "你是逃犯，方向键控制左右";
    var road = document.getElementById("road");
    road.appendChild(startHelp);

    startHelp.addEventListener("webkitAnimationEnd", () => {
      road.removeChild(startHelp);
    });
  }

  renderSuperHelp() {
    var superHelp = document.createElement("P");
    superHelp.className = "super-help help";
    superHelp.innerHTML = "空格键开启超神模式！";
    var road = document.getElementById("road");
    road.appendChild(superHelp);

    superHelp.addEventListener("webkitAnimationEnd", () => {
      road.removeChild(superHelp);
    });
  }

  render() {
    var boardClassName = null;
    if(this.state.gameState !== -1) {
      boardClassName = "board";
    } else {
      boardClassName = "board crashed";
    }
    var enemyDirection = this.state.enemyDirectionNum === 1 ? "right" : "left";

    return (
      <div id="board" className={boardClassName}>
        <RoadBed gameState={this.state.gameState} />
        <div id="road" className={this.state.gameState ? "road play" : "road"}>
          <Hero direction={this.state.direction} />
          <Enemy
            gameState={this.state.gameState}
            enemyDirection={enemyDirection}
            toTheEnd={this.state.toTheEnd}
            enemyType={this.state.enemyType}
            enemySpeed={this.state.enemySpeed} />
        </div>
        <span className={this.state.gameState ? "start hide" : "start"} onClick={this.handleClickStartButton} />
        <span className="kilo">{this.state.kilo.toFixed(2)}</span>
      </div>
    );
  }
}

export default Game;