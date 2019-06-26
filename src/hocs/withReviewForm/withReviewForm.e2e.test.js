import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {withReviewForm} from "./withReviewForm";

configure({adapter: new Adapter()});

const MockComponent = () => <div/>;
const MockComponentWrapped = withReviewForm(MockComponent);

it(`Should change WithReviewForm when form values are changed`, () => {
  const wrapper = shallow(<MockComponentWrapped rating={1} comment={`comment`}/>);

  expect(wrapper.state().rating).toEqual(1);
  expect(wrapper.state().comment).toEqual(`comment`);
});
