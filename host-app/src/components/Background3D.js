import React from 'react';

const Background3D = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 dark:bg-blue-600/10 rounded-full blur-[100px] animate-blob" />
            <div className="absolute top-[20%] right-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 dark:bg-purple-600/10 rounded-full blur-[100px] animate-blob animation-delay-2000" />
            <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-indigo-500/20 dark:bg-indigo-600/10 rounded-full blur-[100px] animate-blob animation-delay-4000" />
        </div>
    );
};

export default Background3D;
