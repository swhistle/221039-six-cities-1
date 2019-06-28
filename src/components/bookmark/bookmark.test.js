import React from 'react';
import renderer from 'react-test-renderer';

import {BookmarkComponent} from "./bookmark.jsx";

const TEST_HOTEL_ID = 1;
const TEST_HOTEL_IS_FAVORITE = false;

const addToBookmarks = () => {};
const changeElementIsActive = () => {};

it(`BookmarkComponent correct renders`, () => {
  const bookmarkComponent = renderer
    .create(
        <BookmarkComponent hotelId={TEST_HOTEL_ID} addToBookmarks={addToBookmarks} elementIsActive={TEST_HOTEL_IS_FAVORITE} changeElementIsActive={changeElementIsActive}/>
    ).toJSON();

  expect(bookmarkComponent).toMatchSnapshot();
});
