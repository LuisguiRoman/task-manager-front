import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';

//CONTEXT
import { AppProvider } from './context';

//styles
import App from './App';

const Evolution =()=>{
    return(
        <AppProvider>
            <App />
        </AppProvider>
    );
}

ReactDOM.render(<Evolution />, document.getElementById('root'));

