// DEPENDENCIES
import React, { Fragment, useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//CONTEXT
import { AppContext } from './context';

//ROUTES
import { Routes } from './routes';

// STYLES
import './styles/main.scss';

const App = ()=>{
    const { app_state: {done} } = useContext(AppContext);

    return (
        <Fragment>
            {done && (
                <Router>
                    <Route render={({ location }) => <Routes route={location} />} />
                </Router>
            )}
        </Fragment>
    );
}

export default App;
