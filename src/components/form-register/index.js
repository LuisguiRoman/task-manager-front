// DEPENDENCIES
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import M from 'materialize-css';

// STYLES
import './register.scss';

//constantes
import { api_url, endpoints } from '../../constants';

export const FormRegister = () =>{
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

    const {name, user_name, password, password_validation} = register;

    return (
        <form id="form-register" className="row" autoComplete="off" onSubmit={handleSubmit} noValidate>
            <div className="input-field col-12">
                <input id="name" name="name" type="text" 
                       value={name} onChange={handleChange} />
                <label htmlFor="name" maxlength="50">Nombre</label>
            </div>
            <div className="input-field col-12">
                <input id="user_name" name="user_name" type="email" 
                       value={user_name} onChange={handleChange} />
                <label htmlFor="user_name" maxlength="100">Email</label>
            </div>
            <div className="input-field col-12">
                <input id="password" name="password" type="password" pattern="[0-9a-zA-Z]"
                       value={password} onChange={handleChange} />
                <label htmlFor="password" maxlength="20">Contraseña</label>
            </div>
            <div className="input-field col-12">
                <input id="password_validation" name="password_validation" type="password" pattern="[0-9a-zA-Z]"
                       value={password_validation} onChange={handleChange} />
                <label htmlFor="password_validation" maxlength="20">Confirmación</label>
            </div>
            <div className="input-field col-12 text-center">
                <button className="btn waves-effect" type="submit" disabled={disabled}>
                    {disabled ? 'Registrando...': 'Registrarme'}
                </button>
            </div>
        </form>
    );
}