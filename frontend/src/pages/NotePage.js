import React, {useState, useEffect} from 'react'
import {useParams, Link, useNavigate  } from 'react-router-dom';
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";

const NotePage = (history) => {
  const {id}  = useParams();
  const navigate = useNavigate ();

  let [note, setNote] = useState(null)

  useEffect(()=> {
    getNote()
  }, [id])

  let getNote = async() => {
    let response = await fetch(`http://127.0.0.1:8000/api/notes/${id}/`)
    let data = await response.json()
    setNote(data)
  }

  let updateNote = async() => {
      fetch(`http://127.0.0.1:8000/api/notes/${id}/update/`, {
      method: "PUT", 
      headers: {  
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note)
    })
  }

  let deleteNote = async() => {
    fetch(`http://127.0.0.1:8000/api/notes/${id}/delete/`, {
    method: "DELETE", 
    headers: {  
      'Content-Type': 'application/json',
    }
    })
    navigate('/');
  }

  let handleSubmit = () => {
    updateNote();
    navigate('/');
  }

  if (!id) return null; // or fallback UI
  return (
    <>
      <div className='note'>
        <div className='note-header'>
          <h3>
            <BsFillArrowLeftCircleFill onClick={handleSubmit}/>
            <AiFillDelete onClick={deleteNote}/>
          </h3> 
        </div>
        <textarea onChange={(e) => {setNote({...note, 'body': e.target.value})}} defaultValue={note?.body}></textarea>
      </div>
    </>
  )
}

export default NotePage