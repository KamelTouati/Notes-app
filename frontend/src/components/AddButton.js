import React from 'react'
import {Link} from 'react-router-dom'
import { MdAddCircle } from "react-icons/md";

const AddButton = () => {
  return (
    <Link to='/note/new' className='floating-button'>
        <MdAddCircle />
    </Link>
  )
}

export default AddButton