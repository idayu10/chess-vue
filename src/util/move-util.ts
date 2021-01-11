import piece from '@/resources/const/piece';
export default class MoveUtil {

  public static moveStraight(row: number, column: number, board: string[][]): number[][] {
    const result: number[][] = [];
    // 上
    for (let i = row - 1; 0 <= i; i--) {
      if (board[i][column] === piece.NONE) {
        result.push([i, column]);
      } else if (board[row][column].split('-')[0] === board[i][column].split('-')[0]) {
        break;
      } else {
        result.push([i, column]);
        break;
      }
    }
    // 右
    for (let i = column + 1; i < 8; i++) {
      if (board[row][i] === piece.NONE) {
        result.push([row, i]);
      } else if (board[row][column].split('-')[0] === board[row][i].split('-')[0]) {
        break;
      } else {
        result.push([row, i]);
        break;
      }
    }
    // 下
    for (let i = row + 1; i < 8; i++) {
      if (board[i][column] === piece.NONE) {
        result.push([i, column]);
      } else if (board[row][column].split('-')[0] === board[i][column].split('-')[0]) {
        break;
      } else {
        result.push([i, column]);
        break;
      }
    }
    // 左
    for (let i = column - 1; 0 <= i; i--) {
      if (board[row][i] === piece.NONE) {
        result.push([row, i]);
      } else if (board[row][column].split('-')[0] === board[row][i].split('-')[0]) {
        break;
      } else {
        result.push([row, i]);
        break;
      }
    }
    return result;
  }

  public static moveCrossly(row: number, column: number, board: string[][]): number[][] {
    const result: number[][] = [];
    // 右上
    let minLine = Math.min(row, 7 - column);
    for (let i = 1; i <= minLine; i++) {
      if (board[row - i][column + i] === piece.NONE) {
        result.push([row - i, column + i]);
      } else if (board[row][column].split('-')[0] === board[row - i][column + i].split('-')[0]) {
        break;
      } else {
        result.push([row - i, column + i]);
        break;
      }
    }
    // 右下
    minLine = Math.min(7 - row, 7 - column);
    for (let i = 1; i <= minLine; i++) {
      if (board[row + i][column + i] === piece.NONE) {
        result.push([row + i, column + i]);
      } else if (board[row][column].split('-')[0] === board[row + i][column + i].split('-')[0]) {
        break;
      } else {
        result.push([row + i, column + i]);
        break;
      }
    }
    // 左下
    minLine = Math.min(7 - row, column);
    for (let i = 1; i <= minLine; i++) {
      if (board[row + i][column - i] === piece.NONE) {
        result.push([row + i, column - i]);
      } else if (board[row][column].split('-')[0] === board[row + i][column - i].split('-')[0]) {
        break;
      } else {
        result.push([row + i, column - i]);
        break;
      }
    }
    // 左上
    minLine = Math.min(row, column);
    for (let i = 1; i <= minLine; i++) {
      if (board[row - i][column - i] === piece.NONE) {
        result.push([row - i, column - i]);
      } else if (board[row][column].split('-')[0] === board[row - i][column - i].split('-')[0]) {
        break;
      } else {
        result.push([row - i, column - i]);
        break;
      }
    }
    return result;
  }

  public static moveKnight(row: number, column: number, board: string[][]): number[][] {
    const highlightTmp: number[][] = [];
    highlightTmp.push([row - 2, column + 1]);
    highlightTmp.push([row - 1, column + 2]);
    highlightTmp.push([row + 1, column + 2]);
    highlightTmp.push([row + 2, column + 1]);
    highlightTmp.push([row + 2, column - 1]);
    highlightTmp.push([row + 1, column - 2]);
    highlightTmp.push([row - 2, column - 1]);
    highlightTmp.push([row - 1, column - 2]);

    const result: number[][] = [];
    for (let item of highlightTmp) {
      if (item[0] < 0 || item[1] < 0 || 7 < item[0] || 7 < item[1]) {
        continue;
      }
      if (board[row][column].split('-')[0] === board[item[0]][item[1]].split('-')[0]) {
        continue;
      }

      result.push(item);
    }
    return result;
  }

  public static moveKing(row: number, column: number, board: string[][]): number[][] {
    const highlightTmp: number[][] = [];
    highlightTmp.push([row + 1, column]);
    highlightTmp.push([row + 1, column + 1]);
    highlightTmp.push([row, column + 1]);
    highlightTmp.push([row - 1, column + 1]);
    highlightTmp.push([row - 1, column]);
    highlightTmp.push([row + 1, column - 1]);
    highlightTmp.push([row, column - 1]);
    highlightTmp.push([row - 1, column - 1]);

    const result: number[][] = [];
    for (let item of highlightTmp) {
      if (item[0] < 0 || item[1] < 0 || 7 < item[0] || 7 < item[1]) {
        continue;
      }
      if (board[row][column].split('-')[0] === board[item[0]][item[1]].split('-')[0]) {
        continue;
      }

      result.push(item);
    }
    return result;
  }

  public static movePawn(row: number, column: number, board: string[][]): number[][] {
    const result: number[][] = [];
    const move: number = board[row][column].split('-')[0] === 'white' ? -1 : 1;
    if ((move === -1 && row == 6) || move === 1 && row == 1) {
      if (board[row + move * 2][column] === piece.NONE) {
        result.push([row + move * 2, column]);
      }
    }
    if (board[row + move][column] === piece.NONE) {
      result.push([row + move, column]);
    }
    if (0 < column - 1 && board[row + move][column -1] !== piece.NONE
      && board[row][column].split('-')[0] !== board[row + move][column - 1].split('-')[0]) {
        result.push([row + move, column - 1]);
    }
    if (column + 1 < 8 && board[row + move][column + 1] !== piece.NONE
      && board[row][column].split('-')[0] !== board[row + move][column + 1].split('-')[0]) {
        result.push([row + move, column + 1]);
    }
    return result;
  }

  /**
   * チェックされている数を返す
   * @param {string} color オブジェクト配列
   * @param {string[][]} board オブジェクトのプロパティ
   * @return {number} チェックされている数
   */
  public static countChecked(color: string, board: string[][]): number {
    let moveList: number[][] = [];
    const kingPos: number[] = [];
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        const pieceTmp = board[row][column];
        if (pieceTmp === piece.NONE) {
          continue;
        }
        if (pieceTmp.split('-')[0] === color) {
          if (pieceTmp.split('-')[1] === piece.KING) {
            kingPos.push(row);
            kingPos.push(column);
          }
          continue;
        }
        switch (pieceTmp.split('-')[1]) {
          case piece.ROOK:
            moveList = moveList.concat(MoveUtil.moveStraight(row, column, board));
            break;
          case piece.BISHOP:
            moveList = moveList.concat(MoveUtil.moveCrossly(row, column, board));
            break;
          case piece.QUEEN:
            moveList = moveList.concat(MoveUtil.moveStraight(row, column, board));
            moveList = moveList.concat(MoveUtil.moveCrossly(row, column, board));
            break;
          case piece.KNIGHT:
            moveList = moveList.concat(MoveUtil.moveKnight(row, column, board));
            break;
          case piece.KING:
            moveList = moveList.concat(MoveUtil.moveKing(row, column, board));
            break;
          case piece.PAWN:
            moveList = moveList.concat(MoveUtil.movePawn(row, column, board));
            break;
          default:
            break;
        }
      }
    }

    let result = 0;
    for (let item of moveList) {
      if (item[0] === kingPos[0] && item[1] === kingPos[1]) {
        result++;
      }
    }
    return result;
  }
}
