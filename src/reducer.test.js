import {reducer} from "./reducer";

const MOCK_OFFERS = [
  {
    id: 1,
    cityId: 1,
    type: `Private room`,
    name: `Wood and stone place`,
    photoSrc: `img/room.jpg`,
    link: ``,
    price: `80`,
    rating: 4,
    coordinates: [52.3909553943508, 4.85309666406198]
  }
];

it(`Should return initial state by default`, () => {
  expect(reducer(undefined, {})).toEqual({
    cityId: 1,
    offers: []
  });
});

it(`Should change city`, () => {
  expect(reducer({
    cityId: 1,
    offers: []
  }, {
    type: `CHANGE_CITY`,
    payload: {
      cityId: 2
    }
  })).toEqual({
    cityId: 2,
    offers: []
  });
});

it(`Should get offers`, () => {
  expect(reducer({
    cityId: 1,
    offers: []
  }, {
    type: `GET_OFFERS_LIST`,
    payload: {
      offers: MOCK_OFFERS
    }
  })).toEqual({
    cityId: 1,
    offers: MOCK_OFFERS
  });
});
