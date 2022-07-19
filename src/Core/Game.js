import React, {useState} from 'react';
import Box from './Box';

// TODO -- UI to allow user to change board size;
// By the way, you can play with this value, the game will work!!!
const BOARD_SIZE = 3;

const makeInitGameState = ((size) => {
  const ret = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      ret.push([j,i]);
    }
  }
  return ret;
});

/*
It wouldn't be terrible difficult to put a picture instead of numbers. Use the CSS property of
background and shift the image by the position of the piece. That would be a nice addon.
 */
const Game = () => {
  const [gameSituation, setGameSituation] = useState(makeInitGameState(BOARD_SIZE), []);

  const handleClick = (clickedCellValue) => {
    const emptyCellValue = BOARD_SIZE * BOARD_SIZE - 1;

    const retArr = gameSituation.map((cell) => [cell[0], cell[1]]);

    const cx = retArr[clickedCellValue][0];
    const cy = retArr[clickedCellValue][1];
    const ex = retArr[emptyCellValue][0];
    const ey = retArr[emptyCellValue][1];

    if (cx === ex) {
      if (cy === ey -1) {
        retArr[clickedCellValue] = [cx, cy + 1];
        retArr[emptyCellValue] = [ex, ey - 1];
      }
      if (cy === ey +1) {
        retArr[clickedCellValue] = [cx, cy - 1];
        retArr[emptyCellValue] = [ex, ey + 1];
      }
    }
    if (cy === ey) {
      if (cx === ex -1) {
        retArr[clickedCellValue] = [cx + 1, cy];
        retArr[emptyCellValue] = [ex - 1, ey];
      }
      if (cx === ex +1) {
        retArr[clickedCellValue] = [cx - 1, cy];
        retArr[emptyCellValue] = [ex + 1, ey];
      }
    }
    // TODO -- detect win here
    setGameSituation(retArr);
  }

  const handleShuffle = () => {
    // TODO -- Show animated shuffle in fast-forward step by step
    const retArr = gameSituation.map((cell) => [cell[0], cell[1]]);
    const emptyCellValue = BOARD_SIZE * BOARD_SIZE - 1;

    /*
    Note
    There is probably some smart algorithm to detect feasibility of the board (I read Martin Gardner too :-))
    I choose to make a random reverse player to shuffle the board so to guarantee that there will always be a solution.
    It fells into a problem that sometimes the random action moves a "phantom" cell that is not in the board (those
    trinary expression in the switch), then the loop do nothing and just continue.
    I decided that in the able time to deliver this exercise, this solution was good enough and fixing this problem
    would add unnecessary complexity for now.
     */

    // TODO -- loop count should be a function of the board size (more pieces to move)
    for (let i = 0; i < 500; i++) {
      const cornerToClick = Math.floor(Math.random() * 4);
      const ex = retArr[emptyCellValue][0];
      const ey = retArr[emptyCellValue][1];
      let cx;
      let cy;

      switch(cornerToClick) {
        case 0: // under
          cx = ex;
          cy = ey - 1 < 0 ? 0 : ey - 1;
          break;
        case 1: // over
          cx = ex;
          cy = ey + 1 > BOARD_SIZE - 1 ? BOARD_SIZE - 1 : ey + 1;
          break;
        case 2: // left
          cx = ex - 1 < 0 ? 0 : ex - 1;
          cy = ey;
          break;
        case 3: // right
          cx = ex + 1 > BOARD_SIZE - 1 ? BOARD_SIZE - 1 : ex + 1;
          cy = ey;
          break;
      }
      const movedCell = retArr.findIndex((cell) => cell.join('-') === [cx, cy].join('-'));

      retArr[emptyCellValue] = [cx, cy];
      retArr[movedCell] = [ex, ey];
    }
    setGameSituation(retArr);
  }

  const handleReset = () => {
    setGameSituation(makeInitGameState(BOARD_SIZE));
  }

  return (
    <div className='container'>
      <div className='board' style={{width: BOARD_SIZE * 50, height: BOARD_SIZE * 50}}>
        {
          gameSituation.map((cellPos, index) =>
            index < BOARD_SIZE * BOARD_SIZE - 1 ? <Box key={index} position={cellPos} value={index + 1} onClick={() => handleClick(index)} /> : null)
        }
      </div>
      <button onClick={handleShuffle}>Shuffle</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}

export default Game;
