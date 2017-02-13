import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe('App', () => {
    // Sanity check for a new React dev :tongue-out:
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
    });
});
