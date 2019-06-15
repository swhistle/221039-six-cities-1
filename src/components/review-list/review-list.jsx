import React from "react";
import PropTypes from "prop-types";

import {ReviewItemComponent} from "../review-item/review-item.jsx";

export class ReviewListComponent extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {reviewList} = this.props;

    return <React.Fragment>
      <section className="property__reviews reviews">
        <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewList.length}</span></h2>
        <ul className="reviews__list">
          <li className="reviews__item">
            {
              reviewList.length > 0 ? reviewList.map((reviewItem) => <ReviewItemComponent key={reviewItem.id} review={reviewItem}/>) : ``
            }
          </li>
        </ul>
      </section>
    </React.Fragment>;
  }
}

ReviewListComponent.propTypes = {
  reviewList: PropTypes.array
};
