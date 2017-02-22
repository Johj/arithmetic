import React, {Component} from 'react';

import Paper from 'material-ui/Paper';

const style = {
  paper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    margin: '8px',
    maxWidth: '600px',
    padding: '8px',
  }
};

export default class Panel extends Component {
  render() {
    return (
      <Paper style={style.paper} zDepth={1}>
        {this.props.children}
      </Paper>
    );
  }
}
