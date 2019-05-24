import React from 'react';
import renderer from 'react-test-renderer';

import {PlaceCardComponent} from "./place-card.jsx";

const TEST_OFFER = {
  id: `1`,
  type: `Private room`,
  name: `Wood and stone place`,
  photoSrc: `img/room.jpg`,
  link: ``,
  price: `80`,
  rating: 4,
  coordinates: [52.3909553943508, 4.85309666406198]
};

const mouseOverCardImgHandler = () => {};

const clickOnCardTitleHandler = () => {};

it(`PlaceCardComponent correct renders`, () => {
  const placeCard = renderer
    .create(
        <PlaceCardComponent
          index={1}
          rentObject={TEST_OFFER}
          isActiveCard={true}
          mouseOverCardImgHandler={mouseOverCardImgHandler}
          clickOnCardTitleHandler={clickOnCardTitleHandler}/>
    ).toJSON();

  expect(placeCard).toMatchSnapshot();
});
