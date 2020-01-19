// DEPENDENCIES
import React, { useEffect, useState } from 'react';

//COMPONENTS
import { FormRegister } from '../form-register';
import { FormLogin } from '../form-login';

//CONSTANTS 
import { auth_token } from '../../constants';

// STYLES
import './home.scss';

export const Home = () =>{
    const [showLogin, setLogin] = useState(true);

    useEffect(()=>{
        if( auth_token !== null && auth_token !== undefined && auth_token !== '' ){
            window.location.href = '/dashboard';
        }
    }, []);

    const handlelogin = () =>{
        setLogin(!showLogin);
    }

    return (
        <div id="page-home" className="container">
            <div className="main-home">
                <h4 className="text-center">Bienvenido a tu administrador de tareas</h4>

                <div className="row no-gutters m-bottom-30">
                    <div className="input-field col-6">
                        <button className={`waves-effect btn ${showLogin ? 'active':''}`} type="button"
                                onClick={handlelogin}>Ingresar</button>
                    </div>
                    <div className="input-field col-6">
                        <button className={`waves-effect btn ${showLogin ? '':'active'}`} type="button"
                                onClick={handlelogin}>Registrarse</button>
                    </div>
                </div>

                {showLogin ? (
                    <FormLogin />
                ):(
                    <FormRegister login={handlelogin} />
                )}
    
            </div>
        </div>
    );
}