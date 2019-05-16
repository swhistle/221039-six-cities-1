import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {App} from './app.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`click on rent object header works correctly`, () => {
  const clickHandler = jest.fn();
  const app = shallow(
      <App rentObjects={
        [
          `apartment 1`,
          `apartment 2`,
          `room 1`,
          `room 2`
        ]
      }
      onClick={clickHandler}
      />);

  const rentObjectHeader = app.find(`.place-card__name a`);
  expect(rentObjectHeader.length).to.strictEqual(4);
  rentObjectHeader.simulate(`click`);
  expect(clickHandler).toHaveBeenCalled();
});

