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
        super(props)

        this.columnHeaderClickHandler = this.columnHeaderClickHandler.bind(this)
        this.state = { appData: [], displayedData: [], displayNumber: 100 }
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

    columnHeaderClickHandler(e) {
        e.preventDefault();
        switch (e.target.innerHTML) {
            case 'Title':
                const sortedData = sort(this.state.appData, 'title');
                this.setState({
                    appData: sortedData,
                    displayedData: sortedData.slice(0, this.state.displayNumber)
                });
                break;
            case 'Body':
                break;
            case 'Id':
                break;
            default:
                break;
        }
    }

    render () {
        return (
            <table className="Table mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                <thead>
                <tr>
                    <th onClick={this.columnHeaderClickHandler} className="mdl-data-table__cell--non-numeric">Title</th>
                    <th onClick={this.columnHeaderClickHandler}>Body</th>
                    <th onClick={this.columnHeaderClickHandler}>Id</th>
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
                    <td>Displaying: {this.state.displayNumber} items</td>
                </tr>
                </tfoot>
            </table>
        )
    }
}


class TableRow extends Component {

    render () {
        return (
            <tr>
                <td className="TableData mdl-data-table__cell--non-numeric">{this.props._data.title}</td>
                <td className="TableData mdl-data-table__cell--non-numeric">{this.props._data.body}</td>
                <td>{this.props._data.id}</td>
            </tr>
        )
    }
}

export default Table