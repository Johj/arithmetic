import React, {Component} from 'react';

const styles = {
  text: {
    display: 'flex',
    fontSize: '56px',
    justifyContent: 'center',
    margin: '1%',
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
