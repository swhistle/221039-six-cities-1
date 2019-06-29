import React from "react";
import PropTypes from "prop-types";

import {ReviewItemComponent} from "../review-item/review-item.jsx";

export class ReviewListComponent extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  _sortReviewsListByDate(one, two) {
    const oneDate = new Date(one.date);
    const twoDate = new Date(two.date);

    if (oneDate < twoDate) {
      return 1;
    } else if (oneDate > twoDate) {
      return -1;
    }

    return 0;
  }

  render() {
    const {reviewList} = this.props;

    if (reviewList) {
      return <React.Fragment>
        <section className="property__reviews reviews">
          <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewList.length}</span></h2>
          <ul className="reviews__list">
            {
              reviewList.length > 0 ? reviewList
                .sort(this._sortReviewsListByDate)
                .slice(0, 10)
                .map((reviewItem) => <li key={`review-${reviewItem.id}`} className="reviews__item">
                  <ReviewItemComponent review={reviewItem}/>
                </li>) : ``
            }
          </ul>
        </section>
      </React.Fragment>;
    }

    return null;
  }
}

ReviewListComponent.propTypes = {
  reviewList: PropTypes.array
};
