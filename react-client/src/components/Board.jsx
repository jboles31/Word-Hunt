import React from 'react'

const Board = ( props ) => {

  const generateBoard = (board) => {
    let tileContainer = [];
    let result = []

    board.map((row, rowIndex) => {
      result = []
      row.map((boolean, colIndex) => {
        boolean ? 
          result.push(<div 
            className='lit-tile' 
            key={`${rowIndex}x${colIndex}`} 
            onClick={() => props.update(rowIndex, colIndex, props.board, true)}
          ></div>)
        :
          result.push(<div 
            className='unlit-tile' 
            key={`${rowIndex}x${colIndex}`} 
            onClick={() => props.update(rowIndex, colIndex, props.board, true)}
          ></div>)  
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