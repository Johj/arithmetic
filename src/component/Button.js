import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

const styles = {
  fontIcon: {
    fontSize: '112px',
  },
  button: {
    height: 112,
    marginLeft: 12,
    marginRight: 12,
    width: 112,
  },
};

export default class Button extends Component {
  render() {
    return (
      <FlatButton
        icon={
          <FontIcon
            className="material-icons"
            color={this.props.color}
            id={this.props.id}
            style={styles.fontIcon}
          >
            {this.props.icon}
          </FontIcon>
        }
        onTouchTap={this.props.onTouchTap}
        style={styles.button}
      />
    );
  }
}
