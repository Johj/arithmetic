import React, {Component} from 'react';

const styles = {
  text: {
    display: 'flex',
    fontSize: '45px',
    justifyContent: 'center',
    margin: '8px',
  },
};

export default class Prompt extends Component {
  render() {
    return (
      <div style={styles.text}>
        {this.props.value}
      </div>
    );
  }
}
