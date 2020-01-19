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
    const [register, setRegister] = useState({
        name: '',
        user_name: '',
        password: '',
        password_validation: ''
    });
    const [disabled, setDisabled] = useState(false);

    useEffect(()=>{
        M.updateTextFields();
    }, []);

    const handleChange = event =>{
        setRegister({
            ...register,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = event =>{
        event.preventDefault();
        const valid = handleValidate();
        if(valid){
            handleRegister();
        }
    }

    const handleValidate = () =>{
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(register.user_name);
        const pass_validate = /^[0-9a-zA-Z]+$/.test(register.password);

        if (register.name === '' || register.user_name === '' || register.password === '' || register.password_validation === '') {
            M.Toast.dismissAll();
            M.toast({ html: 'Completa todos los campos', classes: 'error'});
            return false;
        }
        if (register.user_name === '' || !emailValid) {
            M.Toast.dismissAll();
            M.toast({ html: 'Correo no válido', classes: 'error'});
            return false;
        }
        if (register.password !== register.password_validation) {
            M.Toast.dismissAll();
            M.toast({ html: 'Las contraseñas no coinciden', classes: 'error'});
            return false;
        }
        if (!pass_validate || ( register.password.length > 20 || register.password.length < 8 )) {
            M.Toast.dismissAll();
            M.toast({ html: 'No debe contener caracteres especiales, Mínimo 8 y máximo 20', classes: 'error'});
            return false;
        }
        return true;
    }

    const handleRegister = () =>{
        setDisabled(true);
        const hash     = CryptoJS.SHA256(register.password);
        const password = hash.toString(CryptoJS.enc.Hex);

        const DATA = {
            name: register.name,
            username: register.user_name,
            password
        };

        axios
            .post(`${api_url}${endpoints.user}/create`, DATA, {
                headers: { 'from-url': `${window.location.origin}/confirmacion` }
            })
            .then(res => {
                console.log(res.data);
                setDisabled(false);
                handleSuccess();
            })
            .catch(error => {
                console.log(error, error.response);
                M.toast({ html: 'Ocurrio un error', classes: 'error' });
                setDisabled(false);
            });
    }

    const handleSuccess = () =>{
        M.toast({ html: 'Usuario registrado con éxito', classes: 'success' });
        //Reiniciar campos de registro
        setRegister({username: '', password: ''});
    }

    const { username, password} = register;

    return (
        <form id="form-register" className="row" autoComplete="off" onSubmit={handleSubmit} noValidate>
            <div className="input-field col-12">
                <input id="user_name" name="user_name" type="email" 
                       value={username} onChange={handleChange} />
                <label htmlFor="user_name" maxLength="100">Email</label>
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