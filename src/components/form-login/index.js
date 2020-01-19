// DEPENDENCIES
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import M from 'materialize-css';
import CryptoJS from 'crypto-js';

// STYLES
import './login.scss';

//constantes
import { api_url, endpoints } from '../../constants';

export const FormLogin = () =>{
    const [login, setLogin] = useState({
        username: '',
        password: ''
    });
    const [disabled, setDisabled] = useState(false);

    useEffect(()=>{
        M.updateTextFields();
    }, []);

    const handleChange = event =>{
        setLogin({
            ...login,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = event =>{
        event.preventDefault();
        const valid = handleValidate();
        if(valid){
            handleLogin();
        }
    }

    const handleValidate = () =>{
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login.username);
        const pass_validate = /^[0-9a-zA-Z]+$/.test(login.password);

        if (login.username === '' || login.password === '') {
            M.Toast.dismissAll();
            M.toast({ html: 'Completa todos los campos', classes: 'error'});
            return false;
        }
        if (login.username === '' || !emailValid) {
            M.Toast.dismissAll();
            M.toast({ html: 'Correo no válido', classes: 'error'});
            return false;
        }
        if (!pass_validate) {
            M.Toast.dismissAll();
            M.toast({ html: 'Contraseña no válida', classes: 'error'});
            return false;
        }
        return true;
    }

    const handleLogin = () =>{
        setDisabled(true);
        const hash     = CryptoJS.SHA256(login.password);
        const password = hash.toString(CryptoJS.enc.Hex);

        const DATA = {
            username: login.username,
            password
        };

        axios
            .post(`${api_url}${endpoints.login}`, DATA)
            .then(res => {
                //Redirigir al dashboard
                localStorage.setItem('user_tk', res.data.data.token);
                window.location.href = '/dashboard';
            })
            .catch(error => {
                console.log(error, error.response);
                M.toast({ html: 'Ocurrio un error', classes: 'error' });
                setDisabled(false);
            });
    }

    const { username, password } = login;

    return (
        <form id="form-login" className="row" autoComplete="off" onSubmit={handleSubmit} noValidate>
            <div className="input-field col-12">
                <input id="username" name="username" type="email" 
                       value={username} onChange={handleChange} />
                <label htmlFor="username" maxLength="100">Email</label>
            </div>
            <div className="input-field col-12">
                <input id="password" name="password" type="password" pattern="[0-9a-zA-Z]"
                       value={password} onChange={handleChange} />
                <label htmlFor="password" maxLength="20">Contraseña</label>
            </div>
            <div className="input-field col-12 text-center">
                <button className="btn waves-effect" type="submit" disabled={disabled}>
                    {disabled ? 'Ingresando...': 'Ingresar'}
                </button>
            </div>
        </form>
    );
}