import { useState } from 'react'
import "./App.css"
import User from "./assets/images/user.png"
import starFilled from "./assets/images/star-empty.png"
import starEmpty from "./assets/images/star-filled.png"

export default function App(){
    
    const[contact, setContact] = useState({
      firstName: "John",
      lastName: "Doe",
      phone: "+1 (212) 555-1212",
      email: "itsmyrealname@example.com",
      isFavorite: false
    })


    function ToggleButton(){
      setContact(prev => {
        return{...prev, isFavorite: !contact.isFavorite}
      })
    }

    let starIcon = contact.isFavorite ? starFilled : starEmpty
    return (
        <main>
          <article>
            <div className="avatar-container">
                <img src={User}
                     alt="user profile"
                     className="avatar"
                />
            </div>
            <div className='info'>
              <button 
                onClick={ToggleButton}
              >
                <img src={starIcon} 
                alt={contact.isFavorite ? "star is filled" : "star is not filled"}
                className="favorite" />
              </button>
              <h2>
                {contact.firstName}
              </h2>
              <p>{contact.phone}</p>
              <p>{contact.email}</p>
            </div>
          </article>
        </main>
    )
}