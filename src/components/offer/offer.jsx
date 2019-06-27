import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {ReviewListComponent} from "../review-list/review-list.jsx";
import ReviewForm from "../review-form/review-form.jsx";
import {Map} from "../map/map.jsx";
import PlacesList from "../places-list/places-list.jsx";

export class OfferComponent extends React.Component {
  constructor(props) {
    super(props);

    this._loadReviewList = this._loadReviewList.bind(this);
  }

  _loadReviewList(hotelId) {
    this.props.loadReviewList(hotelId);
  }

  componentDidMount() {
    this._loadReviewList(this.props.offer.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.offer.id !== prevProps.offer.id) {
      this._loadReviewList(this.props.offer.id);
    }
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    const {offer, nearPlaces, onSubmitReviewFormHandler, userIsLoggedIn, reviewList} = this.props;

    if (offer && nearPlaces) {
      const nearPlacesCoordinates = nearPlaces.map((place) => [place.location.latitude, place.location.longitude]);

      return <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                offer.images.map((item, index) =>
                  <div key={`image-${index}`} className="property__image-wrapper">
                    <img className="property__image" src={item} alt="Photo studio"/>
                  </div>)
              }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {
                offer.is_premium ?
                  <div className="property__mark">
                    <span>Premium</span>
                  </div> : ``
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer.title}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `96%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offer.max_adults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {
                    offer.goods.map((good, index) =>
                      <li key={`property-${index}`} className="property__inside-item">
                        {good}
                      </li>)
                  }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={offer.host.avatar_url} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {offer.host.name}
                  </span>
                  {
                    offer.host.is_pro ?
                      <span className="property__user-status">
                        Pro
                      </span> : ``
                  }
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <ReviewListComponent reviewList={reviewList}/>
              {
                userIsLoggedIn ?
                  <ReviewForm hotelId={offer.id} onSubmitHandler={onSubmitReviewFormHandler} userIsLoggedIn={userIsLoggedIn}/> :
                  <div>
                    <span>Only registered users can write reviews. </span>
                    <Link to="/login">
                      <span className="offer-sign-in">Sign in</span>
                    </Link>
                  </div>
              }
            </div>
          </div>
          <section className="property__map map">
            <Map cityCoordinates={[offer.location.latitude, offer.location.longitude]} coordinatesList={nearPlacesCoordinates}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <PlacesList rentObjects={nearPlaces}/>
            </div>
          </section>
        </div>
      </main>;
    }

    return null;
  }
}

OfferComponent.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string),
    bedrooms: PropTypes.number,
    goods: PropTypes.arrayOf(PropTypes.string),
    host: PropTypes.shape({
      name: PropTypes.string
    }),
    description: PropTypes.string
  }),
  nearPlaces: PropTypes.array,
  onSubmitReviewFormHandler: PropTypes.func,
  userIsLoggedIn: PropTypes.bool,
  reviewList: PropTypes.array,
  loadReviewList: PropTypes.func
};
