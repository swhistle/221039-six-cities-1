import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Switch, Route, Link} from "react-router-dom";

import PlacesList from "../places-list/places-list.jsx";
import {CitiesListComponent} from "../cities-list/cities-list.jsx";
import SortingOffers from "../sorting-offers/sorting-offers.jsx";
import {Map} from "../map/map.jsx";
import {SignInComponent} from "../sign-in/sign-in.jsx";
import {OfferComponent} from "../offer/offer.jsx";
import {MainEmptyComponent} from "../main-empty/main-empty.jsx";
import {FavoritesComponent} from "../favorites/favorites.jsx";

import {Actions, ActionCreators, Operations} from "../../reducer";

import browserHistory from "../../history";

class App extends React.PureComponent {
  constructor() {
    super();

    this._changeCity = this._changeCity.bind(this);
    this._onSubmitHandler = this._onSubmitHandler.bind(this);
    this._changeSorting = this._changeSorting.bind(this);
    this._selectOffer = this._selectOffer.bind(this);
    this._onSubmitReviewFormHandler = this._onSubmitReviewFormHandler.bind(this);
    this._loadReviewList = this._loadReviewList.bind(this);
    this._addToBookmarks = this._addToBookmarks.bind(this);
  }

  _changeCity(e, city) {
    e.preventDefault();
    this.props.onChangeCity(city);
  }

  _onSubmitHandler(e, signInData) {
    e.preventDefault();
    this.props.signIn(signInData);
  }

  _changeSorting(sortingType) {
    this.props.changeOffersSorting(sortingType);
  }

  _selectOffer(offerId) {
    this.props.selectOffer(offerId);
  }

  _onSubmitReviewFormHandler(review, hotelId) {
    this.props.sendReview(review, hotelId);
  }

  _loadReviewList(hotelId) {
    this.props.loadReviewList(hotelId);
  }

  _changeCurrentOffer(newOfferId) {
    this.props.changeCurrentOffer(newOfferId);
  }

  _addToBookmarks(hotelId, hotelIsBookmarked) {
    this.props.addHotelInFavorites(hotelId, hotelIsBookmarked);
  }

