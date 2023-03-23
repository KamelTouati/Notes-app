import React, {useState, useEffect} from 'react'
import {useParams } from 'react-router-dom';
// import {NotesList} from './index';

const NotePage = () => {
  const {id}  = useParams();
  let [note, setNote] = useState(null)

  useEffect(()=> {
    getNote()
  }, [id])

  let getNote = async() => {
    let response = await fetch(`http://127.0.0.1:8000/api/notes/${id}/`)
    let data = await response.json()
    setNote(data)
  }
  console.log('noteId: ', id)
  if (!id) return null; // or fallback UI
  return (
    <>
      <p>{note?.body}</p>
    </>
  )
}

export default NotePage