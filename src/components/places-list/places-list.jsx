import React from "react";
import PropTypes from "prop-types";
import {PlaceCardComponent} from "../place-card/place-card.jsx";
import {withActiveItem} from "../../hocs/withActiveItem/withActiveItem";
import {sortingOffersTypes} from "../sorting-offers/sorting-offers.jsx";

class PlacesListComponent extends React.PureComponent {

  constructor(props) {
    super(props);

    this._changeActiveItem = this._changeActiveItem.bind(this);
  }

  _changeActiveItem(e, offerId) {
    this.props.changeActiveItemId(e, offerId);
    this.props.selectOffer(offerId);
  }

  render() {
    const {rentObjects, activeItemId, sortOffersBy} = this.props;

    const sortBy = (one, two) => {
      if (one < two) {
        return -1;
      } else if (one > two) {
        return 1;
      }

      return 0;

    };

    const sortOffers = (one, two) => {
      switch (sortOffersBy) {
        case sortingOffersTypes[0]:
          return 0;

        case sortingOffersTypes[1]:
          return sortBy(one.price, two.price);

        case sortingOffersTypes[2]:
          return sortBy(two.price, one.price);

        case sortingOffersTypes[3]:
          return sortBy(two.rating, one.rating);

        default:
          return 0;
      }
    };

    return <React.Fragment>
      {rentObjects
        .sort(sortOffers)
        .map((place, index) =>
          <PlaceCardComponent
            key={place.id}
            index={index}
            rentObject={place}
            isActiveCard={place.id === activeItemId}
            clickOnCardImgHandler={this._changeActiveItem}/>
        )
      }
    </React.Fragment>;
  }
}

PlacesListComponent.propTypes = {
  rentObjects: PropTypes.array.isRequired,
  activeItemId: PropTypes.number,
  sortOffersBy: PropTypes.oneOf(sortingOffersTypes),
  changeActiveItemId: PropTypes.func,
  selectOffer: PropTypes.func
};

export {PlacesListComponent};

export default withActiveItem(PlacesListComponent);
