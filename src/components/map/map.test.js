import React from 'react';
import renderer from 'react-test-renderer';

import {Map} from "./map.jsx";

const COORDINATES_LIST = [
  [52.3909553943508, 4.929309666406198],
  [52.3909553943508, 4.85309666406198]
];

it(`Map correct renders`, () => {
  const map = renderer
    .create(
        <Map coordinatesList={COORDINATES_LIST}/>
    ).toJSON();

  expect(map).toMatchSnapshot();
});
