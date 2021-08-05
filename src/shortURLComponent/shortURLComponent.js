import { navigate } from '@reach/router';
import axios from 'axios';
import React, { Component } from 'react';

class shortURLComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        axios.post('https://clickifybackend.herokuapp.com/getFullURL', { shortURL: this.props.shortURL })
            .then((response) => {
                if (response.data.done) {
                    axios.post('http://clickifybackend.herokuapp.com/addVisitToShortURL', { shortURL: this.props.shortURL })
                    navigate(response.data.fullURL);
                }
                else if (response.data.errorType === 'entityDoesNotExist') {
                    navigate('/404NotFound')
                }
            })
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default shortURLComponent;