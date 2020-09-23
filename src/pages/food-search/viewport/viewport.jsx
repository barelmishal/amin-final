import React from 'react';
import './viewport.css';

const Viewport = (props) => {
return (
    <div className='viewport'>
        {props.children}
    </div>
    );
};

export default Viewport;