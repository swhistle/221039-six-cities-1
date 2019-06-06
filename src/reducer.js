const initialState = {
  city: null,
  offers: []
};

export const Operations = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => dispatch(ActionCreators[Actions.GetOffersList](response.data)));
  }
};

const Actions = {
  ChangeCity: `CHANGE_CITY`,
  GetOffersList: `GET_OFFERS_LIST`
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

    default:
      return state;
  }
};

export {Actions, ActionCreators, reducer};
