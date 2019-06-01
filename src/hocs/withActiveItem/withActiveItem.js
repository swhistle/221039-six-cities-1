import React from "react";

export const withActiveItem = (Component) => {
  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: -1,
      };

      this.changeActiveItem = (index) => {
        this.setState({activeItem: index});
      };
    }

    render() {
      const {index = 0} = this.props;

      return <span onClick={() => this.changeActiveItem(index)}><Component {...this.props}/></span>
    }
  }

  return WithActiveItem;
};
