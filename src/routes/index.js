// DEPENDENCIES
import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

//routes types
import { PrivateRoute } from './private-route';
import { PublicRoute } from './public-route';

// PAGES
import Home from '../components/page-home';
import Dashboard from '../components/page-dashboard';

export const Routes = ({ route }) =>{

    useEffect(()=>{
        let body = document.getElementById('page');
        console.log(body);
        body.className = '';
        if(route.pathname.substr(1) !== ''){
            body.classList.add(route.pathname.substr(1));
        }else{
            body.classList.add('home-page');
        }
    });

    return (
        <Switch location={route}>
            <PublicRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <Route render={() => <Redirect to="/" />} />
        </Switch>
    );
}