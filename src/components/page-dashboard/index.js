// DEPENDENCIES
import React, { Fragment, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import M from 'materialize-css';
import { DragDropContext } from 'react-beautiful-dnd';

//CONTEXT
import { AppContext } from '../../context';

//constantes
import { api_url, endpoints, auth_token } from '../../constants';

//COMPONENTS
import { FormTasks } from '../form-tasks';

// STYLES
import './dashboad.scss';

export const Dashboard = () =>{
    //Descomponer el contexto y obtener las propiedades
    const { app_state: {name}, app_logout } = useContext(AppContext);
    
    //Estado inicial
    const [tasks, setTasks] = useState([]);

    useEffect(()=>{
        let elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
        getTasks();
    }, []);

    const getTasks = () =>{
        axios
            .post(`${api_url}${endpoints.tasks}`, {}, {
                headers: { 'Authorization': `Bearer ${auth_token}` }
            })
            .then(res => {
                //Redirigir al dashboard
                console.log(res.data.data.tasks);
                setTasks(res.data.data.tasks);
            })
            .catch(error => {
                console.log(error, error.response);
                //M.toast({ html: 'Ocurrio un error', classes: 'error' });
            });
    }

    const showModal = () =>{
        const elem = document.getElementById('form-tasks');
        let instance = M.Modal.getInstance(elem);
        instance.open();
    }

    const handleAddTask = new_task =>{
        const task_list = tasks;
        task_list.push(new_task);
        setTasks(task_list);
    }

    //obtener la primera palabra del string
    const first_name = name.replace(/ .*/,'');

    return (
        <Fragment>
            <header>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-7">
                            <h2>Hola {first_name}!</h2>
                        </div>
                        <div className="col-12 col-lg-5 text-right">
                            <button type="button" className="btn waves-effect" onClick={showModal}>Crear tarea</button>
                            <button type="button" className="btn waves-effect close-session" onClick={app_logout}>Cerrar sesión</button>
                        </div>
                    </div>
                </div>
            </header>

            <div id="page-dashboard" className="container">
            </div>

            <FormTasks addTask={handleAddTask} />

        </Fragment>
    );
}