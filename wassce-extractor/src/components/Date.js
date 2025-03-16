export default function DateComponent(){
    const date = new Date()
    return(
        <>
            {date.getFullYear()}
        </>
        
    )
}