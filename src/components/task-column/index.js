// DEPENDENCIES
import React from 'react';

//COMPONENTS
import { TaskItem } from '../task-item';

// STYLES
import './tasks-column.scss';


export const TasksColumn = ({column}) =>{
    return (
        <div className="tasks-column col-12 col-lg-4">
            <h4 className={`priority-${column.priority}`}>{column.title}</h4>
            <div id={column.id} data-priority={column.priority}>
                {column.tasks.map((task, index)=>(
                      <TaskItem key={`task-${task._id}`} task={task} />
                ))}
            </div>
        </div>
    );
}