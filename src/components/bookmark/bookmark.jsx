import React from "react";
import PropTypes from "prop-types";

import {withElementIsActive} from "../../hocs/withElementIsActive/withElementIsActive";

class BookmarkComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    this._addToBookmarks = this._addToBookmarks.bind(this);
  }

  _addToBookmarks(hotelId, elementIsActive) {
    this.props.changeElementIsActive(elementIsActive);
    this.props.addToBookmarks(hotelId, !elementIsActive);
  }

  render() {
    const {width = 18, height = 19, elementIsActive, hotelId} = this.props;

    return <button className="place-card__bookmark-button button" type="button" onClick={() => this._addToBookmarks(hotelId, elementIsActive)}>
      <svg className={elementIsActive ? `property__bookmark-icon property__bookmark-icon--active` : `property__bookmark-icon`} width={width} height={height} viewBox="0 0 17 18" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"/>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>;
  }
}

BookmarkComponent.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  addToBookmarks: PropTypes.func,
  elementIsActive: PropTypes.bool,
  changeElementIsActive: PropTypes.func,
  hotelId: PropTypes.number,
};

export {BookmarkComponent};

export default withElementIsActive(BookmarkComponent);
