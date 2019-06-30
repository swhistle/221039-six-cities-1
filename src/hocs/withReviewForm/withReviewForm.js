import React from "react";
import PropTypes from "prop-types";

export const withReviewForm = (Component) => {
  class WithReviewForm extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: this.props.rating,
        comment: this.props.comment
      };

      this._changeRating = this._changeRating.bind(this);
      this._changeComment = this._changeComment.bind(this);
      this._clearReviewForm = this._clearReviewForm.bind(this);
    }

    _changeRating(value) {
      this.setState({rating: value});
    }

    _changeComment(text) {
      this.setState({comment: text});
    }

    _clearReviewForm() {
      this.setState({
        rating: 0,
        comment: ``
      });
    }

    render() {
      return <Component
        {...this.props}
        rating={this.state.rating}
        comment={this.state.comment}
        changeRating={this._changeRating}
        changeComment={this._changeComment}
        clearReviewForm={this._clearReviewForm}
      />;
    }
  }

  WithReviewForm.propTypes = {
    rating: PropTypes.number,
    comment: PropTypes.string,
  };

  return WithReviewForm;
};


