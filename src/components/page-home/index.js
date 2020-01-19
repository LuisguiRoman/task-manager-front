// DEPENDENCIES
import React, { useState } from 'react';

//COMPONENTS
import { FormRegister } from '../form-register';

// STYLES
import './home.scss';

export const Home = () =>{
    const [showLogin, setLogin] = useState(true);

    return (
        <div id="page-home" className="container">
            <div className="main-home">
                <h4 className="text-center">Bienvenido a tu administrador de tareas</h4>

                <div className="row m-bottom-30">
                    <div className="input-field col-6">
                        <button className={`waves-effect btn ${showLogin ? 'active':''}`} type="button">Ingresar</button>
                    </div>
                    <div className="input-field col-6">
                        <button className={`waves-effect btn ${showLogin ? '':'active'}`} type="button">Registrarse</button>
                    </div>
                </div>

                <FormRegister />
            </div>
        </div>
    );
}