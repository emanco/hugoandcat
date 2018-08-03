import React, { Component } from 'react';
import './scss/footer.css';
import Ionicon from 'react-ionicons';

class FooterView extends Component {
    render() {

        return (
            <div>
                <footer>
                    <small>© 2018 made with <Ionicon icon="md-heart" color="#333" /> by <a href="mailto:hello@emanuelemanco.com">Emanuele Manco</a> </small>
                </footer>
            </div>
        );
    }
}

export default FooterView;