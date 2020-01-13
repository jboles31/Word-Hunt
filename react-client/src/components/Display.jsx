import React from 'react'

const Display = ( props ) => {
  
  return (
    <div className='display'>
      <div className='restart-container'>
        <div className='restart' onClick={() => props.restart()}>Restart</div>  
      </div>
      <div className='turn-container'>
        <div className='turn-title'>Turns:</div>
        <div className='turn-number'>{props.turns}</div>
      </div>
      <div className='description-container'>
        <div className='objective-title'>Objective:</div>
        <div className='objective'>Turn all tiles off (dark) to win the game</div>
        <div className='hint-title'>Hint:</div>
        <div className='hint'>Clicking a tile will toggle it and all of it's adjacent tiles</div>
      </div>
    </div>
  )
}

export default Display