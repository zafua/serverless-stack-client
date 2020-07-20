import React from 'react';
import { Button } from 'react-bootstrap';
import { MdRefresh } from 'react-icons/md'
import './LoaderButton.css';

export default function LoaderButton({
    isLoading, 
    className = "",
    disabled= false,
    ...props
}) {
    return(
        <Button
            className={`LoaderButton ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <MdRefresh className="spinning" />}
            {props.children}
        </Button>
    );
}