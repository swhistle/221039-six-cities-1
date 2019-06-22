import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from "react-router-dom";
import browserHistory from "../../history";

import {PlaceCardComponent} from "./place-card.jsx";

const TEST_OFFER = {
  id: 1,
  type: `Private room`,
  title: `Wood and stone place`,
  price: 80,
  rating: 4,
  location: {
    longitude: 1,
    latitude: 1,
    zoom: 1
  }
};

const clickOnCardImgHandler = () => {};

it(`PlaceCardComponent correct renders`, () => {
  const placeCard = renderer
    .create(
        <Router history={browserHistory}>
          <PlaceCardComponent
            index={1}
            rentObject={TEST_OFFER}
            isActiveCard={true}
            clickOnCardImgHandler={clickOnCardImgHandler}/>
        </Router>
    ).toJSON();

  expect(placeCard).toMatchSnapshot();
});
