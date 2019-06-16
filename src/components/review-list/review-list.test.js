import React from 'react';
import renderer from 'react-test-renderer';

import {ReviewListComponent} from "./review-list.jsx";

const TEST_REVIEW_LIST = [
  {
    id: 1,
    rating: 4,
    user: {
      id: 2,
      name: `user`
    },
    comment: `very good`,
    dateTime: `2019-05-08T14:13:56.569Z`
  }
];

it(`ReviewListComponent correct renders`, () => {
  const reviewList = renderer
    .create(
        <ReviewListComponent review={TEST_REVIEW_LIST}/>
    ).toJSON();

  expect(reviewList).toMatchSnapshot();
});
