import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import EmailApp from './EmailApp';

const mount = (el) => {
    const root = createRoot(el);
    root.render(<EmailApp />);
};

if (process.env.NODE_ENV === 'development') {
    const devRoot = document.getElementById('root');
    if (devRoot) {
        mount(devRoot);
    }
}

export { mount };
