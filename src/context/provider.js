// DEPENDENCIES
import React, { Component } from 'react';
import axios from 'axios';

//CONTEXT
import { AppContext } from './context';

//constantes
import { api_url, auth_token, endpoints } from '../constants';


//Crear y exportar el provider de la app
export class AppProvider extends Component {
    constructor() {
        super();
        this.state = {
            logged_in: false,
            done: false,
            name: '',
        };
    }
    
    componentDidMount(){
        this.authVerification();
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error de app:', error, errorInfo);
    }

    authVerification = () =>{
        if( auth_token !== null && auth_token !== undefined  ){
            axios.post(`${api_url}${endpoints.session}`, {}, {
                headers: { 'Authorization': `Bearer ${auth_token}` }
            })
            .then(res => {
                //console.log('Sesión: ', res.data);
                this.setAppState(res.data.data);
            })
            .catch(error => {
                console.log(error, error.response);
            });
        }else{
            this.setState({done: true});
        }
    }

    setAppState = data =>{
        this.setState({
            done: true,
            logged_in: true,
            name: data.user.name
        });
    }

    newAppState = (name, value, callBack)=>{
        this.setState({[name]: value}, ()=>{
            if(callBack !== undefined) callBack();
        });
    }

    handleLogout = () =>{
        localStorage.clear();//limpiar el local storage
        window.location.href = '/';//redireccionar al inicio
    }

    render() {
        const PROVIDER = {
            app_state: this.state,
            app_logout: this.handleLogout,
            app_new_state: this.newAppState
        }
        
        return (
            <AppContext.Provider value={PROVIDER}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}