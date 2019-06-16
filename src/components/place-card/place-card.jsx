import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

export const PlaceCardComponent = (props) => {
  const {rentObject, index, isActiveCard, mouseOverCardImgHandler} = props;

  return <article className="near-places__card place-card">
    <div className="near-places__image-wrapper place-card__image-wrapper">
      <a href="#" onMouseOver={() => mouseOverCardImgHandler(index)}>
        <img className={isActiveCard ? `place-card__image active` : `place-card__image`} src={rentObject.preview_image} width="260" height="200" alt="Place image"/>
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{rentObject.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className="place-card__bookmark-button button" type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: `100%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={`/${rentObject.id}`}>{rentObject.title}</Link>
      </h2>
      <p className="place-card__type">{rentObject.type}</p>
    </div>
  </article>;
};

PlaceCardComponent.propTypes = {
  rentObject: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.number,
    location: PropTypes.object
  }),
  index: PropTypes.number,
  isActiveCard: PropTypes.bool,
  mouseOverCardImgHandler: PropTypes.func
};


