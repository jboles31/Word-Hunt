import React from 'react'

const Board = ( props ) => {

  const generateBoard = (board) => {
    let tileContainer = [];
    let result = []

    board.map((row, rowIndex) => {
      result = []
      row.map((letter, colIndex) => {
          result.push(<div 
            className='lit-tile' 
            key={`${rowIndex}x${colIndex}`} 
            onClick={() => props.update(rowIndex, colIndex, props.board, true)}
          >{letter}</div>)
      })
      tileContainer.push(<div 
        className='row' 
        key={`row${rowIndex}`}
        >{result}
      </div>);
    })

    return (<div className='board'>{tileContainer}</div>)
  }
  
  return (
    <div className='board-display'>
        {generateBoard(props.board)}
    </div>
  )
}

export default Board