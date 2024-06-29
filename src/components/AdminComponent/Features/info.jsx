import React from 'react';

const Info = () => {
    const infoStyle = {
        fontFamily: 'Arial, sans-serif',
        fontSize: '1.2rem',
        lineHeight: '1.6',
        maxWidth: '600px',
        margin: 'auto',
        textAlign: 'justify',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    };

  

    return (
        <div style={infoStyle}>
            <h1>Welcome to Info Page</h1>
           
        <div >
            <p>
            Love from <span style={{ color: 'red' }}>❤</span> PulseZest.
            </p>
        </div>
        </div>
    );
}

export default Info;
