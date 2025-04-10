import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './AppHeader.css';

const AppHeader = ({ authenticated, onLogout }) => {
    return (
        <header className="app-header">
            <div className="container">
                <div className="app-branding">
                    <Link to="/" className="app-title">Spring Social</Link>
                </div>
                <div className="app-options">
                    <nav className="app-nav">
                        { authenticated ? (
                            <ul>
                                <li>
                                    <NavLink to="/profile" end>Profile</NavLink>
                                </li>
                                <li>
                                    <a href="#" onClick={onLogout}>Logout</a>
                                </li>
                            </ul>
                        ) : (
                            <ul>
                                <li>
                                    <NavLink to="/login" end>Login</NavLink>        
                                </li>
                                <li>
                                    <NavLink to="/signup" end>Signup</NavLink>        
                                </li>
                            </ul>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;
