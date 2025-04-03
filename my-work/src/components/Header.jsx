import { Link } from 'react-router-dom';

export default function Header(){
    return(
        <header>
            <h1>My App</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/contact-info">Contact</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}