  render() {
    const {offers, currentCity, user, sortOffersBy, selectedOfferId, reviewList, favoriteOffersList} = this.props;
    const userIsLoggedIn = !!user && !!user.avatar_url && !!user.id;

    return <Switch>
      <Route path="/login" render={() => <SignInComponent onSubmitHandler={this._onSubmitHandler}/>}/>

      <Route path="/favorites" render={() => <FavoritesComponent favoriteOffers={favoriteOffersList} addToBookmarks={this._addToBookmarks}/>}/>

      <Route path="/" exact render={() => {
        if (offers && offers.length > 0) {
          const cityList = offers.reduce((acc, item) => {
            if (!acc.some((c) => c.name === item.city.name)) {
              return acc.concat(item.city);
            }

            return acc;
          }, []);

          const offersList = offers.filter((item) => item.city.name === currentCity.name);
          const offersCoordinates = offersList.map((offer) => [offer.location.latitude, offer.location.longitude]);
          const selectedOffer = offers.find((item) => item.id === selectedOfferId);
          const offersListIsEmpty = offers.length === 0;

          return <React.Fragment>
            <header className="header">
              <div className="container">
                <div className="header__wrapper">
                  <div className="header__left">
                    <a className="header__logo-link">
                      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
                    </a>
                  </div>
                  <nav className="header__nav">
                    <ul className="header__nav-list">
                      <li className="header__nav-item user">
                        {
                          userIsLoggedIn ? <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                            <div className="header__avatar-wrapper user__avatar-wrapper">
                              <img src={`https://es31-server.appspot.com/six-cities${user.avatar_url}`} alt="avatar"/>
                            </div>
                          </Link> : <Link className="header__nav-link header__nav-link--profile" to="/login">
                            <div className="header__avatar-wrapper user__avatar-wrapper"/>
                            <span className="header__login">Sign in</span>
                          </Link>
                        }
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </header>

            <main className="page__main page__main--property">
              <h1 className="visually-hidden">Cities</h1>
              <div className="cities tabs">
                <section className="locations container">
                  <CitiesListComponent
                    citiesList={cityList}
                    currentCityName={currentCity.name}
                    clickOnCityHandler={this._changeCity}/>
                </section>
              </div>

              {offersListIsEmpty ?
                <MainEmptyComponent currentCityName={currentCity.name}/> :

                <React.Fragment>
                  <SortingOffers changeSorting={this._changeSorting} activeSortingType={sortOffersBy}/>
                  <div className="cities__places-wrapper">
                    <div className="cities__places-container container">
                      <section className="cities__places places">
                        <h2 className="visually-hidden">Places</h2>
                        <b className="places__found">{offersList.length} places to stay in {currentCity.name}</b>
                        <div className="cities__places-list places__list tabs__content">
                          <PlacesList rentObjects={offersList} sortOffersBy={sortOffersBy} selectOffer={this._selectOffer} favoriteOffersList={favoriteOffersList} addToBookmarks={this._addToBookmarks}/>
                        </div>
                      </section>
                      <div className="cities__right-section">
                        <section className="cities__map map">
                          <Map cityCoordinates={[currentCity.location.latitude, currentCity.location.longitude]} coordinatesList={offersCoordinates} selectedOffer={selectedOffer}/>
                        </section>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              }
            </main>
          </React.Fragment>;
        }

        return null;
      }}/>

      <Route path="/:id" render={() => {

        const offerId = +browserHistory.location.pathname.replace(`/`, ``);
        const currentOffer = offers.find((item) => item.id === offerId);

        if (currentOffer) {
          this._changeCurrentOffer(offerId);
          const currentOfferIsFavorite = favoriteOffersList.some((offer) => offer.id === currentOffer.id && offer.is_favorite);

          const nearPlaces = offers
            .filter((item) => item.city.name === currentOffer.city.name)
            .slice(0, 3);

          return <OfferComponent
            offer={currentOffer}
            nearPlaces={nearPlaces}
            onSubmitReviewFormHandler={this._onSubmitReviewFormHandler}
            userIsLoggedIn={userIsLoggedIn}
            reviewList={reviewList}
            loadReviewList={this._loadReviewList}
            addToBookmarks={this._addToBookmarks}
            currentOfferIsFavorite={currentOfferIsFavorite}/>;
        }

        return null;
      }}/>
    </Switch>;
  }
}

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  offers: state.offers,
  currentCity: state.city,
  user: state.user,
  sortOffersBy: state.sortOffersBy,
  selectedOfferId: state.selectedOfferId,
  reviewList: state.reviewList,
  favoriteOffersList: state.favoriteOffersList
});

const mapDispatchToProps = (dispatch) => ({
  onChangeCity: (city) => {
    dispatch(ActionCreators[Actions.ChangeCity](city));
  },
  changeAuthorizationRequirement: (isAuthorizationRequired) => {
    dispatch(ActionCreators[Actions.ChangeAuthorizationRequirement](isAuthorizationRequired));
  },
  signIn: (signInData) => {
    dispatch(Operations.signIn(signInData, browserHistory, `/`));
  },
  changeOffersSorting: (sortingType) => {
    dispatch(ActionCreators[Actions.ChangeOffersSorting](sortingType));
  },
  selectOffer: (selectedOfferId) => {
    dispatch(ActionCreators[Actions.SelectOffer](selectedOfferId));
  },
  sendReview: (review, hotelId) => {
    dispatch(Operations.sendReview(review, hotelId));
  },
  loadReviewList: (hotelId) => {
    dispatch(Operations.loadReviewList(hotelId));
  },
  changeCurrentOffer: (newOfferId) => {
    dispatch(ActionCreators[Actions.ChangeCurrentOffer](newOfferId));
  },
  addHotelInFavorites: (hotelId, hotelIsInFavorites) => {
    dispatch(Operations.addHotelInFavorites(hotelId, hotelIsInFavorites));
  },
});

App.propTypes = {
  offers: PropTypes.array,
  currentCity: PropTypes.object,
  user: PropTypes.object,
  sortOffersBy: PropTypes.string,
  onChangeCity: PropTypes.func,
  changeAuthorizationRequirement: PropTypes.func,
  signIn: PropTypes.func,
  changeOffersSorting: PropTypes.func,
  selectedOfferId: PropTypes.number,
  selectOffer: PropTypes.func,
  sendReview: PropTypes.func,
  loadReviewList: PropTypes.func,
  currentOfferId: PropTypes.number,
  changeCurrentOffer: PropTypes.func,
  reviewList: PropTypes.array,
  addHotelInFavorites: PropTypes.func,
  favoriteOffersList: PropTypes.array
};

export {App};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
