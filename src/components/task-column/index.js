// DEPENDENCIES
import React, { useState } from 'react';

//COMPONENTS
import { TaskItem } from '../task-item';

// STYLES
import './tasks-column.scss';


export const TasksColumn = ({column}) =>{
    

    return (
        <div id={column.id} className="tasks-column col-12 col-lg-4">
            <div>
                <h4 className={`priority-${column.priority}`}>{column.title}</h4>

                {column.tasks.map((task, index)=>(
                      <TaskItem key={`task-${task._id}`} task={task} />
                ))}
            </div>
        </div>
    );
}