import React, {useState, useEffect} from 'react'
//import notes from '../assets/data'
import Listitems from '../componenets/Listitems'
import Addbutton from '../componenets/Addbutton'
const Notespagelist = () => {
    let [notes, setNotes] = useState([])

    useEffect(() => {
        getNotes()
    }, [])

    let getNotes = async() =>{
       let response = await fetch('http://localhost:8000/notes')
       let data = await response.json()
       console.log("Data:",data)
       setNotes(data)
    }




    return (
        <div className="notes">
            <div className="notes-header">
                <h2 className="notes-title">&#9782; Notes</h2>
                <p className='notes-count'>{notes.length}</p>

            </div>
            <div className="notes-list">
                {notes.map((note,index) =>(
                    <Listitems key={index} note={note} />
                ))}
            </div>
            <Addbutton/>
        </div>
    )
}

export default Notespagelist
 