import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from "react-router-dom";
import browserHistory from "../../history";

import {App} from './app.jsx';

const TEST_OFFERS = [
  {
    id: 1,
    city: {
      name: `Cologne`,
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 13
      }
    },
    type: `Private room`,
    title: `Wood and stone place`,
    price: 80,
    rating: 4,
    location: {
      latitude: 50.932361,
      longitude: 6.960974,
      zoom: 16
    }
  }
];

const CITY = TEST_OFFERS[0].city;

const onChangeCity = jest.fn(() => {});

it(`App correctly renders`, () => {
  const app = renderer
    .create(
        <Router history={browserHistory}>
          <App
            offers={TEST_OFFERS}
            currentCity={CITY}
            onChangeCity={onChangeCity}
          />
        </Router>
    ).toJSON();

  expect(app).toMatchSnapshot();
});
