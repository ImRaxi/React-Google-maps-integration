import React, { Component } from "react";
import '../../assets/css/all.min.css';

class DevTools extends Component {

    constructor(props) {
        super(props);

        this.state = {
            countryList: [],
            countryId: 0,
            highWays: [],        
            vignettes: [],
            tunels: [],
        }
    }

    componentDidMount() {
        this.getCountries();
    }

    async getCountries() {
        try {
            const myReq = 'http://tiptrip.pl/backend/index.php/wp-json/wp/v2/country';
            
            let res = await fetch(myReq, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });

            let result = await res.json();

            this.setState({
                countryList: result,
            }, () => {
                console.log(this.state.countryList);
            });

        } catch (e) {
            console.log(e);
        }
    }

    setNewId(val) {
        this.setState({
            countryId: val
        }, () => {
            this.getCountries();
            this.getHighWays();
            this.getVignettes();
            this.getTunels();
        })
    }

    async getHighWays() {
        try {
            const myReq = 'http://tiptrip.pl/backend/index.php/wp-json/wp/v2/autostrady';
            
            let res = await fetch(myReq, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });

            let result = await res.json();

            this.setState({
                highWays: result,
            });

        } catch (e) {
            console.log(e);
        }
    }

    async getVignettes() {
        try {
            const myReq = 'http://tiptrip.pl/backend/index.php/wp-json/wp/v2/winiety';
            
            let res = await fetch(myReq, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });

            let result = await res.json();

            this.setState({
                vignettes: result,
            });

        } catch (e) {
            console.log(e);
        }
    }

    async getTunels() {
        try {
            const myReq = 'http://tiptrip.pl/backend/index.php/wp-json/wp/v2/tunele';
            
            let res = await fetch(myReq, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });

            let result = await res.json();

            this.setState({
                tunels: result,
            });

        } catch (e) {
            console.log(e);
        }
    }

    render() {

        const listCountries = this.state.countryList.map((val, idx) =>
            <option key={idx} value={val.id}>{val.title.rendered}</option>
        );

        const listHighways = this.state.highWays.map((val, idx) =>
            val.acf.panstwo.ID === Number(this.state.countryId) ? 
                <ul key={idx}>
                    
                    <li><b>{'Nazwa: '}</b> {val.acf.nazwa}</li>
                    <li><b>{'Miejsce na mapie: '}</b> {val.acf.miejsce_na_mapie}</li>
                    <li><b>{'Metoda płatności: '}</b> {val.acf.pieniadze_czy_winieta}</li>
                    <li><b>{val.acf.pieniadze_czy_winieta === 'winieta' ? 'Winieta: ': 'Płatność: '}</b>{val.acf.pieniadze_czy_winieta === 'winieta' ? val.acf.winieta.post_title : val.acf.cena + ' ' + val.acf.waluta.post_title}</li>
                    
                </ul>
            : ''
        );

        const vignettes = this.state.vignettes.map((val, idx) =>
            val.acf.panstwo === Number(this.state.countryId) ? 
                <ul key={idx}>
                    <li><b>{'Nazwa: '}</b> {val.acf.nazwa}</li>
                    <li><b>{'Okres: '}</b> {val.acf.okres}</li>
                    <li><b>{'Rodzaj: '}</b> {val.acf.rodzaj.post_title}</li>
                    <li><b>{'Cena: '}</b> {val.acf.cena + ' ' + val.acf.waluta.post_title}</li>
                </ul>
            : ''
        );

        const tunels = this.state.tunels.map((val, idx) =>
            val.acf.panstwo.ID === Number(this.state.countryId) ? 
                <ul key={idx}>
                    <li><b>{'Nazwa: '}</b> {val.acf.nazwa}</li>
                    <li><b>{'Miejsce na mapie: '}</b> {val.acf.miejsce_na_mapie}</li>
                    <li><b>{val.acf.pieniadze_czy_winieta === 'winieta' ? 'Winieta: ': 'Płatność: '}</b>{val.acf.pieniadze_czy_winieta === 'winieta' ? val.acf.winieta.post_title : val.acf.cena + ' ' + val.acf.waluta.post_title}</li>
                </ul>
            : ''
        );

        const restrictions = this.state.countryList.map((val, idx) =>
            val.id === Number(this.state.countryId) ? 
            <div>
                {'OSTATNIA AKTUALIZACJA: '}  {val.modified}
                <div dangerouslySetInnerHTML={{ __html: val.acf.obostrzenia_covid_19 }} />

            </div>
            : ''
        );

        const documents = this.state.countryList.map((val, idx) =>
            val.id === Number(this.state.countryId) ? 
            <ul>
                {
                    val.acf.dokumenty.map((val, idx) => {
                        return <li key={idx}>{val}</li>
                    })
                }
            </ul>
            : ''
        );

        const carElements = this.state.countryList.map((val, idx) =>
            val.id === Number(this.state.countryId) ? 
            <ul>
                {
                    val.acf.wyposazenie_auta.map((val, idx) => {
                        return <li key={idx}>{val}</li>
                    })
                }
            </ul>
            : ''
        );

        return(
            <div className={'frontpage'}>
                <select
                    onChange = {(e) => this.setNewId(e.target.value)}
                >
                    {listCountries}
                </select>

            <div className={"sorter"}>
                <div className={'sort sort1'}>
                    <h1>AUTOSTRADY</h1>
                    {listHighways}
                </div>
                <div className={'sort sort2'}>
                    <h1>Winiety</h1>
                    {vignettes}
                </div>
                <div className={'sort sort3'}>
                    <h1>Tunele</h1>
                    {tunels}
                </div>
                <div className={'sort sort4'}>
                    <h1>Obostrzenia</h1>
                    {restrictions}
                </div>
                <div className={'sort sort4'}>
                    <h1>Dokumenty</h1>
                    {documents}
                </div>
                <div className={'sort sort4'}>
                    <h1>Wyposażenie auta</h1>
                    {carElements}
                </div>
            </div>

            </div>
        );
    }
};
  
export default DevTools;