import {reducer, Operations, Actions} from "./reducer";
import {configureAPI} from "./api";
import MockAdapter from "axios-mock-adapter";

const MOCK_OFFERS = [
  {
    id: 1,
    type: `Private room`,
    title: `Wood and stone place`,
    price: 80,
    rating: 4,
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13
    }
  }
];

const INITIAL_STATE = {
  city: null,
  offers: [],
  isAuthorizationRequired: false,
  user: null,
  sortOffersBy: null,
  selectedOfferId: null,
  currentOfferId: null,
  reviewList: [],
  favoriteOffersList: [],
  reviewFormState: {
    disabled: false,
    errorOccurred: false
  }
};

it(`Should return initial state by default`, () => {
  expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
});

it(`Should change city`, () => {
  expect(reducer(INITIAL_STATE, {
    type: Actions.ChangeCity,
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
      Object.assign({}, INITIAL_STATE, {
        city: {
          name: `Cologne`,
          location: {
            latitude: 50.938361,
            longitude: 6.959974,
            zoom: 13
          }
        },
      })
  );
});

it(`Should sort offers`, () => {
  expect(reducer(
      Object.assign({}, INITIAL_STATE, {
        offers: MOCK_OFFERS
      }), {
        type: Actions.ChangeOffersSorting,
        payload: {
          sortingType: `Popular`
        }
      })).toEqual(
      Object.assign({}, INITIAL_STATE, {
        offers: MOCK_OFFERS,
        sortOffersBy: `Popular`
      })
  );
});

it(`Should select offer`, () => {
  expect(reducer(
      Object.assign({}, INITIAL_STATE, {
        offers: MOCK_OFFERS
      }), {
        type: Actions.SelectOffer,
        payload: {
          selectedOfferId: MOCK_OFFERS.id
        }
      })).toEqual(
      Object.assign({}, INITIAL_STATE, {
        offers: MOCK_OFFERS,
        selectedOfferId: MOCK_OFFERS.id
      })
  );
});

it(`Should disable review form`, () => {
  expect(reducer(
      Object.assign({}, INITIAL_STATE), {
        type: Actions.DisableReviewForm,
        payload: {
          disableReviewForm: true
        }
      })).toEqual(
      Object.assign({}, INITIAL_STATE, {
        reviewFormState: {
          disabled: true,
          errorOccurred: false
        }
      })
  );
});

it(`Should fail to send review`, () => {
  expect(reducer(
      Object.assign({}, INITIAL_STATE), {
        type: Actions.FailSendingReview,
        payload: {
          errorOccurred: true
        }
      })).toEqual(
      Object.assign({}, INITIAL_STATE, {
        reviewFormState: {
          disabled: undefined,
          errorOccurred: true
        }
      })
  );
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

it(`Should make a correct API call to /comments/:hotelId (get review list)`, () => {
  const mockHotelId = 1;
  const dispatch = jest.fn();
  const api = configureAPI(dispatch);
  const apiMock = new MockAdapter(api);
  const loadReviewList = Operations.loadReviewList(mockHotelId);

  apiMock
    .onGet(`/comments/${mockHotelId}`)
    .reply(200, [{fake: true}]);

  return loadReviewList(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: Actions.GetReviewList,
        payload: {
          reviewList: [{fake: true}]
        },
      });
    });
});

it(`Should make a correct API call to /comments/:hotelId (send review)`, () => {
  const mockHotelId = 1;
  const mockReview = {
    rating: 5,
    comment: `test comment`
  };

  const dispatch = jest.fn();
  const api = configureAPI(dispatch);
  const apiMock = new MockAdapter(api);
  const sendReview = Operations.sendReview(mockReview, mockHotelId);

  apiMock
    .onPost(`/comments/${mockHotelId}`, {rating: mockReview.rating, comment: mockReview.comment})
    .reply(200, [{fake: true}]);

  return sendReview(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2); // send review and then get review list
    });
});

it(`Should make a correct API call to /favorite (get favorite offers list)`, () => {
  const dispatch = jest.fn();
  const api = configureAPI(dispatch);
  const apiMock = new MockAdapter(api);
  const loadFavoriteOffersList = Operations.loadFavoriteHotels();

  apiMock
    .onGet(`/favorite`)
    .reply(200, [{fake: true}]);

  return loadFavoriteOffersList(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: Actions.GetFavoriteOffersList,
        payload: {
          favoriteOffersList: [{fake: true}]
        },
      });
    });
});

it(`Should make a correct API call to /favorite (add hotel in favorites)`, () => {
  const mockHotelId = 1;
  const mockHotelIsFavorite = true;
  const dispatch = jest.fn();
  const api = configureAPI(dispatch);
  const apiMock = new MockAdapter(api);
  const addHotelInFavorite = Operations.addHotelInFavorites(mockHotelId, mockHotelIsFavorite);

  apiMock
    .onPost(`/favorite/${mockHotelId}/${+mockHotelIsFavorite}`)
    .reply(200, [{fake: true}]);

  return addHotelInFavorite(dispatch, jest.fn(), api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
});
