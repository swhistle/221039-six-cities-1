import React from "react";
import PropTypes from "prop-types";
import {PlaceCardComponent} from "../place-card/place-card.jsx";
import {withActiveItem} from "../../hocs/withActiveItem/withActiveItem";

class PlacesListComponent extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    const {rentObjects, activeItemId, changeActiveItemId} = this.props;

    return <div className="near-places__list places__list">
      {rentObjects.map((place, index) =>
        <PlaceCardComponent
          key={place.id}
          index={index}
          rentObject={place}
          isActiveCard={index === activeItemId}
          mouseOverCardImgHandler={changeActiveItemId}/>
      )}
    </div>;
  }
}

PlacesListComponent.propTypes = {
  rentObjects: PropTypes.array.isRequired,
  activeItemId: PropTypes.number,
  changeActiveItemId: PropTypes.func
};

export {PlacesListComponent};

export default withActiveItem(PlacesListComponent);
