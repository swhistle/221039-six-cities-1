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
        cityId: cityId
      }
    }
  },
  [Actions.GetOffersList]: (offers) => {
    return {
      type: Actions.GetOffersList,
      payload: {
        offers: offers
      }
    }
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ChangeCity:
      return {
        ...state,
        cityId: action.payload.cityId
      };

    case Actions.GetOffersList:
      return {
        ...state,
        offers: action.payload.offers
      };
  }
};

export {Actions, ActionCreators, reducer};
