import { forwardRef } from 'react';
import './InputBox.css';

// eslint-disable-next-line react/prop-types,react/display-name
const InputBox = forwardRef(({ className, type, placeholder }, ref) => {
    return (
        <input ref={ref} className={`input ${className}`} type={type} placeholder={placeholder} />
    );
});

export default InputBox;