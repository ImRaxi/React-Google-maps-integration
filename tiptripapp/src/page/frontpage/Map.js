import React from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  DirectionsRenderer
} from "react-google-maps";

class MapDirectionsRenderer extends React.Component {
  state = {
    directions: null,
    error: null,
    markerPosition: null
  };

  componentDidMount() {
    this.renderMap();
  }

  renderMap() {
    const google = window.google
    const { places, travelMode } = this.props;
    const waypoints = places.map(p =>({
        location: {lat: p.latitude, lng:p.longitude},
        stopover: true
    }));
    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;
    const directionsService = new google.maps.DirectionsService();
    
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: travelMode,
        waypoints: waypoints
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
        } else {
          this.setState({ error: result });
        }
      }
    );
  }

  render() {

    if (this.state.error) {
      return <h1>{this.state.error}</h1>;
    }

    return (this.state.directions && <DirectionsRenderer directions={this.state.directions} />)
  }
}

const Map = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultCenter={props.defaultCenter}
      defaultZoom={props.defaultZoom}
      onClick={props.onMapClick}
    >

      {props.markers.map((marker, index) => {
        const position = { lat: marker.latitude, lng: marker.longitude };
        return <Marker key={index} position={position} />;
      })}
      

      {props.markers.length > 0 ?

      <MapDirectionsRenderer
        places={props.markers}
        travelMode={window.google.maps.TravelMode.DRIVING}
      /> 
      
      : ''}


      {props.markersList.length > 0 ? 
        props.markersList.map((val, idx) => {
          return <Marker key={idx} position={val} /> 
        })
        
      : null}

    </GoogleMap>
  ))
);

export default Map;
