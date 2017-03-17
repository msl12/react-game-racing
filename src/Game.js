import React from 'react';
import RoadBed from './RoadBed';
import Hero from './Hero';
import Enemy from './Enemy';
import './Game.css';

var Tick = null, EnemyTick = null;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: 0,
      kilo: 0,
      enemyDirectionNum: 0,
      toTheEnd: true,
      direction: "left"
    };

    this.renderStartButton = this.renderStartButton.bind(this);
    this.gameStart = this.gameStart.bind(this);
    this.changeToTheEnd = this.changeToTheEnd.bind(this);
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
  }

  gameStart() {
    this.setState({
      gameState: 1,
      kilo: 0,
      toTheEnd: true
    });

    this.gameTick(true);
  }

  gameTick(status) {
    if (status){
      var kilo = 0, enemy = document.getElementById("enemy"), crash = 620, dis = 0;
      Tick = setInterval(() => {
        kilo += 0.01;
        this.setState({
          kilo: kilo
        });

        //here I hope will beautiful. And another refs!
        var transform = window.getComputedStyle(enemy, null).getPropertyValue("transform");
        if (transform !== "none") {
          dis = transform.split(",")[5].replace(")","");
        }
        var enemyDirection = this.state.enemyDirectionNum === 1 ? "right" : "left";
        var direction = this.state.direction;
        if (dis > crash && enemyDirection === direction) {
          this.gameOver();
        }
      }, 100);

      this.createEnemy();
    } else {
      clearInterval(Tick);
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
    var node1 = document.createElement("SPAN");
    var node2 = document.createElement("SPAN");
    node1.className = "failtext";
    node2.className = "retry";
    failBub.appendChild(node1);//onClick={this.gameRestart}
    failBub.appendChild(node2);
    var board = document.getElementById("board");
    board.appendChild(failBub);

    node2.addEventListener("click", () => {
      this.gameStart();
      board.removeChild(failBub);
    });
  }

  createEnemy() {
    EnemyTick = setInterval(() => {
      if (this.state.gameState === 1) {
        var enemyDirectionNum = Math.round(Math.random());
        this.setState({
          enemyDirectionNum : enemyDirectionNum,
          toTheEnd: false
        });
      }
    }, 3000);
  }

  changeToTheEnd(toTheEnd) {
    this.setState({
      toTheEnd: toTheEnd
    });
  }

  renderStartButton() {
    return <span className={this.state.gameState ? "start hide" : "start"} onClick={this.gameStart}></span>;
  }

  render() {
    var boardClassName = null;
    if(this.state.gameState === 1) {
      boardClassName = "board";
    } else {
      boardClassName = "board crashed";
    }

    return (
      <div id="board" className={boardClassName}>
        <RoadBed gameState={this.state.gameState} />
        <div className={this.state.gameState ? "road play" : "road"}>
          <Hero gameState={this.state.gameState} direction={this.state.direction} />
          <Enemy
            gameState={this.state.gameState}
            enemyDirectionNum={this.state.enemyDirectionNum}
            toTheEnd={this.state.toTheEnd}
            changeToTheEnd={this.changeToTheEnd} />
        </div>
        {this.renderStartButton()}
        <span className="kilo">{this.state.kilo.toFixed(2)}</span>
      </div>
    );
  }
}

export default Game;