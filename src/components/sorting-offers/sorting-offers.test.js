import React from 'react';
import renderer from 'react-test-renderer';

import {SortingOffersComponent, sortingOffersTypes} from "./sorting-offers.jsx";

const TEST_ACTIVE_SORTING_TYPE = sortingOffersTypes[0];

const changeSorting = jest.fn(() => {});

it(`SortingOffersComponent correct renders`, () => {
  const sortingOffers = renderer
    .create(
        <SortingOffersComponent activeSortingType={TEST_ACTIVE_SORTING_TYPE} changeSorting={changeSorting}/>
    ).toJSON();

  expect(sortingOffers).toMatchSnapshot();
});
