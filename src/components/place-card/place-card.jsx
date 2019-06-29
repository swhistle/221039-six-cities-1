import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import Bookmark from "../bookmark/bookmark.jsx";

const BOOKMARK_SIZE = {
  width: 18,
  height: 19
};

export class PlaceCardComponent extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {rentObject, isActiveCard, clickOnCardImgHandler, currentOfferIsFavorite, addToBookmarks} = this.props;

    return <article className="near-places__card place-card">
      <div className="near-places__image-wrapper place-card__image-wrapper">
        <a href="#" onClick={(e) => clickOnCardImgHandler(e, rentObject.id)}>
          <img className={isActiveCard ? `place-card__image active` : `place-card__image`} src={rentObject.preview_image} width="260" height="200" alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{rentObject.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <Bookmark width={BOOKMARK_SIZE.width} height={BOOKMARK_SIZE.height} addToBookmarks={addToBookmarks} elementIsActive={currentOfferIsFavorite} hotelId={rentObject.id}/>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `100%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/${rentObject.id}`}>{rentObject.title}</Link>
        </h2>
        <p className="place-card__type">{rentObject.type}</p>
      </div>
    </article>;
  }
}

PlaceCardComponent.propTypes = {
  rentObject: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.number,
    location: PropTypes.object
  }),
  isActiveCard: PropTypes.bool,
  clickOnCardImgHandler: PropTypes.func,
  addToBookmarks: PropTypes.func,
  currentOfferIsFavorite: PropTypes.bool
};


