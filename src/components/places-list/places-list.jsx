import React from "react";
import PropTypes from "prop-types";
import {PlaceCardComponent} from "../place-card/place-card";

const clickHandler = (i) => i;

export const PlacesListComponent = (props) => {
  const {rentObjects} = props;

  return <div className="near-places__list places__list">
    {rentObjects.map((place, index) =>
      <PlaceCardComponent
        key={place.id}
        index={index}
        rentObject={place}
        clickOnCardTitleHandler={clickHandler}/>
    )}
  </div>;
};

PlacesListComponent.propTypes = {
  rentObjects: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    photoSrc: PropTypes.string,
    link: PropTypes.string,
    price: PropTypes.string,
    rating: PropTypes.number
  }))
};
