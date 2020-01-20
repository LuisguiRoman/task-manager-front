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

    const compareDate = date =>{
        let today = new Date();
        let day = new Date(date);
        let className = '', text = '';

        if(today.getTime() > day.getTime()){
            className = 'expired-date';
            text = 'Tarea vencida';
        }else{
            text = 'Fecha limite';
        }
        return {className, text};
    }

    return (            
        <div id={task._id} data-u={task.user_id} data-p={task.priority} className="task-item">
            <h5>{task.task_name}</h5>
            <p className="text-right">
                <small className={compareDate(task.expiration_date).className}>
                    {compareDate(task.expiration_date).text}: {formatDate(task.expiration_date)}
                </small>
            </p>

            <button className="remove-task" onClick={()=>{
                remove({user_id: task.user_id, task_id: task._id});
            }}>x</button>
        </div>
    );
}