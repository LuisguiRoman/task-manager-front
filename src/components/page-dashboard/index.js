// DEPENDENCIES
import React, { Fragment, Component } from 'react';
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


export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        }
    }

    static contextType = AppContext;//usar el contexto de la app

    componentDidMount(){
        let elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
        this.getTasks();
    }

    getTasks = () =>{
        axios
            .post(`${api_url}${endpoints.tasks}`, {}, {
                headers: { 'Authorization': `Bearer ${auth_token}` }
            })
            .then(res => {
                console.log(res.data.data.tasks);
                this.setState({tasks: res.data.data.tasks});
            })
            .catch(error => {
                console.log(error, error.response);
            });
    }

    showModal = () =>{
        const elem = document.getElementById('form-tasks');
        let instance = M.Modal.getInstance(elem);
        instance.open();
    }

    handleAddTask = new_task =>{
        const new_task_list = this.state.tasks;
        new_task_list.push(new_task);
        this.setState({tasks: new_task_list});
    }

    handleUpdateTask = task =>{
        axios
            .patch(`${api_url}${endpoints.tasks}/update`, {...task}, {
                headers: { 'Authorization': `Bearer ${auth_token}` }
            })
            .then(res => {
                console.log(res.data);
                M.toast({html: 'Prioridad actualizada!', classes: 'success'});
            })
            .catch(error => {
                console.log(error, error.response);
            });
    }

    handleDeleteTask = task =>{
        const tasks_copy = this.state.tasks;
        const task_index = tasks_copy.map(task => task._id).indexOf(task.task_id);

        axios
            .delete(`${api_url}${endpoints.tasks}/remove`, {
                headers: { Authorization: `Bearer ${auth_token}`},
                data: { ...task }
            })
            .then(res => {
                //console.log(res.data);
                //Eliminar del arrary
                tasks_copy.splice(task_index, 1);
                this.setState({tasks: tasks_copy});
                M.toast({html: 'Tarea eliminada!', classes: 'success'});
            })
            .catch(error => {
                M.toast({html: 'Ocurrio un error!', classes: 'error'});
                console.log(error, error.response);
            });
    }

    render(){
        //Descomponer el contexto y obtener las propiedades
        const { app_state: {name}, app_logout } = this.context;
        //obtener la primera palabra del string
        const first_name = name.replace(/ .*/,'');

        return (
            <Fragment>
                <header>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-lg-7">
                                <h2>¡Hola {first_name}!</h2>
                            </div>
                            <div className="col-12 col-lg-5 text-right">
                                <button type="button" className="btn waves-effect" onClick={this.showModal}>Crear tarea</button>
                                <button type="button" className="btn waves-effect close-session" onClick={app_logout}>Cerrar sesión</button>
                            </div>
                        </div>
                    </div>
                </header>
    
                <div id="page-dashboard" className="container">
                    {this.state.tasks.length > 0 && (
                        <TasksWrapper tasks={this.state.tasks}
                                      update={this.handleUpdateTask}
                                      remove={this.handleDeleteTask} />
                    )}
                </div>
    
                <FormTasks addTask={this.handleAddTask} />
    
            </Fragment>
        );
    }
}

export default Dashboard;