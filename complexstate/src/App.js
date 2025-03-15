import { useState } from 'react'
import User from "./assets/images/user.png"
import starFilled from "./assets/images/star-empty.png"
import starEmpty from "./assets/images/star-filled.png"

export default function App(){
    

    return (
        <main>
          <article>
            <div className="avatar-container">
                <img src={User}
                     alt="user profile picture"
                     className="avatar"
                />
            </div>
            <div className='info'>
              
            </div>
          </article>
        </main>
    )
}