import React from "react";
import PropTypes from "prop-types";

export class CitiesListComponent extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    const {citiesList, currentCityId, clickOnCityHandler} = this.props;

    return <ul className="locations__list tabs__list">
      {
        citiesList.map((cityItem) => {
          return <li key={cityItem.id} className="locations__item">
            <a
              className={currentCityId === cityItem.id ?
                `locations__item-link tabs__item tabs__item--active` :
                `locations__item-link tabs__item`}
              onClick={(e) => clickOnCityHandler(e, cityItem.id)}>
              <span>{cityItem.name}</span>
            </a>
          </li>;
        })
      }
    </ul>;
  }
}

CitiesListComponent.propTypes = {
  citiesList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        coordinates: PropTypes.arrayOf(PropTypes.number)
      })).isRequired,
  currentCityId: PropTypes.number,
  clickOnCityHandler: PropTypes.func
};
