import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import ChatApp from './ChatApp';

// Mount function to start the app standalone
const mount = (el) => {
    const root = createRoot(el);
    root.render(<ChatApp />);
};

// If we are in development and in isolation, call mount immediately
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.getElementById('root');
    if (devRoot) {
        mount(devRoot);
    }
}

export { mount };
