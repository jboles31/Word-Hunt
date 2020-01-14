import React from 'react'

const Display = ( props ) => {
  
  return (
    <div className='display'>
      <div className='restart-container'>
        <div className='restart' onClick={() => props.restart()}>Restart</div>  
      </div>
      <div className='word-container'>
        <div className='word-title'>Words:</div>
        <div className='word-number'>{props.words[0]}</div>
        <div className='word-number'>{props.words[1]}</div>
        <div className='word-number'>{props.words[2]}</div>
        <div className='word-number'>{props.words[3]}</div>
        <div className='word-number'>{props.words[4]}</div>
      </div>
      <div className='description-container'>
        <div className='objective-title'>Objective:</div>
        <div className='objective'>Find all the listed words in the board</div>
      </div>
    </div>
  )
}

export default Display