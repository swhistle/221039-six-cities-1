import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {withActiveItem} from "./withActiveItem";

configure({adapter: new Adapter()});

const MockComponent = () => <div/>;
const MockComponentWrapped = withActiveItem(MockComponent);

it(`Should change withActiveItemId when call click`, () => {
  const wrapper = shallow(<MockComponentWrapped activeItemId={0}/>);

  expect(wrapper.state().activeItemId).toEqual(0);
});
