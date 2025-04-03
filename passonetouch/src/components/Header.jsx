import React from 'react';
import Social from './Social';
import Navbar from './Nav';



const Header = ({ scrollToAbout, scrollToServices, scrollToTestimonial }) =>{
    return (
        <header>
            <Social />
            <Navbar
                scrollToAbout={scrollToAbout}
                scrollToServices={scrollToServices}
                scrollToTestimonial={scrollToTestimonial}
            />
        </header>
    )
}

export default Header;