import React from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";

export class Map extends React.Component {

  constructor(props) {
    super(props);
  }

  _initMap() {
    this.icon = leaflet.icon({
      iconUrl: `/img/map-pin.svg`,
      iconSize: [30, 30]
    });

    this.activeIcon = leaflet.icon({
      iconUrl: `/img/map-pin-active.svg`,
      iconSize: [30, 30]
    });

    this.zoom = 12;

    this.map = leaflet.map(`map`, {
      center: this.props.cityCoordinates,
      zoom: this.zoom,
      zoomControl: false,
      marker: true
    });

    this._setView();

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this.map);

    this.layerGroup = leaflet.layerGroup().addTo(this.map);

    this._addMarkersToMap();
  }

  _updateMap() {
    this.layerGroup.clearLayers();

    this._setView();
    this._addMarkersToMap();
  }

  _addMarkersToMap() {
    this.props.coordinatesList.forEach((coordinates) => {
      leaflet
        .marker(coordinates, {icon: this.icon})
        .addTo(this.layerGroup);
    });
  }

  _setView() {
    this.map.setView(this.props.cityCoordinates, this.zoom);
  }

  _addActiveMarkerToMap() {
    const selectedOfferCoordinates = [this.props.selectedOffer.location.latitude, this.props.selectedOffer.location.longitude];
    leaflet
      .marker(selectedOfferCoordinates, {icon: this.activeIcon})
      .addTo(this.layerGroup);
  }

  componentDidMount() {
    this._initMap();
  }

  componentDidUpdate(prevProps) {
    if (!Object.is(this.props.cityCoordinates, prevProps.cityCoordinates) &&
      !Object.is(this.props.coordinatesList, prevProps.coordinatesList)) {
      this._updateMap();
    }

    if (!Object.is(this.props.selectedOffer, prevProps.selectedOffer)) {
      this._addActiveMarkerToMap();
    }
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    return <div id="map"></div>;
  }
}


Map.propTypes = {
  cityCoordinates: PropTypes.array.isRequired,
  coordinatesList: PropTypes.array.isRequired,
  selectedOffer: PropTypes.object
};
