// PopupModal.js
import React from 'react';

const PopupModal = ({ message, onClose }) => {
    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000
        }}>
            <p>{message}</p>
            <button onClick={onClose} style={{
                marginTop: '10px',
                padding: '8px 16px',
                backgroundColor: '#4CAF50',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
            }}>
                OK
            </button>
        </div>
    );
};

export default PopupModal;
