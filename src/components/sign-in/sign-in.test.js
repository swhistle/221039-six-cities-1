import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from "react-router-dom";
import browserHistory from "../../history";

import {SignInComponent} from "./sign-in.jsx";

const TEST_CURRENT_CITY = `Amsterdam`;
const onSubmitHandler = () => {};

it(`SignInComponent correct renders`, () => {
  const signInComponent = renderer
    .create(
        <Router history={browserHistory}>
          <SignInComponent currentCity={TEST_CURRENT_CITY} onSubmitHandler={onSubmitHandler}/>
        </Router>
    ).toJSON();

  expect(signInComponent).toMatchSnapshot();
});
