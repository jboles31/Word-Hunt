import React from 'react'

const Display = ( props ) => {

  const checkWords = (keys, obj) => {
    let wordContainer = [];
    
    keys.map((key) => {
      if (obj[key]) {
        wordContainer.push(<div
          className='found'
          key={`${key}`}
          >{key}</div>)
      } else {
        wordContainer.push(<div
          className='unfound'
          key={`${key}`}
        >{key}</div>)
      }
    })

  return (<div className='status-container'>{wordContainer}</div>)

  }

  // const generateBoard = (board) => {
  //   let tileContainer = [];
  //   let result = []

  //   board.map((row, rowIndex) => {
  //     result = []
  //     row.map((letter, colIndex) => {
  //         result.push(<div 
  //           className='lit-tile' 
  //           key={`${rowIndex}x${colIndex}`} 
  //           onClick={() => props.update(rowIndex, colIndex, props.board, true)}
  //         >{letter}</div>)
  //     })
  //     tileContainer.push(<div 
  //       className='row' 
  //       key={`row${rowIndex}`}
  //       >{result}
  //     </div>);
  //   })

  //   return (<div className='board'>{tileContainer}</div>)
  // }
  
  return (
    <div className='display'>
      <div className='restart-container'>
        <div className='restart' onClick={() => props.restart()}>Restart</div>  
      </div>
      <div className='word-container'>
        <div className='word-title'>Words:</div>
        {checkWords(props.keys, props.words)}
      </div>
      <div className='description-container'>
        <div className='objective-title'>Objective:</div>
        <div className='objective'>Find all the listed words in the board</div>
      </div>
    </div>
  )
}

export default Display