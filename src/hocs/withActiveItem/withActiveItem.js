import React from "react";
import PropTypes from "prop-types";

export const withActiveItem = (Component) => {
  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItemId: this.props.activeItemId
      };

      this.changeActiveItemId = (event) => {
        let activeItemId = event;
        if (typeof event === `object`) {
          activeItemId = +event.currentTarget.id;
        }
        this.setState({activeItemId});
      };
    }

    render() {
      return <Component
        {...this.props}
        activeItemId={this.state.activeItemId}
        changeActiveItemId={this.changeActiveItemId}/>;
    }
  }

  WithActiveItem.propTypes = {
    activeItemId: PropTypes.number
  };

  return WithActiveItem;
};


