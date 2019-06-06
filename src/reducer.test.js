import {reducer} from "./reducer";

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
    offers: []
  });
});

it(`Should change city`, () => {
  expect(reducer({
    city: undefined,
    offers: []
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
        offers: []
      }
  );
});

it(`Should get offers`, () => {
  expect(reducer({
    city: undefined,
    offers: []
  }, {
    type: `GET_OFFERS_LIST`,
    payload: {
      offers: MOCK_OFFERS
    }
  })).toEqual({
    city: undefined,
    offers: MOCK_OFFERS
  });
});
