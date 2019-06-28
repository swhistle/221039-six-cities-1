import React from "react";
import PropTypes from "prop-types";

import {withReviewForm} from "../../hocs/withReviewForm/withReviewForm";

const INPUT_REVIEW_RATING_ITEMS = [
  {value: 5, title: `perfect`},
  {value: 4, title: `good`},
  {value: 3, title: `not bad`},
  {value: 2, title: `badly`},
  {value: 1, title: `terribly`}
];

const COMMENT_MIN_LENGTH = 50;
const COMMENT_MAX_LENGTH = 300;

class ReviewFormComponent extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  formIsValid(review) {
    if (review.comment.length >= COMMENT_MIN_LENGTH && review.comment.length <= COMMENT_MAX_LENGTH) {
      this.props.onSubmitHandler(review, this.props.hotelId);
    } else {
      // alert(`Please, describe your stay with at least ${COMMENT_MIN_LENGTH} characters and max - ${COMMENT_MAX_LENGTH}!`);
    }
  }

  _starIsActive(value) {
    return value <= this.props.rating;
  }

  render() {
    const {rating, comment, changeRating, changeComment} = this.props;

    return <form className="reviews__form form" action="#" method="post" onSubmit={(e) => {
      e.preventDefault();
      this.formIsValid({rating, comment});
    }
    }>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          INPUT_REVIEW_RATING_ITEMS.map((item) => {
            return <React.Fragment key={`${item.value}-${item.title}`}>
              <input
                className="form__rating-input visually-hidden"
                name="rating" value={item.value}
                id={`stars${item.value}`}
                type="radio"
                onChange={() => changeRating(item.value)}
                required/>
              <label htmlFor={`stars${item.value}`} className="reviews__rating-label form__rating-label" title={item.title}>
                <svg className="form__star-image" width="37" height="33" viewBox="0 0 13 12" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"/></svg>
              </label>
            </React.Fragment>;
          })
        }
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={(e) => changeComment(e.target.value)}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{COMMENT_MIN_LENGTH} characters and max - {COMMENT_MAX_LENGTH}</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
      </div>
    </form>;
  }
}

ReviewFormComponent.propTypes = {
  hotelId: PropTypes.number.isRequired,
  onSubmitHandler: PropTypes.func.isRequired,
  rating: PropTypes.number,
  comment: PropTypes.string,
  changeRating: PropTypes.func,
  changeComment: PropTypes.func,
};

export {ReviewFormComponent};

export default withReviewForm(ReviewFormComponent);
