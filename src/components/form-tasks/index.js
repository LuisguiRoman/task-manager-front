// DEPENDENCIES
import React, { useState } from 'react';
import axios from 'axios';
import M from 'materialize-css';

//constantes
import { api_url, endpoints, auth_token } from '../../constants';

// STYLES
import './form-task.scss';

export const FormTasks = props =>{
    //Estado del componente
    const [create, setCreate] = useState({
        name: '',
        priority: '',
        date: ''
    });
    const [disabled, setDisabled] = useState(false);

    const handleChange = event =>{
        setCreate({
            ...create,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = event =>{
        event.preventDefault();
        const valid = handleValidate();
        if(valid){
            createTask();
        }
    }

    const handleValidate = () =>{
        if(create.name === '' || create.priority === '' || create.date === ''){
            M.Toast.dismissAll();
            M.toast({ html: 'Completa todos los campos', classes: 'error'});
            return false;
        }
        return true;
    }

    const createTask = () =>{
        setDisabled(true);

        const DATA = {
            task_name: create.name,
            priority: parseInt(create.priority),
            expiration_date: new Date(create.date)
        };

        axios
            .post(`${api_url}${endpoints.tasks}/create`, DATA, {
                headers: { 'Authorization': `Bearer ${auth_token}` }
            })
            .then(res => {
                console.log(res.data.data);
                props.addTask(res.data.data);

                M.toast({ html: 'Tarea creada', classes: 'success' });
                setCreate({name: '', priority: '', date: ''});
                setDisabled(false);
            })
            .catch(error => {
                console.log(error, error.response);
                M.toast({ html: 'Ocurrio un error', classes: 'error' });
                setDisabled(false);
            });
    }

    const { name, priority, date } = create;

    return (
        <div id="form-tasks" className="modal">
            <div className="modal-content">
                <div className="container-form-task">
                    <h3 className="text-center">Crea una nueva tarea</h3>
                    <form autoComplete="off" className="row" onSubmit={handleSubmit} noValidate>
                        <div className="input-field col-12">
                            <input id="name" name="name" type="text" value={name} onChange={handleChange} />
                            <label htmlFor="name">Nombre</label>
                        </div>
                        <div className="input-field col-12">
                            <select className="browser-default" name="priority" value={priority} onChange={handleChange}>
                                <option value="" disabled>Prioridad</option>
                                <option value="1">Prioridad alta</option>
                                <option value="2">Prioridad media</option>
                                <option value="3">Prioridad baja</option>
                            </select>
                        </div>
                        <div className="input-field col-12">
                            <input type="date" id="date" name="date" value={date} onChange={handleChange} />
                            <label htmlFor="date">Fecha de vencimiento: </label>
                        </div>
                        <div className="input-field col-12 text-center">
                            <button className="btn waves-effect" type="submit" disabled={disabled}>
                                {disabled ? 'Creando...': 'Crear tarea'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}