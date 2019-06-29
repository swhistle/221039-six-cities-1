import React from "react";
import PropsTypes from "prop-types";
import {PlacesListComponent} from "../places-list/places-list.jsx";

export class FavoritesComponent extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {favoriteOffers, addToBookmarks} = this.props;

    if (favoriteOffers) {
      return <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {
            favoriteOffers.length > 0 ? <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <div className="favorites__list">
                <PlacesListComponent rentObjects={favoriteOffers} favoriteOffersList={favoriteOffers} addToBookmarks={addToBookmarks}/>
              </div>
            </section> : <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
              </div>
            </section>
          }
        </div>
      </main>;
    }

    return null;
  }
}

FavoritesComponent.propTypes = {
  favoriteOffers: PropsTypes.array,
  addToBookmarks: PropsTypes.func,
};
