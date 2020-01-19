// DEPENDENCIES
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//ROUTES
import { Routes } from './routes';

// STYLES
import './styles/main.scss';

const App = ()=>{
    return (
        <div id="primary">
            <Router>
                <Route render={({ location }) => <Routes route={location} />} />
            </Router>
        </div>
    );
}

export default App;
