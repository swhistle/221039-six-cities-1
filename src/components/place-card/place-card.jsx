import React from "react";
import PropTypes from "prop-types";

export const PlaceCardComponent = (props) => {
  const {rentObject, index, isActiveCard, mouseOverCardImgHandler} = props;

  return <article className="near-places__card place-card">
    <div className="near-places__image-wrapper place-card__image-wrapper">
      <a href="#" onMouseOver={() => mouseOverCardImgHandler(index)}>
        <img className={isActiveCard ? `place-card__image active` : `place-card__image`} src={rentObject.photoSrc} width="260" height="200" alt="Place image"/>
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
        <a href={rentObject.link}>{rentObject.name}</a>
      </h2>
      <p className="place-card__type">{rentObject.type}</p>
    </div>
  </article>;
};

PlaceCardComponent.propTypes = {
  rentObject: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    name: PropTypes.string,
    photoSrc: PropTypes.string,
    link: PropTypes.string,
    price: PropTypes.string,
    rating: PropTypes.number,
    coordinates: PropTypes.arrayOf(PropTypes.number)
  }),
  index: PropTypes.number,
  isActiveCard: PropTypes.bool,
  mouseOverCardImgHandler: PropTypes.func
};


