import React from "react";
import ReactDOM from "react-dom";

import {App} from "./components/app/app.jsx";

const clickHandler = () => 0;

const rooms = [
  `Wood and stone place`,
  `Canal View Prinsengracht`,
  `Nice, cozy, warm big bed apartment`,
  `Cozy bed apartment`
];

const init = () => {
  ReactDOM.render(
      <App
        rentObjects={rooms}
        clickOnCardTitleHandler={clickHandler}/>,
      document.getElementById(`root`)
  );
};

init();
