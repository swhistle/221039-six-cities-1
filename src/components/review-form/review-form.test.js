import React from 'react';
import renderer from 'react-test-renderer';

import {ReviewFormComponent} from "./review-form.jsx";

const TEST_HOTEL_ID = 1;
const TEST_USER_IS_LOGGED_IN = true;
const TEST_REVIEW_FORM_STATE = {
  disabled: false,
  errorOccurred: false
};
const onSubmitHandler = jest.fn(() => {});

it(`ReviewFormComponent correct renders`, () => {
  const reviewForm = renderer
    .create(
        <ReviewFormComponent hotelId={TEST_HOTEL_ID} onSubmitHandler={onSubmitHandler} userIsLoggedIn={TEST_USER_IS_LOGGED_IN} reviewFormState={TEST_REVIEW_FORM_STATE}/>
    ).toJSON();

  expect(reviewForm).toMatchSnapshot();
});
