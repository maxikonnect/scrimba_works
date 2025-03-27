import React, { useState, useEffect } from 'react'


const GetDate = () =>{

    const [timer, setTimer] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(()=>{
            setTimer(new Date())
        }, 1000)

        return () => clearInterval(interval)
    }, [timer])

    return(
        <>
            <p>{timer.toLocaleTimeString()} {/*|| {timer.toLocaleDateString()} */}</p>
            <p>{timer.getFullYear()}</p>
        </>
    )
}

export default GetDate;