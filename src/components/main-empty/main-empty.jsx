import React from "react";
import PropTypes from "prop-types";

export class MainEmptyComponent extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    const {currentCityName} = this.props;

    return <div className="cities__places-wrapper">
      <div className="cities__places-container cities__places-container--empty container">
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">We could not find any property availbale at the moment in {currentCityName}</p>
          </div>
        </section>
        <div className="cities__right-section">
          <img src="img/no-places.jpg" alt="no-places"/>
        </div>
      </div>
    </div>;
  }
}

MainEmptyComponent.propTypes = {
  currentCityName: PropTypes.string.isRequired
};
