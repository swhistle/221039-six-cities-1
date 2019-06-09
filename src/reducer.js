const initialState = {
  city: null,
  offers: [],
  isAuthorizationRequired: false,
  user: null
};

export const Operations = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => dispatch(ActionCreators[Actions.GetOffersList](response.data)));
  },
  signIn: (signInData) => (dispatch, _getState, api) => {
    return api.post(`/login`, {
      email: signInData.email,
      password: signInData.password
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreators[Actions.SignIn](response.data));
          history.pushState(null, null, `/`);
        }
      });
  }
};

const Actions = {
  ChangeCity: `CHANGE_CITY`,
  GetOffersList: `GET_OFFERS_LIST`,
  ChangeAuthorizationRequirement: `CHANGE_AUTHORIZATION_REQUIREMENT`,
  SignIn: `SIGN_IN`,
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
  }
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

    default:
      return state;
  }
};

export {Actions, ActionCreators, reducer};
