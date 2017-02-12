/**
 * Created by kare2436 on 2/10/17.
 */
import React, {Component} from 'react'


class Button extends Component {

    constructor (props) {
        super(props);
        this.state = {appData: props.appData}
        this.doAlert = this.doAlert.bind(this);
    }

    doAlert (event) {
        event.preventDefault();
        fetch("http://jsonplaceholder.typicode.com/posts")
            .then((response) => response.json())
            .then((json) => this.setState({appData: json}))
            .catch((error) => console.log(error))
    }

    render () {
        return <button onClick={this.doAlert}
                       className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">{this.props.text}</button>
    }
}

export default Button