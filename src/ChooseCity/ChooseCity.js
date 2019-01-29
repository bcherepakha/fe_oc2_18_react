import React from 'react';

import {locationiqToken} from '../config';

import './ChooseCity.css';

export default class ChooseCity extends React.Component {
    state = {
        tempCity: '',
        searching: false,
        serchResults: null
    }

    changeInput = e => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    }

    chooseElement = searchResult => () => {
        console.log({searchResult});
        this.setState({
            tempCity: '',
            serchResults: null
        }, () => {
            this.props.addCity && this.props.addCity(searchResult);
        });
    }

    addCityHandler = e => {
        e.preventDefault();

        const {tempCity, searching} = this.state;

        if (!searching) {
            this.setState({
                searching: true
            }, () => {
                fetch(`https://us1.locationiq.com/v1/search.php?key=${locationiqToken}&format=json&city=${encodeURIComponent(tempCity)}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);

                        this.setState({
                            searching: false,
                            serchResults: data
                        });
                    })
                    .catch(console.error)
            });
        }
    }

    render() {
        const {tempCity, searching, serchResults} = this.state;

        return <form className='choose-city' onSubmit={this.addCityHandler}>
            <label>
                <h3 className='choose-city__title'>Выберите часы для города</h3>
                <div className='choose-city__row'>
                    <input
                        disabled={searching}
                        type='text'
                        name='tempCity'
                        value={tempCity}
                        onChange={this.changeInput}/>
                </div>
            </label>
            <div className='choose-city__search-results'>
                {serchResults && !searching
                    && serchResults.map(searchResult => <div
                        key={searchResult.place_id}
                        onClick={this.chooseElement(searchResult)}
                        className='choose-city__search-result'>
                        {searchResult.display_name}
                    </div>)}
            </div>
            <button type='submit'>Добавить</button>
        </form>;
    }
}
