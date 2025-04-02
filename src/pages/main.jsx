import React from 'react'
import { Link } from 'react-router-dom';
function Main() {
    return (
        <div>

            <Link to="/admin-login">Admin Login</Link>
            <Link to="/user-chat">User Chat</Link>
        </div>
    )
}

export default Main