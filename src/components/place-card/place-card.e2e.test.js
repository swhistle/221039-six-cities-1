import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {PlaceCardComponent} from "./place-card.jsx";

Enzyme.configure({adapter: new Adapter()});

const TEST_OFFER = {
  id: 1,
  type: `Private room`,
  title: `Wood and stone place`,
  price: 80,
  rating: 4
};

const mouseOverCardImgHandler = jest.fn();

it(`hover on rent object image works correctly`, () => {
  const app = shallow(
      <PlaceCardComponent
        index={1}
        rentObject={TEST_OFFER}
        isActiveCard={true}
        mouseOverCardImgHandler={mouseOverCardImgHandler}/>
  );

  const rentObjectImg = app.find(`.place-card__image-wrapper a`);

  expect(rentObjectImg).toHaveLength(1);
  const firstRentObjectImg = rentObjectImg.first();
  firstRentObjectImg.simulate(`mouseover`);
  expect(mouseOverCardImgHandler).toHaveBeenCalledTimes(1);
});
