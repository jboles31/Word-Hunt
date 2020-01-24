import React from 'react'
import ReactDOM from 'react-dom'
import Display from './components/Display.jsx'
import Board from './components/Board.jsx'
import Win from './components/Win.jsx'
import alphabet from './assets/alphabet.js'
import words from './assets/words.js'
import style from './main.scss';

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      board: [],
      keys: [],
      words: [],
      win: false
    }

    // words: [ {
    //   word: 'free',
    //   found: false,
    //   path: [[a,d],[a,c],[a,b]]
    //  }]

    this.getWords = this.getWords.bind(this)
    this.buildBoard = this.buildBoard.bind(this)
    this.placeWords = this.placeWords.bind(this)
    // this.initiate = this.initiate.bind(this)

    // this.randomizeBoard = this.randomizeBoard.bind(this)
    // this.publishBoard = this.publishBoard.bind(this)
    // this.updateBoard = this.updateBoard.bind(this)
    // this.checkBoard = this.checkBoard.bind(this)
    // this.checkSolvability = this.checkSolvability.bind(this)
    this.restart = this.restart.bind(this)
  }

  //
  // Class Functions
  //

  // Get Words

  getWords() {
    let list = words
    let result = []
    let targets = []
    
    let chooseWords = () => {
      let length = targets.length
      let target = {}

      if (length < 5) {
        let index = Math.floor(Math.random() * Math.floor(list.length))
        let choice = list[index]
        
        list.splice(index, 1)

        target = {
          'word': choice,
          'found': false
        }
        targets.push(target)
        result.push(choice)
        chooseWords()
      } else {
        return
      }
    } 
    chooseWords()

    this.setState({
      words: targets,
      keys: result
    }, () => {
      this.state.words.forEach(word => {
        this.placeWords(word.word)
      })
    })
  }
  
  // Build Board

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

    this.setState({
      board: results
    })

  }

  // Place Words

  // initiate() {
  //   let words = this.state.words

  //   console.log('words', words)

  //   words.forEach(word => {
  //     this.placeWords(word.word)
  //   })
  // } 

  placeWords(word) {
    console.log('1: placeWords ran');
    // Pick a spot
    const random = () => {
      return Math.floor(Math.random() * 4)
    }
    
    let start = [random(), random()]
    
    // Pick an orientation Vert, Horiz, Diag
    const orientation = () => {
      let orientation = ['V', 'H', 'D']
      let random = Math.floor(Math.random() * 3)
      return orientation[random];
    }
      
    let direction = orientation()

    // Check length of word
    let length = word.length

    //Fit it to a path
    let path = []

        // Now we need to place this path on the board

    const placePath = (path, word) => {
  
      if (path.length !== word.length) {
        return
      }

      let newBoard = this.state.board

      for (let i = 0; i < word.length; i++) {
        newBoard[path[i][0]][path[i][1]] = word[i]
      }
      debugger;
      console.log('5: updated board', newBoard)
      
      this.setState({
        board: newBoard
      }, () => {
        console.log('6: board state updatesd with: ', word)
      })
      return
    }

    const assignPath = (spot, orientation) => {

      console.log('2: assignpath', spot, orientation)

      switch (orientation) {
        case 'V':
          debugger;
          if (spot[1] + length <= 6 ) {
            console.log('3: spot', spot)

            for (let i = 0; i < length; i++) {
              path.push([spot[0] + i, spot[1]])
            }
            console.log('4: path', path)
            placePath(path, word)
            return
          } else {
            this.placeWords(word)
          }

        case 'H':
          debugger;
        
          if (spot[0] + length <= 6 ) {
            console.log('3: spot', spot)

            for (let i = 0; i < length; i++) {
              path.push([spot[0], spot[1] + i])
            }
            console.log('4: path', path)
            placePath(path, word)
            return
          } else {
            this.placeWords(word)
          }

        case 'D':
          debugger;

          if (spot[0] + length <= 6 && spot[1] + length <= 6) {
            console.log('3: spot', spot)

            for (let i = 0; i < length; i++) {
              path.push([spot[0] - i, spot[1] + i])
            }
            console.log('4: path', path)
            placePath(path, word)
            return

          }
          else if (spot[1] + length <= 6 && spot[1] + length <= 6) {
            console.log('3: spot', spot)

            for (let i = 0; i < length; i++) {
              path.push([spot[0] + i, spot[1] + i])
            }
            console.log('4: path', path)
            placePath(path, word)
            return

          } else {
            this.placeWords(word)
          }
      }

      return
      
    }
    
    assignPath(start, direction)
    

    return
    // placePath(path, word)


    
    // Check if it's path has any of the same coordinates as any other word
    // If there is a cross over, check if letters are the same, if not pick new spot
    // Add path of word stored in tuples (ex. [[1,2],[1,3],[1,4],[1,5]])

  }

  // Check for Wins

  // checkforWin() {
  //   let keys = this.state.keys
  //   let words = this.state.words

  //   keys.map(key => {
  //     if (!words[key]) {
  //       return
  //     }
  //   })

  //   this.setState({
  //     win: true
  //   })
  // }


  // Restart Game

  restart() {
    this.setState({
      win: false
    })
    this.buildBoard()
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
            words={this.state.words}
            keys={this.state.keys}
            restart={this.restart}
            />
          <Board
            board={this.state.board}
            // update={this.updateBoard}
          />
        </div>        
        {this.state.win ? 
        <Win 
          // turns={this.state.turns}
          // restart={this.restart}
        />
        : null
        }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

// Publish Board

  // publishBoard(board) {
  //   this.setState({
  //     board: board
  //   })
  // }

  // Update

  // updateBoard(tileRow, tileCol, board, game) {

  //   board.map((row, rowIndex) => {
  //     if (rowIndex === tileRow - 1 
  //       || rowIndex === tileRow + 1) 
  //     {
  //       row[tileCol] = !row[tileCol]
  //     } else if (rowIndex === tileRow) {
  //       row.map((col, colIndex) => {
  //         if (colIndex === tileCol 
  //           || colIndex === tileCol + 1 
  //           || colIndex === tileCol - 1) 
  //         {
  //           row[colIndex] = !col
  //         }
  //       })
  //     }
  //   })

  //   if (game) {
  //     let turns = this.state.turns + 1
  //     this.setState({
  //       board: board,
  //       turns: turns
  //     });
  //     this.checkBoard()
  //   } else {
  //     return board
  //   }

  // }

