import React, { Component } from "react";
import '../../assets/css/all.min.css';
import backgroundVideo from '../../assets/img/main-video.mp4';
import logo from '../../assets/img/tiptriplogo.png';

class FrontPage extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {

        return(
            <div className={'frontpage'}>
                <div className={'main-video-zone'}>
                    <video width="100%" muted autoPlay loop>
                        <source src={backgroundVideo} type="video/mp4" />
                        Your browser does not support HTML video.
                    </video>

                    <div className={'main-video-overlay'}>
                        <h1 className={'main-video-title'}>
                            <img src={logo} alt={'TipTrip logo'}/>
                        </h1>
                        <h2 className={'main-video-under-title'}>
                            <span className={'bold'}>Bezpiecznie, Przyjemnie, Spokojnie</span> <br />
                            Zaplanuj swoją podróż z nami tak aby nic Ci jej nie zepsuło.
                        </h2>
                        <div className={'main-video-arrow-down'}>
                            <a href="#main-offer"><i class="fal fa-angle-down"></i></a>
                        </div>
                    </div>
                </div>

                <div className="container-fluid main-offer-zone" id="main-offer">
                    <div className={"container main-offer-container"}>
                        <div className={'main-offer-square'}>
                            <i class="fas fa-people-carry"></i>
                            <h4 className={'main-offer-square-title'}>Zaplanuj trasę z TipTrip</h4>
                            <p className={'main-offer-square-description'}>
                                Nie trać czasu na czasochłonne szukanie 
                                informacji o atrakcjach i bezpieczeństwie.
                            </p>

                            <p>
                                Zrobimy to za Ciebie!
                            </p>

                            <button className={'main-offer-square-btn'}>
                                Dowiedz się więcej
                            </button>
                        </div>
                        <div className={'main-offer-square'}>
                            <i class="fas fa-route"></i>
                            <h4 className={'main-offer-square-title'}>Wyznacz swoją trasę</h4>
                            <p className={'main-offer-square-description'}>
                                Sprawdź jakie niespodzianki czekają na Ciebie na Twojej drodze.
                            </p>
                            <button className={'main-offer-square-btn'}>
                                Wyznacz trasę
                            </button>
                        </div>
                        <div className={'main-offer-square'}>
                            <i class="fas fa-exclamation-circle"></i>
                            <h4 className={'main-offer-square-title'}>Obostrzenia i wymagania</h4>
                            <p className={'main-offer-square-description'}>
                                Bądź na bieżąco, poznaj aktualne obostrzenia i wymagania w całej Europie.
                            </p>
                            <button className={'main-offer-square-btn'}>
                                Zobacz więcej
                            </button>
                        </div>
                        <div className={'main-offer-square'}>
                            <i class="fas fa-hand-holding-usd"></i>
                            <h4 className={'main-offer-square-title'}>Płatności na trasie</h4>
                            <p className={'main-offer-square-description'}>
                                Wybierasz się w podróż? Sprawdź naszą bazę 
                                płatnych odcinków na twojej drodze.
                            </p>
                            <button className={'main-offer-square-btn'}>
                                Zobacz więcej
                            </button>
                        </div>
                        <div className={'main-offer-square'}>
                            <i class="fas fa-shield-alt"></i>
                            <h4 className={'main-offer-square-title'}>Bezpieczeństwo</h4>
                            <p className={'main-offer-square-description'}>
                                Zapewnij sobie bezpieczną podróż z 
                                dzięki naszej wiedzy i doświadczeniu.
                            </p>
                            <button className={'main-offer-square-btn'}>
                                Zobacz więcej
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
  
export default FrontPage;