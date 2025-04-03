import React from 'react';
import { SocialIcon } from 'react-social-icons';
export default function Social(){
    return (
        <div className="Social-icons">
            <p>Follow:</p>

            <SocialIcon 
                url="https://wwww.facebook.com" 
                target="_blank"         
                rel="noopener noreferrer" 
            />

            <SocialIcon 
                url="https://www.twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
            />

            <SocialIcon 
                url="https://www.youtube.com" 
                target="_blank"
                rel="noopener noreferrer"
            />

        </div>
    )
}

