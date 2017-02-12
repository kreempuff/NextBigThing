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
        this.state = { appData: [], displayedData: [], displayNumber: 55 }
    }

    getData () {
        fetch("data.json")
            .then((response) => response.json())
            .then((json) => {
                this.setState({ appData: json, displayedData: json.slice(0, this.state.displayNumber) })
            })
            .catch((error) => console.log(error))
    }

    componentDidMount () {
        this.getData()
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
                    Click to sort by title
                </div>
                <div className="mdl-tooltip mdl-tooltip--right" data-mdl-for="bodyHeader">
                    Click to sort by body
                </div>
                <div className="mdl-tooltip mdl-tooltip--right" data-mdl-for="idHeader">
                    Click to sort by id
                </div>
                <table className="Table mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                    <thead>
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
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.displayedData
                        .map((data, index) => {
                            return <TableRow key={index.toString()} _data={data}/>
                        })}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colSpan="3">Displaying: {this.state.displayNumber} items</td>
                    </tr>
                    </tfoot>
                </table>
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
                <td className="TableData mdl-data-table__cell">{this.props._data.id}</td>
            </tr>
        )
    }
}

export default Table