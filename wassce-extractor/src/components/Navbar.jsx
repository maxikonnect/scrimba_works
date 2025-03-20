import { NavLink } from 'react-router-dom'
import logo from '../Assets/images/favicon-32x32.png'

export default function Navbar(){
    return(
        <header className='header'>
            <nav className="navList">
                <img src={logo} alt="Wassce Analyser logo" />
                <ul className='navList-item'>
                    <NavLink className="logoName" to="/">WASSCE ANALYSER</NavLink>
                    <NavLink to="/about">About</NavLink>
                </ul>
            </nav>
        </header>
    )
}