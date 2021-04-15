import React, { Component } from "react";
import GMap from "./GMap";
import '../../assets/css/all.min.css';
import video from '../../assets/img/main-video.mp4';
import logo from '../../assets/img/tiptriplogo.png';
import { Link } from "react-router-dom";

class Front extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mapIsLoading: false,
      countries: [],
      singleCountry: [],
      selectedid: null,
    }
  }

  componentDidMount() {
    this.getCountries();
    // this.getWpData();
  }

  async getCountries() {
    try {
      const myReq = 'http://tiptrip.pl/backend/index.php/wp-json/wp/v2/country/?per_page=100';
      
      let res = await fetch(myReq, {
          method: 'get',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
      });

      let result = await res.json();

      console.log('ELO');
      console.log(result);

      this.setState({
        countries: result,
      }, () => {
        console.log(this.state.countries)
      });

    } catch (e) {
        console.log(e);
    }
  }

  async getSingleCountry(val) {
  
    console.log(val)

      try {
        const myReq = 'http://ttbackend.localhost/wp-json/acf/v3/country/?per_page=100';

        
        let res = await fetch(myReq, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
  
        let result = await res.json();

        console.log('ELO2');
        console.log(result);

  
        this.setState({
          singleCountry: result,
          selectedid: val
        }, () => {
          // console.log(this.state.countries)
        });
  
      } catch (e) {
          console.log(e);
      }
  }

  render() {

    const countryList = this.state.countries.map((val, idx) => {
      console.log(val)
      return <option key={idx} value={val.id}>{val.title.rendered}</option>
    })

    const singleCountry = this.state.singleCountry.find(e => e.id === Number(this.state.selectedid));

    console.log(this.state.selectedid);
    console.log(singleCountry);

    // const

    return(
      <div className={'frontpage'}>

        <div className={'map-zone'}>

          <GMap
            pageLoader = {this.state.mapIsLoading}
          />

        </div>

        
        KRAJ:
          <select
            onChange={(val) => this.getSingleCountry(val.target.value)}
          >
            {countryList}
          </select>

          
          <p>{singleCountry ? singleCountry.acf.obostrzenia.obostrzenie_1 : ''}</p>
          

      </div>
      );
  }
};
  
export default Front;