/**
 * Created by kare2436 on 2/10/17.
 */
//javascript imports
import React, {Component} from 'react'
import sort from '../utils/sortData'

//css imports
import './Table.css';


class Table extends Component {

    constructor (props) {
        super(props);

        this.columnHeaderClickHandler = this.columnHeaderClickHandler.bind(this);
        this.displayNumberClickHandler = this.displayNumberClickHandler.bind(this);
        this.state = { appData: [], displayedData: [], displayNumber: 25}
    }

    getData () {
        fetch("data.json")
            .then((response) => response.json())
            .then((json) => {
                this.setState({ appData: json, displayedData: json.slice(0, this.state.displayNumber)})
            })
            .catch((error) => console.log(error))
    }

    componentDidMount () {
        this.getData()
    }


    displayNumberClickHandler(newDisplayNumber) {

        // Updating highlighted button
        this.refs[this.state.displayNumber.toString(10)].classList.remove('mdl-button--accent');
        this.refs[newDisplayNumber.toString(10)].classList.add('mdl-button--accent');

        this.setState({
            displayedData: this.state.appData.slice(0, newDisplayNumber),
            displayNumber: newDisplayNumber
        })
    }

    columnHeaderClickHandler (e) {
        e.preventDefault();
        let propertyToSortBy;
        switch (e.target.innerHTML) {
            case 'Title':
            default:
                propertyToSortBy = 'title';
                break;
            case 'Body':
                propertyToSortBy = 'body';
                break;
            case 'Id':
                propertyToSortBy = 'id';
                break;
            case 'User Id':
                propertyToSortBy = 'userId';
                break;
        }

        sort(this.state.appData, propertyToSortBy);
        this.setState({
            appData: this.state.appData,
            displayedData: this.state.appData.slice(0, this.state.displayNumber)
        });
    }

    render () {
        return (

            <div className="TableContainer">
                <div className="mdl-tooltip mdl-tooltip--right" data-mdl-for="titleHeader">
                    Click to sort by Title
                </div>
                <div className="mdl-tooltip mdl-tooltip--right" data-mdl-for="bodyHeader">
                    Click to sort by Body
                </div>
                <div className="mdl-tooltip mdl-tooltip--right" data-mdl-for="idHeader">
                    Click to sort by Id
                </div>
                <div className="mdl-tooltip mdl-tooltip--right" data-mdl-for="userIdHeader">
                    Click to sort by User Id
                </div>
                <table className="Table mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                    <thead>
                    <tr>
                        <td className="mdl-data-table__cell--non-numeric" colSpan="4">
                            <span>Displaying: {this.state.displayNumber} out of {this.state.appData.length} items</span>
                            <ul className="NumItemsList">
                                <li>
                                    <button
                                        ref="10"
                                        onClick={() => {this.displayNumberClickHandler(10)}}
                                        className="mdl-button mdl-js-button">
                                        10
                                    </button>
                                </li>
                                <li>
                                    <button
                                        ref="25"
                                        onClick={() => {this.displayNumberClickHandler(25)}}
                                        className="mdl-button--accent mdl-button mdl-js-button">
                                        25
                                    </button>
                                </li>
                                <li>
                                    <button
                                        ref="50"
                                        onClick={() => {this.displayNumberClickHandler(50)}}
                                        className="mdl-button mdl-js-button">
                                        50
                                    </button>
                                </li>
                                <li>
                                    <button
                                        ref={this.state.appData.length}
                                        onClick={() => {this.displayNumberClickHandler(this.state.appData.length)}}
                                        className="mdl-button mdl-js-button">
                                        All ({this.state.appData.length})
                                    </button>
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th onClick={this.columnHeaderClickHandler}
                            className="TableHeader mdl-data-table__cell--non-numeric">
                            <span id="titleHeader">Title</span>
                        </th>
                        <th onClick={this.columnHeaderClickHandler}
                            className="TableHeader mdl-data-table__cell--non-numeric">
                            <span id="bodyHeader">Body</span>
                        </th>
                        <th onClick={this.columnHeaderClickHandler}
                            className="TableHeader mdl-data-table__cell--non-numeric">
                            <span id="idHeader">Id</span>
                        </th>
                        <th onClick={this.columnHeaderClickHandler}
                            className="TableHeader mdl-data-table__cell--non-numeric">
                            <span id="userIdHeader">User Id</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.displayedData
                        .map((data, index) => {
                            return <TableRow key={index.toString()} _data={data}/>
                        })}
                    </tbody>
                </table>
                <button onClick={() => {document.body.scrollTop = 0}} className="mdl-button">Go to Top</button>
            </div>
        )
    }
}


class TableRow extends Component {

    render () {
        return (
            <tr>
                <td className="TableData mdl-data-table__cell--non-numeric">{this.props._data.title}</td>
                <td className="TableData mdl-data-table__cell--non-numeric">{this.props._data.body}</td>
                <td className="TableData mdl-data-table__cell--non-numeric">{this.props._data.id}</td>
                <td className="TableData mdl-data-table__cell--non-numeric">{this.props._data.userId}</td>
            </tr>
        )
    }
}

export default Table
export {TableRow}