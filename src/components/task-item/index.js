// DEPENDENCIES
import React from 'react';

// STYLES
import './task-item.scss';

export const TaskItem = ({task, remove}) =>{
    const formatDate = date =>{
        let d = new Date(date);
        let n = d.toLocaleDateString();
        return n;
    }

    return (            
        <div id={task._id} data-u={task.user_id} data-p={task.priority} className="task-item">
            <h5>{task.task_name}</h5>
            <p className="text-right">
                <small>Fecha limite: {formatDate(task.expiration_date)}</small>
            </p>

            <button className="remove-task" onClick={()=>{
                remove({user_id: task.user_id, task_id: task._id});
            }}>x</button>
        </div>
    );
}