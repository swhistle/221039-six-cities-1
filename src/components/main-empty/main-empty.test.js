import React from 'react';
import renderer from 'react-test-renderer';

import {MainEmptyComponent} from "./main-empty.jsx";

const TEST_CURRENT_CITY = `Paris`;

it(`MainEmptyComponent correct renders`, () => {
  const mainEmpty = renderer
    .create(
        <MainEmptyComponent currentCityName={TEST_CURRENT_CITY}/>
    ).toJSON();

  expect(mainEmpty).toMatchSnapshot();
});
