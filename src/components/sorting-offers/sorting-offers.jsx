import React from "react";
import PropTypes from "prop-types";
import {withElementIsActive} from "../../hocs/withElementIsActive/withElementIsActive";

const sortingOffersTypes = [`Popular`, `Price: low to high`, `Price: high to low`, `Top rated first`];

class SortingOffersComponent extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {activeSortingType, changeSorting, elementIsActive = false, changeElementIsActive} = this.props;
    const changeSortingAndHide = (sortingType) => {
      changeSorting(sortingType);
      changeElementIsActive(elementIsActive);
    };

    return <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex="0" onClick={() => changeElementIsActive(elementIsActive)}>
        {activeSortingType || sortingOffersTypes[0]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      <ul className={elementIsActive ? `places__options places__options--custom places__options--opened` : `places__options places__options--custom`}>
        {
          sortingOffersTypes.map((item, index) =>
            <li className={item === activeSortingType || (index === 0 && !activeSortingType) ? `places__option places__option--active` : `places__option`}
              key={`sortingType-${index}`}
              tabIndex="0"
              onClick={() => changeSortingAndHide(item)}>
              {item}
            </li>
          )
        }
      </ul>

      <select className="places__sorting-type visually-hidden" id="places-sorting">
        <option className="places__option" value="popular" defaultValue>Popular</option>
        <option className="places__option" value="to-high">Price: low to high</option>
        <option className="places__option" value="to-low">Price: high to low</option>
        <option className="places__option" value="top-rated">Top rated first</option>
      </select>
    </form>;
  }
}

SortingOffersComponent.propTypes = {
  activeSortingType: PropTypes.oneOf(sortingOffersTypes),
  changeSorting: PropTypes.func,
  elementIsActive: PropTypes.bool,
  changeElementIsActive: PropTypes.func
};

export {SortingOffersComponent, sortingOffersTypes};

export default withElementIsActive(SortingOffersComponent);
