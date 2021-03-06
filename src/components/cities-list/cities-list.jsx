import React from "react";
import PropTypes from "prop-types";

export class CitiesListComponent extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    const {citiesList, currentCityName, clickOnCityHandler} = this.props;

    return <ul className="locations__list tabs__list">
      {
        citiesList.map((cityItem) => {
          return <li key={cityItem.name} className="locations__item">
            <a
              className={currentCityName === cityItem.name ?
                `locations__item-link tabs__item tabs__item--active` :
                `locations__item-link tabs__item`}
              onClick={(e) => clickOnCityHandler(e, cityItem)}>
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
        name: PropTypes.string,
        location: PropTypes.object
      })).isRequired,
  currentCityName: PropTypes.string,
  clickOnCityHandler: PropTypes.func
};
