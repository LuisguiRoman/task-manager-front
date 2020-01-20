// DEPENDENCIES
import React, { useEffect } from 'react';
import dragula from 'dragula';

//COMPONENTS
import { TasksColumn } from '../task-column';

// STYLES
import './tasks-wrapper.scss';


export const TasksWrapper = ({tasks, update, remove}) =>{
    let priority_1 = [], priority_2 = [], priority_3 = [];
    //Reordenar tareas
    tasks.forEach(task => {
        if(task.priority === 1) priority_1.push(task);
        if(task.priority === 2) priority_2.push(task);
        if(task.priority === 3) priority_3.push(task);
    });
    const columns = [
        { id: 'column_1', title: 'Prioridad Alta', priority: 1, tasks: priority_1 },
        { id: 'column_2', title: 'Prioridad Media', priority: 2, tasks: priority_2 },
        { id: 'column_3', title: 'Prioridad Baja', priority: 3, tasks: priority_3 }
    ];

    useEffect(()=>{
        //Eeventos drag and drop
        dragula([document.getElementById('column_1'), document.getElementById('column_2'), document.getElementById('column_3')])
            .on('drop', (el)=>{
                el.className += ' ex-moved';
                updatePriority(el, el.parentNode);
            })
    }, []);

    const updatePriority = (task, column) =>{
        const current_priority  = task.getAttribute('data-p');
        const priority = column.getAttribute('data-priority');
        const user_id  = task.getAttribute('data-u');
        const task_id  = task.id;
        if(current_priority !== priority){
            update({priority: parseInt(priority), user_id, task_id});
        }
    }

    return (
        <div id="tasks-wrapper" className="row">
            {columns.map((column, index)=>(
                <TasksColumn key={`colum_${column.id}_${index}`} column={column} remove={remove} />
            ))}
        </div>
    );
}