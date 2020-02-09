// DEPENDENCIES
import React, { useContext } from 'react';
import { Route } from 'react-router-dom';

//CONTEXT
import { AppContext } from '../context';

//constantes
import { auth_token } from '../constants';


export const PrivateRoute = ({ routeKey, component: Component, ...rest }) => {

    //Descomponer el contexto y obtener las propiedades
    const { app_state: {logged_in}, app_logout } = useContext(AppContext);

    if( !logged_in || ( auth_token === null || auth_token === undefined || auth_token === '' ) ){
        //si no esta autenticado
        app_logout();
    }

    return (
        <Route
            {...rest}
            render={props => {
                if ( logged_in && ( auth_token !== null && auth_token !== undefined && auth_token !== '' ) ) {
                    return <Component {...props} />
                }
            }}
        />
    );
};
