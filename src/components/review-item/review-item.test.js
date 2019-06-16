import React from 'react';
import renderer from 'react-test-renderer';

import {ReviewItemComponent} from "./review-item.jsx";

const TEST_REVIEW_ITEM = {
  id: 1,
  rating: 4,
  user: {
    id: 2,
    name: `user`
  },
  comment: `very good`,
  dateTime: `2019-05-08T14:13:56.569Z`
};

it(`ReviewItemComponent correct renders`, () => {
  const reviewItem = renderer
    .create(
        <ReviewItemComponent review={TEST_REVIEW_ITEM}/>
    ).toJSON();

  expect(reviewItem).toMatchSnapshot();
});
