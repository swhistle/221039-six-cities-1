const initialState = {
  city: null,
  offers: [],
  isAuthorizationRequired: false,
  user: null,
  sortOffersBy: null,
  selectedOfferId: null,
  currentOfferId: null,
  reviewList: [],
  favoriteOffersList: [],
};

export const Operations = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => dispatch(ActionCreators[Actions.GetOffersList](response.data)));
  },
  signIn: (signInData, browserHistory, path) => (dispatch, _getState, api) => {
    return api.post(`/login`, {
      email: signInData.email,
      password: signInData.password
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreators[Actions.SignIn](response.data));

          if (browserHistory) {
            browserHistory.push(path);
          }
        }
      });
  },
  loadReviewList: (hotelId) => (dispatch, _getState, api) => {
    return api.get(`/comments/${hotelId}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreators[Actions.GetReviewList](response.data));
        }
      });
  },
  sendReview: (review, hotelId) => (dispatch, _getState, api) => {
    return api.post(`/comments/${hotelId}`, {
      rating: review.rating,
      comment: review.comment
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch(Operations.loadReviewList(hotelId));
        }
      });
  },
  loadFavoriteHotels: () => (dispatch, _getState, api) => {
    return api.get(`/favorite`)
      .then((response) => dispatch(ActionCreators[Actions.GetFavoriteOffersList](response.data)));
  },
  addHotelInFavorites: (hotelId, hotelIsInFavorites) => (dispatch, _getState, api) => {
    return api.post(`/favorite/${hotelId}/${+hotelIsInFavorites}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(Operations.loadFavoriteHotels());
        }
      });
  }
};

const Actions = {
  ChangeCity: `CHANGE_CITY`,
  GetOffersList: `GET_OFFERS_LIST`,
  ChangeAuthorizationRequirement: `CHANGE_AUTHORIZATION_REQUIREMENT`,
  SignIn: `SIGN_IN`,
  ChangeOffersSorting: `CHANGE_OFFERS_SORTING`,
  SelectOffer: `SELECT_OFFER`,
  SendReview: `SEND_REVIEW`,
  GetReviewList: `GET_REVIEW_LIST`,
  ChangeCurrentOffer: `CHANGE_CURRENT_OFFER`,
  GetFavoriteOffersList: `GET_FAVORITE_OFFERS_LIST`,
};

const ActionCreators = {
  [Actions.ChangeCity]: (city) => {
    return {
      type: Actions.ChangeCity,
      payload: {
        city
      }
    };
  },
  [Actions.GetOffersList]: (offers) => {
    return {
      type: Actions.GetOffersList,
      payload: {
        offers
      }
    };
  },
  [Actions.ChangeAuthorizationRequirement]: (isAuthorizationRequired) => {
    return {
      type: Actions.ChangeAuthorizationRequirement,
      payload: {
        isAuthorizationRequired
      }
    };
  },
  [Actions.SignIn]: (signInData) => {
    return {
      type: Actions.SignIn,
      payload: {
        signInData
      }
    };
  },
  [Actions.ChangeOffersSorting]: (sortingType) => {
    return {
      type: Actions.ChangeOffersSorting,
      payload: {
        sortingType
      }
    };
  },
  [Actions.SelectOffer]: (selectedOfferId) => {
    return {
      type: Actions.SelectOffer,
      payload: {
        selectedOfferId
      }
    };
  },
  [Actions.GetReviewList]: (reviewList) => {
    return {
      type: Actions.GetReviewList,
      payload: {
        reviewList
      }
    };
  },
  [Actions.ChangeCurrentOffer]: (currentOfferId) => {
    return {
      type: Actions.ChangeCurrentOffer,
      payload: {
        currentOfferId
      }
    };
  },
  [Actions.GetFavoriteOffersList]: (favoriteOffersList) => {
    return {
      type: Actions.GetFavoriteOffersList,
      payload: {
        favoriteOffersList
      }
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ChangeCity:
      return Object.assign({}, state, {
        city: action.payload.city
      });

    case Actions.GetOffersList:
      return Object.assign({}, state, {
        offers: action.payload.offers,
        city: action.payload.offers[0].city
      });

    case Actions.ChangeAuthorizationRequirement:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload.isAuthorizationRequired
      });

    case Actions.SignIn:
      return Object.assign({}, state, {
        user: action.payload.signInData,
        isAuthorizationRequired: false
      });

    case Actions.ChangeOffersSorting:
      return Object.assign({}, state, {
        sortOffersBy: action.payload.sortingType
      });

    case Actions.SelectOffer:
      return Object.assign({}, state, {
        selectedOfferId: action.payload.selectedOfferId
      });

    case Actions.GetReviewList:
      return Object.assign({}, state, {
        reviewList: action.payload.reviewList
      });

    case Actions.ChangeCurrentOffer:
      return Object.assign({}, state, {
        currentOfferId: action.payload.currentOfferId
      });

    case Actions.GetFavoriteOffersList:
      return Object.assign({}, state, {
        favoriteOffersList: action.payload.favoriteOffersList
      });

    default:
      return state;
  }
};

export {Actions, ActionCreators, reducer};
