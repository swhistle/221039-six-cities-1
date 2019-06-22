import React from "react";
import PropTypes from "prop-types";

export const withElementIsActive = (Component) => {
  class WithElementIsActive extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        elementIsActive: props.elementIsActive
      };

      this._changeElementIsActive = this._changeElementIsActive.bind(this);
    }

    _changeElementIsActive(event) {
      this.setState({elementIsActive: !event});
    }

    render() {
      return <Component
        {...this.props}
        elementIsActive={this.state.elementIsActive}
        changeElementIsActive={this._changeElementIsActive}/>;
    }
  }

  WithElementIsActive.propTypes = {
    elementIsActive: PropTypes.bool
  };

  return WithElementIsActive;
};


