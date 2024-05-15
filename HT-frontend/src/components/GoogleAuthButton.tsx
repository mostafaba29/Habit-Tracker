import React from "react";

const GoogleAuthButton:React.FC = ()=>{
    const handleLogin= ()=>{
        window.location.href = 'http://localhost:3000/auth/google';
    };

    return (
        <button onClick={handleLogin}>Login with Google</button>
    );
};

export default GoogleAuthButton;