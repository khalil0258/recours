import React from 'react'
import './ErreurMessage.css'

function ErreurMessage(props) {
  return (
    <div className='erreur'>{props.message}</div>
  )
}

export default ErreurMessage
