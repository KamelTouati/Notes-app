import React, {useState, useEffect} from 'react'
import {ListItem, AddButton} from '../components/index'
import { MdAddCircle } from "react-icons/md";

const NotesList = () => {
    let [notes, setNotes] = useState([])
    useEffect(() => {
        getNotes()
    }, [])

    let getNotes = async() => {
        let response = await fetch('http://127.0.0.1:8000/api/notes/')
        let data = await response.json();
        // console.log('data: ', data);
        setNotes(data);
        // console.log('notes: ', notes);
    }
    return (
        <>
            <div className='notes'>
                <div className='notes-header'>
                <h2 className="notes-title">&#9782; Notes</h2>
                <p className="notes-count">{notes.length}</p>
                </div>
                <div className='notes-list'>
                    {notes.map((note, index) => (
                        <ListItem key={index} note={note}/>
                        // console.log('note: ', note)
                    ))}
                </div>
                <AddButton />
            </div>
        </>
    )
}

export default NotesList