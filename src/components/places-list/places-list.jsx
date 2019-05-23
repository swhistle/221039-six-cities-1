import React from "react";
import PropTypes from "prop-types";
import {PlaceCardComponent} from "../place-card/place-card.jsx";

export class PlacesListComponent extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      activeCardIndex: -1
    };
  }

  render() {
    const {rentObjects} = this.props;

    const mouseOverCardImgHandler = (index) => {
      this.setState({activeCardIndex: index});
    };

    const clickOnCardTitleHandler = (e) => {
      e.preventDefault();
    };

    return <div className="near-places__list places__list">
      {rentObjects.map((place, index) =>
        <PlaceCardComponent
          key={place.id}
          index={index}
          rentObject={place}
          isActiveCard={index === this.state.activeCardIndex}
          mouseOverCardImgHandler={mouseOverCardImgHandler}
          clickOnCardTitleHandler={clickOnCardTitleHandler}/>
      )}
    </div>;
  }
}

PlacesListComponent.propTypes = {
  rentObjects: PropTypes.array.isRequired
};
