// DEPENDENCIES
import React, { Fragment, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import M from 'materialize-css';

//CONTEXT
import { AppContext } from '../../context';

//constantes
import { api_url, endpoints, auth_token } from '../../constants';

//COMPONENTS
import { FormTasks } from '../form-tasks';
import { TasksWrapper } from '../tasks-wrapper';

// STYLES
import './dashboad.scss';


export const Dashboard = () =>{
    //Estado inicial
    const [tasks, setTasks] = useState([]);

    //Descomponer el contexto y obtener las propiedades
    const { app_state: {name}, app_logout } = useContext(AppContext);
    //obtener la primera palabra del string
    const first_name = name.replace(/ .*/,'');

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
                console.log(res.data.data.tasks);
                setTasks(res.data.data.tasks);
            })
            .catch(error => {
                console.log(error, error.response);
            });
    }

    const showModal = () =>{
        const elem = document.getElementById('form-tasks');
        let instance = M.Modal.getInstance(elem);
        instance.open();
    }

    const handleAddTask = new_task =>{
        const new_task_list = tasks;
        new_task_list.push(new_task);
        setTasks(new_task_list);
    }

    return (
        <Fragment>
            <header>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-7">
                            <h2>¡Hola {first_name}!</h2>
                        </div>
                        <div className="col-12 col-lg-5 text-right">
                            <button type="button" className="btn waves-effect" onClick={showModal}>Crear tarea</button>
                            <button type="button" className="btn waves-effect close-session" onClick={app_logout}>Cerrar sesión</button>
                        </div>
                    </div>
                </div>
            </header>

            <div id="page-dashboard" className="container">
                {tasks.length > 0 && (
                    <TasksWrapper tasks={tasks} />
                )}
            </div>

            <FormTasks addTask={handleAddTask} />

        </Fragment>
    );
}