import React from "react";
import PropTypes from "prop-types";

export const withActiveItem = (Component) => {
  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItemId: props.activeItemId
      };

      this._changeActiveItemId = this._changeActiveItemId.bind(this);
    }

    _changeActiveItemId(event, id) {
      event.preventDefault();
      let activeItemId = id;
      if (typeof id === `object`) {
        activeItemId = +id.currentTarget.id;
      }
      this.setState({activeItemId});
      return activeItemId;
    }

    render() {
      return <Component
        {...this.props}
        activeItemId={this.state.activeItemId}
        changeActiveItemId={this._changeActiveItemId}/>;
    }
  }

  WithActiveItem.propTypes = {
    activeItemId: PropTypes.number
  };

  return WithActiveItem;
};


