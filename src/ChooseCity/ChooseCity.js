import React from 'react';

export default class ChooseCity extends React.Component {
    state = {
        tempCity: ''
    }

    changeInput = e => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    }

    addCityHandler = e => {
        e.preventDefault();

        const {tempCity} = this.state;

        this.setState({
            tempCity: ''
        }, () => {
            this.props.addCity && this.props.addCity(tempCity);
        });
    }

    render() {
        const {tempCity} = this.state;

        return <form className='choose-city' onSubmit={this.addCityHandler}>
            <label>
                <h3 className='choose-city__title'>Выберите часы для города</h3>
                <div className='choose-city__row'>
                    <input
                        type='text'
                        name='tempCity'
                        value={tempCity}
                        onChange={this.changeInput}/>
                </div>
            </label>
            <button type='submit'>Добавить</button>
        </form>;
    }
}
