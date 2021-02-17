import React, { Component } from "react";
import '../../App.scss';
import logo from '../../assets/img/loader.svg';

class PageLoader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    render() {

        return(
            <div className={'page-loader'}>
                <img className={'loader-img'} src={logo} />
            </div>
        );

    }
};

export default PageLoader;