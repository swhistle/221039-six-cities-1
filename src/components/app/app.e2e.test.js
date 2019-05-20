import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {App} from './app.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`click on rent object header works correctly`, () => {
  const rooms = [
    `apartment 1`,
    `apartment 2`,
    `room 1`,
    `room 2`
  ];
  const clickHandler = jest.fn();

  const app = shallow(
      <App
        rentObjects={rooms}
        clickOnCardTitleHandler={clickHandler}
      />);

  const rentObjectHeader = app.find(`.place-card__name a`);
  expect(rentObjectHeader).toHaveLength(4);
  const firstRentObjectHeader = rentObjectHeader.first();
  firstRentObjectHeader.simulate(`click`);
  expect(clickHandler).toHaveBeenCalledTimes(1);
});

