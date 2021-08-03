import React from 'react'
import IconButton from '../IconButton';
import ExitIcon from './ExitIcon';
export default function Modal(props) {
    const { open, onClose } = props;
    if (!open) {
        return <></>;
    }
    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-400 bg-opacity-30 flex">
            <div className="relative p-4 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
                <div>{props.children}</div>
                <span className="absolute top-0 right-0 p-2">
                    <IconButton onClick={() => onClose()}>
                        <ExitIcon />
                    </IconButton>
                </span>
            </div>
        </div>
    );
}