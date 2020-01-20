// DEPENDENCIES
import React, { useState, useEffect } from 'react';

//COMPONENTS
import { TasksColumn } from '../task-column';

// STYLES
import './tasks-wrapper.scss';


export const TasksWrapper = ({tasks}) =>{
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

    return (
        <div id="tasks-wrapper" className="row">
            {columns.map((column, index)=>(
                <TasksColumn key={`colum_${column.id}_${index}`} column={column} />
            ))}
        </div>
    );
}