import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {CitiesListComponent} from "./cities-list.jsx";

Enzyme.configure({adapter: new Adapter()});

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

const clickOnCityHandler = jest.fn();

it(`click on city item works correctly`, () => {
  const app = shallow(
      <CitiesListComponent
        citiesList={TEST_CITIES}
        currentCityId={TEST_CITIES[1].id}
        clickOnCityHandler={clickOnCityHandler}
      />
  );

  const cityItemTab = app.find(`.locations__item a`);

  expect(cityItemTab).toHaveLength(2);
  const firstCityItemTab = cityItemTab.first();

  firstCityItemTab.simulate(`click`);
  expect(clickOnCityHandler).toHaveBeenCalledTimes(1);
});
