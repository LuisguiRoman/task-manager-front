// DEPENDENCIES
import React from 'react';

// STYLES
import './task-item.scss';

export const TaskItem = ({task}) =>{
    const formatDate = date =>{
        let d = new Date(date);
        let n = d.toLocaleDateString();
        return n;
    }

    return (            
        <div className="task-item">
            <h5>{task.task_name}</h5>
            <p className="text-right">
                <small>Fecha limite: {formatDate(task.expiration_date)}</small>
            </p>
        </div>
    );
}