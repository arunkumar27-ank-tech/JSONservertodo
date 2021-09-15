import React,{useState, useEffect} from 'react'
//import notes from '../assets/data'
import {Link} from 'react-router-dom'
import  { ReactComponent as Arrowleft } from '../assets/arrow-left.svg'

const Notepage = ({match, history}) => {
    let noteId = match.params.id
    //console.log("props:",noteId)
    //let note = notes.find(note => note.id === Number(noteId))
    let [note, setNotes] = useState(null)

    useEffect(()=>{
        getNotes()
    }, [noteId])

    let getNotes = async() =>{
        if (noteId==='new') return
        let response = await fetch(`http://localhost:8000/notes/${noteId}`)
        let data = await response.json()
        console.log("Data:",data)

        setNotes(data)
    }
    let createNote =  async() =>{
        await fetch(`http://localhost:8000/notes/`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({...note,'updated': new Date()})
        } )
    }

    let updateNote =  async() =>{
        await fetch(`http://localhost:8000/notes/${noteId}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({...note,'updated': new Date()})
        } )
    }

    let deleteNote =async () =>{
        await fetch(`http://localhost:8000/notes/${noteId}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(note)
        } )
        history.push('/')
    }

    let handleSubmit = () =>{
        if (noteId !== 'new' && !note.body){
            deleteNote()
        }
        else if(noteId !== 'new'){
            updateNote()
        }else if(noteId === 'new' && note!=null){
            createNote()
        }
       
        history.push('/')
    }

    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <Link to='/'>
                        <Arrowleft onClick={handleSubmit} /> 
                    </Link>
                </h3>
                {noteId !=='new' ?(
                    <button onClick={deleteNote}>Delete</button>

                ):(
                    <button onClick={handleSubmit}>Done</button>

                )} 
                
                
            </div>
            <textarea onChange={(e)=>{setNotes({...note,'body':e.target.value})}} value={note?.body}>

</textarea>
        </div>
    )
}

export default Notepage
