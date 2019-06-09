import React from 'react';
import renderer from 'react-test-renderer';

import {SignInComponent} from "./sign-in.jsx";

const onSubmitHandler = () => {};

it(`SignInComponent correct renders`, () => {
  const signInComponent = renderer
    .create(
        <SignInComponent onSubmitHandler={onSubmitHandler}/>
    ).toJSON();

  expect(signInComponent).toMatchSnapshot();
});
