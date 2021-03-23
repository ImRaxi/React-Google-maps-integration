import React, { Component } from "react";
import Map from "./Map";
import '../../App.scss';
import PageLoader from "../loader/PageLoader";
import RouteGeneratorFirstStep from "./components/RouteGeneratorFirstStep";

const googleMapsApiKey = "AIzaSyDXWu3KJklGFSMXKn5INNZVFLdCBfLTJKQ";

class GMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
      stepsToDestination: [],
      countriesCrossed: [],
      markers: [],
      usersWaypoints:[],
      usersWaypointsToString:[],
      markersList: [],

      startingCountry: null,
      avgTimeArrival: null,
      distanceToDestination: null,
      markerPosition: null,

      mapLoading: false,
      pageLoading: false,
      resetMap: true
    }
  }

  getRouteData(data) {
    this.state.usersWaypoints.push({latitude: data.latLng.lat(), longitude: data.latLng.lng()});
    this.state.usersWaypointsToString.push(String(data.latLng.lat() + ',' + data.latLng.lng()));

    this.setState({
      markerPosition: {lat: data.latLng.lat(), lng: data.latLng.lng()},
    }, () => {
      this.setState({
        markersList: [...this.state.markersList, this.state.markerPosition]
      }, () => {
        console.log(this.state.markersList)
      });
    });
  }

  async generateRoute() {
    var waypoints = '&waypoints=';
    if(this.state.usersWaypointsToString.length > 2) {
      for(var i = 1; i < this.state.usersWaypointsToString.length - 1; i++) {
        waypoints = waypoints + 'via:' + this.state.usersWaypointsToString[i] + '|';
      }
    }

    try {
      const myProxy = 'https://young-eyrie-53521.herokuapp.com/';
      const myReq = 'https://maps.googleapis.com/maps/api/directions/json?origin='+ this.state.usersWaypointsToString[0] + waypoints +'&destination='+ this.state.usersWaypointsToString[this.state.usersWaypointsToString.length - 1] +'&key=AIzaSyDXWu3KJklGFSMXKn5INNZVFLdCBfLTJKQ'
      
      let res = await fetch(myProxy + myReq, {
          method: 'get',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
      });

      let result = await res.json();

      this.setState({
        stepsToDestination: result.routes[0].legs[0].steps,
        distanceToDestination: result.routes[0].legs[0].distance.text,
        avgTimeArrival: result.routes[0].legs[0].duration.text,
        markers: this.state.usersWaypoints,
      });

    } catch (e) {
        console.log(e);
    }
  }

  resetRoute() {
    console.log('ASDASDA');
    this.setState({
      resetMap: false,
    });
  }

  render() {

    const {
      distanceToDestination, 
      avgTimeArrival, 
      startingCountry, 
      stepsToDestination, 
      countriesCrossed,
      markers
    } = this.state;

    stepsToDestination.map((val, idx) => {
      if(val.html_instructions.includes('Wjeżdżasz')) {
        var cutString = val.html_instructions.split('Wjeżdżasz do: ');
        var countryString = String(cutString[1]).split('</div>');
        countriesCrossed[idx] = <span>{countryString[0]}</span>
      }
    }) 

    return(
      <div className={'map-div'}>
        
        {this.props.pageLoader ? <PageLoader /> : null}

        <div className={'map-menu'}>

          <div className={'title-generator'}>
            <h1>
              <i className="far fa-location-arrow"></i>Zaplanuj trasę z TipTrip
            </h1>
          </div>

          <div className={'settings-map-generate'}>
            <RouteGeneratorFirstStep 
              generateRoute = {() => this.generateRoute()}
              resetRoute = {this.resetRoute.bind(this)}
            />
          </div>

        </div>
        
        <Map
          googleMapURL={"https://maps.googleapis.com/maps/api/js?key=" + googleMapsApiKey + "&libraries=geometry,drawing,places"}
          // markerPosition={this.state.markerPosition}
          markers={markers}
          containerElement={<div className={'map-container-element'}></div>}
          loadingElement={<div className={'map-loading-element'} />}
          mapElement={<div className={'map-map-element'} />}
          defaultCenter={{ lat: 52.236493627580906, lng: 19.688148984375 }}
          defaultZoom={7}
          onMapClick={e => this.getRouteData(e)}
          markersList = {this.state.markersList}
          resetMap = {this.state.resetMap}
        />

        {/* <button onClick={() => this.generateRoute()}>wyznacz trase</button>

        <p>{distanceToDestination ? distanceToDestination : 'Dystans'}</p>
        <p>{avgTimeArrival ? avgTimeArrival : 'Czas do przyjazdu'}</p>
        {countriesCrossed.length > 0 ? countriesCrossed : String(this.props.test)} */}
      
      </div>
    );
  }
};
  
export default GMap;