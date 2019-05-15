import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';

it(`App correctly renders`, () => {
  const app = renderer
    .create(<App rentObjects={
      [
        `apartment 1`,
        `apartment 2`,
        `room 1`,
        `room 2`
      ]
    }
    />)
    .toJSON();

  expect(app).toMatchSnapshot();
});
