import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';

it(`App correctly renders`, () => {
  const app = renderer
    .create(<App/>)
    .toJSON();

  expect(app).toMatchSnapshot();
});
