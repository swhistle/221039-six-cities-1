import React from 'react';
import renderer from 'react-test-renderer';

import {ReviewFormComponent} from "./review-form.jsx";

const TEST_HOTEL_ID = 1;
const onSubmitHandler = jest.fn(() => {});

it(`ReviewFormComponent correct renders`, () => {
  const reviewForm = renderer
    .create(
        <ReviewFormComponent hotelId={TEST_HOTEL_ID} onSubmitHandler={onSubmitHandler}/>
    ).toJSON();

  expect(reviewForm).toMatchSnapshot();
});
