import React, { Component } from "react";
import GMap from "./GMap";
import '../../assets/css/all.min.css';

class Front extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mapIsLoading: false,
    }
  }

  render() {

    return(
      <div className={'frontpage'}>
        <div className={'map-zone'}>

          <GMap
            pageLoader = {this.state.mapIsLoading}
          />

        </div>
      </div>
      );
  }
};
  
export default Front;