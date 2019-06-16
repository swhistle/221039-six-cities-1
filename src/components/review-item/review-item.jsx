import React from "react";
import PropTypes from "prop-types";

export class ReviewItemComponent extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {review} = this.props;

    return <React.Fragment>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user.avatar_url} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {review.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `94%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.user.comment}
        </p>
        <time className="reviews__time" dateTime="2019-04-24">{review.user.date}</time>
      </div>
    </React.Fragment>;
  }
}

ReviewItemComponent.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.object,
    rating: PropTypes.number,
    comment: PropTypes.string,
    dateTime: PropTypes.string
  })
};
