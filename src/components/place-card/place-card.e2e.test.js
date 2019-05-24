import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {PlaceCardComponent} from "./place-card.jsx";

Enzyme.configure({adapter: new Adapter()});

const TEST_OFFER = {
  id: `1`,
  type: `Private room`,
  name: `Wood and stone place`,
  photoSrc: `img/room.jpg`,
  link: ``,
  price: `80`,
  rating: 4,
  coordinates: [52.3909553943508, 4.85309666406198]
};

const mouseOverCardImgHandler = jest.fn();
const clickOnCardTitleHandler = jest.fn();

it(`hover on rent object image works correctly`, () => {
  const app = shallow(
      <PlaceCardComponent
        index={1}
        rentObject={TEST_OFFER}
        isActiveCard={true}
        mouseOverCardImgHandler={mouseOverCardImgHandler}
        clickOnCardTitleHandler={clickOnCardTitleHandler}/>
  );

  const rentObjectImg = app.find(`.place-card__image-wrapper a`);
  const rentObjectHeader = app.find(`.place-card__name a`);

  expect(rentObjectImg).toHaveLength(1);
  const firstRentObjectImg = rentObjectImg.first();
  firstRentObjectImg.simulate(`mouseover`);
  expect(mouseOverCardImgHandler).toHaveBeenCalledTimes(1);

  expect(rentObjectHeader).toHaveLength(1);
  const firstRentObjectHeader = rentObjectHeader.first();
  firstRentObjectHeader.simulate(`click`);
  expect(clickOnCardTitleHandler).toHaveBeenCalledTimes(1);
});
