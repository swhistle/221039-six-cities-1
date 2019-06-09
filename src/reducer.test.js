import {reducer, Operations, Actions} from "./reducer";
import {configureAPI} from "./api";
import MockAdapter from "axios-mock-adapter";

const MOCK_OFFERS = [
  {
    id: 1,
    type: `Private room`,
    title: `Wood and stone place`,
    price: 80,
    rating: 4
  }
];

it(`Should return initial state by default`, () => {
  expect(reducer(undefined, {})).toEqual({
    city: null,
    offers: [],
    user: null
  });
});

it(`Should change city`, () => {
  expect(reducer({
    city: undefined,
    offers: [],
    user: null
  }, {
    type: `CHANGE_CITY`,
    payload: {
      city: {
        name: `Cologne`,
        location: {
          latitude: 50.938361,
          longitude: 6.959974,
          zoom: 13
        }
      }
    }
  })).toEqual(
      {
        city: {
          name: `Cologne`,
          location: {
            latitude: 50.938361,
            longitude: 6.959974,
            zoom: 13
          }
        },
        offers: [],
        user: null
      }
  );
});

it(`Should get offers`, () => {
  expect(reducer({
    city: undefined,
    offers: [],
    user: null
  }, {
    type: `GET_OFFERS_LIST`,
    payload: {
      offers: MOCK_OFFERS
    }
  })).toEqual({
    city: undefined,
    offers: MOCK_OFFERS,
    user: null
  });
});

it(`Should make a correct API call to /hotels`, () => {
  const dispatch = jest.fn();
  const api = configureAPI(dispatch);
  const apiMock = new MockAdapter(api);
  const offersLoader = Operations.loadOffers();

  apiMock
    .onGet(`/hotels`)
    .reply(200, [{fake: true}]);

  return offersLoader(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: Actions.GetOffersList,
        payload: {
          offers: [{fake: true}]
        },
      });
    });
});

it(`Should make a correct API call to /login`, () => {
  const mockSignInData = {
    email: `user@mail.ru`,
    password: `123456`
  };
  const dispatch = jest.fn();
  const api = configureAPI(dispatch);
  const apiMock = new MockAdapter(api);
  const signIn = Operations.signIn(mockSignInData);

  apiMock
    .onPost(`/login`, {email: mockSignInData.email, password: mockSignInData.password})
    .reply(200, [{fake: true}]);

  return signIn(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: Actions.SignIn,
        payload: {
          signInData: [{fake: true}]
        },
      });
    });
});
