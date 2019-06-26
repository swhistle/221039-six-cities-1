import React from 'react';
import renderer from 'react-test-renderer';

import {ReviewFormComponent} from "./review-form.jsx";

it(`ReviewFormComponent correct renders`, () => {
  const reviewForm = renderer
    .create(
        <ReviewFormComponent/>
    ).toJSON();

  expect(reviewForm).toMatchSnapshot();
});
