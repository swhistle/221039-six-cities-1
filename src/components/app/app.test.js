import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';

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

it(`App correctly renders`, () => {
  const app = renderer
    .create(<App offers={TEST_OFFERS}
    />)
    .toJSON();

  expect(app).toMatchSnapshot();
});
