import React, {useState, useEffect} from 'react'
import {useParams, Link, useNavigate  } from 'react-router-dom';
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { AiFillDelete, AiOutlineFileDone } from "react-icons/ai";

const NotePage = (history) => {
  const {id}  = useParams();
  const navigate = useNavigate ();

  let [note, setNote] = useState(null)

  useEffect(()=> {
    getNote()
  }, [id])

  let getNote = async() => {
    if (id === 'new') return
    let response = await fetch(`http://127.0.0.1:8000/api/notes/${id}/`)
    let data = await response.json()
    setNote(data)
  }
  
  let createNote = async() => {
      // fetch(`http://127.0.0.1:8000/api/notes/create/`, {
      fetch(`http://127.0.0.1:8000/api/notes/`, {
      method: "POST", 
      headers: {  
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note)
    })
  }

  let updateNote = async() => {
      // fetch(`http://127.0.0.1:8000/api/notes/${id}/update/`, {
      fetch(`http://127.0.0.1:8000/api/notes/${id}/`, {
      method: "PUT", 
      headers: {  
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note)
    })
  }

  let deleteNote = async() => {
    // fetch(`http://127.0.0.1:8000/api/notes/${id}/delete/`, {
    fetch(`http://127.0.0.1:8000/api/notes/${id}/`, {
    method: "DELETE", 
    headers: {  
      'Content-Type': 'application/json',
    }
    })
    navigate('/');
  }

  let handleSubmit = () => {
    if(id !== "new" && note.body == '') {
      deleteNote()
    }else if (id !== 'new') {
      updateNote();
    } else if (id == 'new' & note !== null) {
      console.log('new');
      createNote()
    }
    navigate('/');
  }

  if (!id) return null; // or fallback UI
  return (
    <>
      <div className='note'>
        <div className='note-header'>
          <h3>
            <BsFillArrowLeftCircleFill onClick={handleSubmit}/>
          </h3> 
          {id !== 'new' ? (
            <AiFillDelete onClick={deleteNote}/>
            ):(
            <AiOutlineFileDone onClick={handleSubmit}/>
          )}  
        </div>
        <textarea onChange={(e) => {setNote({...note, 'body': e.target.value})}} value={note?.body}></textarea>
      </div>
    </>
  )
}

export default NotePage