import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';
import {amber500, blue500, green500, redA700, white} from 'material-ui/styles/colors';

import Button from '../component/Button';
import Panel from '../component/Panel';
import Prompt from '../component/Prompt';

const style = {
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '1%',
  },
  progressBar: {
    height: '34px',
    margin: '1%',
    width: '60%',
  },
  scoreBox: {
    margin: '1%',
    width: '60%',
  },
};

const error = 3;
const type = [
  {
    displayOp: '×',
    internalOp: '*',
    max: 12,
  },
  {
    displayOp: '+',
    internalOp: '+',
    max: 50,
  },
  {
    displayOp: '-',
    internalOp: '-',
    max: 50,
  },
];

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: 0,
      displayAnswer: '',
      gameOver: false,
      internalAnswer: '',
      problem: '',
      score: 0,
    };
    this.startGame = this.startGame.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  componentWillMount() {
    this.startGame();
  }

  startGame() {
    this.setState({
      completed: -10,
      gameOver: false,
      score: 0,
    },
    () => {
      this.generateProblem();
      this.startTimer(2);
    });
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateProblem() {
    const o = this.random(0, type.length - 1);
    const left = this.random(-type[o].max, type[o].max);
    const right = this.random(-type[o].max, type[o].max);

    const internalAnswer = eval(`${left} ${type[o].internalOp} ${right}`);
    const displayAnswer = this.generateDisplayAnswer(internalAnswer);
    this.setState({
      internalAnswer: internalAnswer,
      displayAnswer: displayAnswer,
      problem: `${left} ${type[o].displayOp} ${right} ≟ ${displayAnswer}`
    });
  }

  generateDisplayAnswer(answer) {
    if (this.random(0, 1)) {
      return answer;
    } else {
      if (this.random(0, 1)) {
        return answer + this.random(1, error);
      } else {
        return answer - this.random(1, error);
      }
    }
  }

  handleButton(event) {
    if (!!parseInt(event.target.id, 10) === (this.state.displayAnswer === this.state.internalAnswer)) {
      this.generateProblem();
      this.setState({
        completed: -10,
        score: this.state.score + 1
      });
    } else {
      this.setState({
        gameOver: true,
      });
    }
  }

  startTimer(delta) {
    if (!this.state.gameOver) {
      if (this.state.completed >= 100) {
        this.setState({
          completed: 100,
          gameOver: true,
        });
      } else {
        this.setState({completed: this.state.completed + 2});
        setTimeout(() => this.startTimer(delta), 100);
      }
    }
  }

  render() {
    return (
      <div>
        <Panel>
          <LinearProgress
            color={amber500}
            mode="determinate"
            style={style.progressBar}
            value={this.state.completed}
          />
          <Prompt
            value={this.state.problem}
          />
          <div style={style.buttonContainer}>
            <Button
              color={green500}
              icon="check_circle"
              id={1}
              onTouchTap={this.handleButton}
            />
            <Button
              color={redA700}
              icon="cancel"
              id={0}
              onTouchTap={this.handleButton}
            />
          </div>
          <RaisedButton
            disabled={true}
            disabledBackgroundColor={blue500}
            disabledLabelColor={white}
            label={'Score: ' + this.state.score}
            style={style.scoreBox}
          />
        </Panel>
        <Dialog
          title="Game Over"
          actions={
            <FlatButton
              label="Play Again"
              onTouchTap={this.startGame}
            />
          }
          modal={false}
          open={this.state.gameOver}
          onRequestClose={this.startGame}
        >
          Your score: {this.state.score}
        </Dialog>
      </div>
    );
  }
}
