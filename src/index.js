import React from 'react';
import ReactDOM from 'react-dom';

//CONTEXT
import { AppProvider } from './context';

//styles
import App from './App';

const TaskManager =()=>{
    return(
        <AppProvider>
            <App />
        </AppProvider>
    );
}

ReactDOM.render(<TaskManager />, document.getElementById('root'));

