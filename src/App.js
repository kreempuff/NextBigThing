import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './Button/Button'
import Table from './Table/Table'

class App extends Component {

    constructor (props) {
        super(props)
        this.state = {appData: []}
    }
    render () {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Just a Table</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <Button appData={this.state.appData} text="Get Data"/>
                <Table appData={this.state.appData}/>
            </div>
        );
    }
}

export default App;
