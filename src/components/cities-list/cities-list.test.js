import React from 'react';
import renderer from 'react-test-renderer';

import {CitiesListComponent} from "./cities-list.jsx";

const TEST_CITIES = [
  {
    id: 1,
    name: `Amsterdam`,
    coordinates: [52.36533, 4.9]
  },
  {
    id: 2,
    name: `Barcelona`,
    coordinates: [41.3809, 2.1788]
  }
];

const clickOnCityHandler = () => {};

it(`CitiesListComponent correct renders`, () => {
  const cities = renderer
    .create(
        <CitiesListComponent
          citiesList={TEST_CITIES}
          currentCityId={TEST_CITIES[0].id}
          clickOnCityHandler={clickOnCityHandler}/>
    ).toJSON();

  expect(cities).toMatchSnapshot();
});
