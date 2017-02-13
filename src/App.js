import React, {Component} from 'react';
//eslint-disable-next-line
import pizza from './pizza.svg'
import './App.css';
import Table from './Table/Table'

class App extends Component {

    render () {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={pizza} className="App-logo" alt="logo"/>
                    <h2>It's just a Table</h2>
                </div>
                <Table />
            </div>
        );
    }
}

export default App;
