import React from 'react'
import ReactDOM from 'react-dom'
import Display from './components/Display.jsx'
import Board from './components/Board.jsx'
import Win from './components/Win.jsx'
import alphabet from './assests/alphabet.js'
import words from './assests/words.js'
import style from './main.scss';

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      board: [],
      words: {},
      win: false
    }

    this.getWords = this.getWords.bind(this)

    // this.randomizeBoard = this.randomizeBoard.bind(this)
    this.publishBoard = this.publishBoard.bind(this)
    this.updateBoard = this.updateBoard.bind(this)
    this.checkBoard = this.checkBoard.bind(this)
    // this.checkSolvability = this.checkSolvability.bind(this)
    this.restart = this.restart.bind(this)
  }

  //
  // Class Functions
  //

  // Get Words

  getWords() {
    let list = words
    let targets = {}

    let chooseWords = () => {
      let length = Object.keys(targets).length

      if (length < 5) {
        let choice = list[Math.floor(Math.random() * Math.floor(list.length))]
        targets[choice] = false
        chooseWords()
      } else {
        return
      }

    } 
    chooseWords()

    this.setState({
      words: targets
    })
  }
  // Radomize

  buildBoard() {
    let list = alphabet
    let results = []
    for (let i = 0; i < 6; i++) {
      let arr = []
      for (let j = 0; j < 6; j++) {
        arr.push(list[Math.floor(Math.random() * Math.floor(list.length))])
      }
      results.push(arr)
    }
    console.log('results', results)
    this.setState({
      board: results
    })
  }

  // Publish Board

  publishBoard(board) {
    this.setState({
      board: board
    })
  }

  // Update

  updateBoard(tileRow, tileCol, board, game) {

    board.map((row, rowIndex) => {
      if (rowIndex === tileRow - 1 
        || rowIndex === tileRow + 1) 
      {
        row[tileCol] = !row[tileCol]
      } else if (rowIndex === tileRow) {
        row.map((col, colIndex) => {
          if (colIndex === tileCol 
            || colIndex === tileCol + 1 
            || colIndex === tileCol - 1) 
          {
            row[colIndex] = !col
          }
        })
      }
    })

    if (game) {
      let turns = this.state.turns + 1
      this.setState({
        board: board,
        turns: turns
      });
      this.checkBoard()
    } else {
      return board
    }

  }


  // Check for Wins

  checkBoard() {
    let win = true

    this.state.board.map(row => {
      row.map(tile => {
        if (tile) { win = false }
      })
    })
    
    if (win) {
      this.setState({
        win: true
      })
    }
  }

  // Check if Board is Solvable

  // checkSolvability(board, x) {
  //   let original = JSON.stringify(board)

  //   board.map((row, rowIndex) => {
  //     if (rowIndex < 4) {
  //       row.map((tile, colIndex) => {
  //         if (tile) {
  //           board = this.updateBoard(rowIndex + 1, colIndex, board, false)
  //         }
  //       })
  //     } else {
  //       let stringRow = JSON.stringify(row)
  //       if (stringRow === "[true,false,false,false,true]" 
  //         || stringRow === "[false,true,false,true,false]"
  //         || stringRow === "[true,true,true,false,false]"
  //         || stringRow === "[false,false,true,true,true]"
  //         || stringRow === "[true,false,true,true,false]"
  //         || stringRow === "[false,true,true,false,true]"
  //         || stringRow === "[true,true,false,true,true]") 
  //       {
  //         return this.publishBoard(JSON.parse(original))
  //       } else {
  //         return this.randomizeBoard(x)
  //       }
  //     }
  //   })
  // }



  // Restart Game

  restart() {
    this.setState({
      turns: 0,
      win: false
    })
    this.randomizeBoard(5)
  }

  //
  // 

  componentDidMount() {
    this.getWords()
    this.buildBoard()
  }

  //
  // Render App and Comps
  //

  render() {
    return (
      <div className="app-wrapper">
        <div className='bg'></div>
        <div className="comps-wrapper">
          <Display 
            words={Object.keys(this.state.words)}
            restart={this.restart}
            />
          <Board
            board={this.state.board}
            update={this.updateBoard}
          />
        </div>        
        {this.state.win ? 
        <Win 
          turns={this.state.turns}
          restart={this.restart}
        />
        : null
        }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
