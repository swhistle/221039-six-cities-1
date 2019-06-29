import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from "react-router-dom";
import browserHistory from "../../history";

import {FavoritesComponent} from "./favorites.jsx";

const TEST_FAVORITES_OFFERS = [
  {
    id: 1,
    type: `room`,
    title: `Wood and stone place`,
    price: 80,
    rating: 4,
    location: {
      longitude: 1,
      latitude: 1,
      zoom: 1
    }
  }
];

it(`FavoritesComponent correct renders`, () => {
  const favoritesList = renderer
    .create(
        <Router history={browserHistory}>
          <FavoritesComponent favoriteOffers={TEST_FAVORITES_OFFERS}/>
        </Router>
    ).toJSON();
  expect(favoritesList).toMatchSnapshot();
});
