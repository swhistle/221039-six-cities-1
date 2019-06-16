import React from 'react';
import renderer from 'react-test-renderer';

import {OfferComponent} from "./offer.jsx";

const TEST_OFFER = {
  id: 1,
  type: `Private room`,
  title: `Wood and stone place`,
  images: [``],
  price: 80,
  rating: 4,
  bedrooms: 1,
  goods: [],
  host: {
    name: `host`,
  },
  description: `description`
};

it(`OfferComponent correct renders`, () => {
  const offer = renderer
    .create(
        <OfferComponent offer={TEST_OFFER}/>
    ).toJSON();

  expect(offer).toMatchSnapshot();
});
