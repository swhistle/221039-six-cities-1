import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {withElementIsActive} from "./withElementIsActive";

configure({adapter: new Adapter()});

const MockComponent = () => <div/>;
const MockComponentWrapped = withElementIsActive(MockComponent);

it(`Should change withActiveItemId when call click`, () => {
  const wrapper = shallow(<MockComponentWrapped elementIsActive={false}/>);

  expect(wrapper.state().elementIsActive).toEqual(false);
});
