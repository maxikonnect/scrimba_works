import { Link } from 'react-router-dom';
import React from 'react';

export default function NotFound(){
    return (
        <div class="notFound">
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for could not be found.</p>
            <p>Here are some useful Links</p>
            <Link to='/'>Home</Link>
        </div>
    )
}