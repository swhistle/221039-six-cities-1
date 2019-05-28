import React from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";

export class Map extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  _initMap() {
    const {cityCoordinates, coordinatesList} = this.props;

    const icon = leaflet.icon({
      iconUrl: `img/map-pin.svg`,
      iconSize: [30, 30]
    });

    const zoom = 12;
    const map = leaflet.map(`map`, {
      center: cityCoordinates,
      zoom,
      zoomControl: false,
      marker: true
    });
    map.setView(cityCoordinates, zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);

    coordinatesList.forEach((coordinates) => {
      leaflet
        .marker(coordinates, {icon})
        .addTo(map);
    });
  }

  componentDidMount() {
    this._initMap();
  }

  render() {
    return <div id="map"></div>;
  }
}


Map.propTypes = {
  cityCoordinates: PropTypes.array.isRequired,
  coordinatesList: PropTypes.array.isRequired
};
