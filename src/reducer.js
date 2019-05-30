const initialState = {
  cityId: 1,
  offers: []
};

const Actions = {
  ChangeCity: `CHANGE_CITY`,
  GetOffersList: `GET_OFFERS_LIST`
};

const ActionCreators = {
  [Actions.ChangeCity]: (cityId) => {
    return {
      type: Actions.ChangeCity,
      payload: {
        cityId
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
        cityId: action.payload.cityId
      });

    case Actions.GetOffersList:
      return Object.assign({}, state, {
        offers: action.payload.offers
      });

    default:
      return state;
  }
};

export {Actions, ActionCreators, reducer};
