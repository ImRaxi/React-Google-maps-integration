import React, { Component } from "react";
import '../../../assets/css/all.min.css';
import '../../../App.scss';

class RouteGeneratorFirstStep extends Component {

  constructor(props) {
    super(props);

    this.state = {
        
    }
  }

  render() {

    return(
        <div className={'route-generator-first-step'} >
            <p className={'step-1'}>
                Zaplanowanie trasy rozpocznij od zaznaczenia punktu początkowego twojej podróży
            </p>
            <p className={'localize-or'}>
                LUB
            </p>

            <div className={'localize-me-btn'}>
                <i className="far fa-location"></i><p>Zlokalizuj mnie!</p>
            </div>

            <p className={'step-2'}>
                a następnie zaznaczając kolejne pozycje na mapie wyznacz 
                swoją wymarzoną trasę wakacyjną a my zajmiemy się resztą.
            </p>

            <div className={'map-settings-buttons'}>
                <div className={'map-undo'}>
                    <i className="fas fa-undo-alt"></i>
                </div>
                <div className={'map-reset'} onClick={() => this.props.resetRoute()}>
                    <i className="far fa-trash-alt"></i><p>RESETUJ TRASĘ</p>
                </div>
            </div>

            <div className={'map-generate-map-button'} onClick={() => this.props.generateRoute()}>
                <i className="fas fa-route"></i><p>WYZNACZ TRASĘ</p>
            </div>
        </div>
      );
    }
};
  
export default RouteGeneratorFirstStep;