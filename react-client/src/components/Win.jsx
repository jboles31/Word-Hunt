import React from 'react'

const Win = (props) => {

  return (
    <div className='win-wrapper'>
      <div className='win-module'>
        <div className='message'>You won in {props.turns} turns!</div>
        <div className='restart' onClick={() => props.restart()}>Restart</div>  
      </div>
    </div>
  )
}

export default Win