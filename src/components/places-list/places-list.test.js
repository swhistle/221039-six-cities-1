import React from 'react';
import renderer from 'react-test-renderer';

import {PlacesListComponent} from "./places-list.jsx";

const TEST_OFFERS = [
  {
    id: `1`,
    type: `Private room`,
    name: `Wood and stone place`,
    photoSrc: `img/room.jpg`,
    link: ``,
    price: `80`,
    rating: 4
  }
];

it(`PlacesListComponent correct renders`, () => {
  const placesList = renderer
    .create(
        <PlacesListComponent rentObjects={TEST_OFFERS}/>
    ).toJSON();

  expect(placesList).toMatchSnapshot();
});
