import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants';

const OAuth2RedirectHandler = () => {
    const location = useLocation();

    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const token = getUrlParameter('token');
    console.log('token is --->', token);
    const error = getUrlParameter('error');

    if (token) {
        localStorage.setItem(ACCESS_TOKEN, token);
        return <Navigate to="/dashboard" replace />;
    } else {
        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: location,
                    error: error
                }}
            />
        );
    }
};

export default OAuth2RedirectHandler;
