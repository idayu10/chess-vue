<template>
  <div class="container">
    <top-header/>
    <board
      :board="board"
      :highlight="highlight"
      @emit-click="emitClick"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import piece from '@/resources/const/piece';

@Component({
  components: {
    TopHeader :() => import('@/components/common/header/TopHeader.vue'),
    Board :() => import('@/components/common/Board.vue')
  }
})
export default class Index extends Vue {
  board: string[][] = [];
  highlight: number[][] = [];

  created():void {
    this.clearBoard();
    this.resetBoard();
  }

  clearBoard(): void {
    for (let row = 0; row < 8; row++) {
      this.board[row] = [];
      for (let column = 0; column < 8; column++) {
        this.board[row][column] = piece.NONE;
      }
    }
  }

  resetBoard(): void {
    this.board = [
      [piece.B_ROOK, piece.B_KNIGHT, piece.B_BISHOP, piece.B_QUEEN, piece.B_KING, piece.B_BISHOP, piece.B_KNIGHT,piece.B_ROOK],
      [piece.B_PAWN, piece.B_PAWN, piece.B_PAWN, piece.B_PAWN, piece.B_PAWN, piece.B_PAWN, piece.B_PAWN, piece.B_PAWN],
      [piece.NONE, piece.NONE, piece.NONE, piece.NONE, piece.NONE, piece.NONE, piece.NONE, piece.NONE],
      [piece.NONE, piece.NONE, piece.NONE, piece.NONE, piece.NONE, piece.NONE, piece.NONE, piece.NONE],
      [piece.NONE, piece.NONE, piece.NONE, piece.NONE, piece.NONE, piece.NONE, piece.NONE, piece.NONE],
      [piece.NONE, piece.NONE, piece.NONE, piece.NONE, piece.NONE, piece.NONE, piece.NONE, piece.NONE],
      [piece.W_PAWN, piece.W_PAWN, piece.W_PAWN, piece.W_PAWN, piece.W_PAWN, piece.W_PAWN, piece.W_PAWN, piece.W_PAWN],
      [piece.W_ROOK, piece.W_KNIGHT, piece.W_BISHOP, piece.W_QUEEN, piece.W_KING, piece.W_BISHOP, piece.W_KNIGHT,piece.W_ROOK]
    ]
  }

  emitClick(row: number, column: number) {
    if (this.highlight.length === 0) {
      // 可能手の検索
      this.searchBoard(row, column);
    } else {
      // 駒の移動
      this.putPiece(row, column);
    }
  }

  searchBoard(row: number, column: number): void {
    if (this.board[row][column] === piece.NONE) {
      return;
    }
    this.highlight = [];
    this.highlight.push([row, column]);

    switch (this.board[row][column].split('-')[1]) {
      case 'rook':
        this.moveStraight(row, column);
        break;
      case 'bishop':
        this.moveCrossly(row, column);
        break;
      case 'queen':
        this.moveStraight(row, column);
        this.moveCrossly(row, column);
        break;
      case 'knight':
        this.moveKnight(row, column);
        break;
      case 'king':
        this.moveKing(row, column);
        break;
      case 'pawn':
        this.movePawn(row, column);
        break;
      default:
        break;
    }
    console.log(this.highlight)
  }

  moveStraight(row: number, column: number): void {
    // 上
    for (let i = row - 1; 0 <= i; i--) {
      if (this.board[i][column] === piece.NONE) {
        this.highlight.push([i, column]);
      } else if (this.board[row][column].split('-')[0] === this.board[i][column].split('-')[0]) {
        break;
      } else {
        this.highlight.push([i, column]);
        break;
      }
    }
    // 右
    for (let i = column + 1; i < 8; i++) {
      if (this.board[row][i] === piece.NONE) {
        this.highlight.push([row, i]);
      } else if (this.board[row][column].split('-')[0] === this.board[row][i].split('-')[0]) {
        break;
      } else {
        this.highlight.push([row, i]);
        break;
      }
    }
    // 下
    for (let i = row + 1; i < 8; i++) {
      if (this.board[i][column] === piece.NONE) {
        this.highlight.push([i, column]);
      } else if (this.board[row][column].split('-')[0] === this.board[i][column].split('-')[0]) {
        break;
      } else {
        this.highlight.push([i, column]);
        break;
      }
    }
    // 左
    for (let i = column - 1; 0 <= i; i--) {
      if (this.board[row][i] === piece.NONE) {
        this.highlight.push([row, i]);
      } else if (this.board[row][column].split('-')[0] === this.board[row][i].split('-')[0]) {
        break;
      } else {
        this.highlight.push([row, i]);
        break;
      }
    }
  }

  moveCrossly(row: number, column: number): void {
    // 右上
    let minLine = Math.min(row, 7 - column);
    for (let i = 1; i <= minLine; i++) {
      if (this.board[row - i][column + i] === piece.NONE) {
        this.highlight.push([row - i, column + i]);
      } else if (this.board[row][column].split('-')[0] === this.board[row - i][column + i].split('-')[0]) {
        break;
      } else {
        this.highlight.push([row - i, column + i]);
        break;
      }
    }
    // 右下
    minLine = Math.min(7 - row, 7 - column);
    for (let i = 1; i <= minLine; i++) {
      if (this.board[row + i][column + i] === piece.NONE) {
        this.highlight.push([row + i, column + i]);
      } else if (this.board[row][column].split('-')[0] === this.board[row + i][column + i].split('-')[0]) {
        break;
      } else {
        this.highlight.push([row + i, column + i]);
        break;
      }
    }
    // 左下
    minLine = Math.min(7 - row, column);
    for (let i = 1; i <= minLine; i++) {
      if (this.board[row + i][column - i] === piece.NONE) {
        this.highlight.push([row + i, column - i]);
      } else if (this.board[row][column].split('-')[0] === this.board[row + i][column - i].split('-')[0]) {
        break;
      } else {
        this.highlight.push([row + i, column - i]);
        break;
      }
    }
    // 左上
    minLine = Math.min(row, column);
    for (let i = 1; i <= minLine; i++) {
      if (this.board[row - i][column - i] === piece.NONE) {
        this.highlight.push([row - i, column - i]);
      } else if (this.board[row][column].split('-')[0] === this.board[row - i][column - i].split('-')[0]) {
        break;
      } else {
        this.highlight.push([row - i, column - i]);
        break;
      }
    }
  }

  moveKnight(row: number, column: number): void {
    const highlightTmp: number[][] = [];
    highlightTmp.push([row - 2, column + 1]);
    highlightTmp.push([row - 1, column + 2]);
    highlightTmp.push([row + 1, column + 2]);
    highlightTmp.push([row + 2, column + 1]);
    highlightTmp.push([row + 2, column - 1]);
    highlightTmp.push([row + 1, column - 2]);
    highlightTmp.push([row - 2, column - 1]);
    highlightTmp.push([row - 1, column - 2]);

    for (let item of highlightTmp) {
      if (item[0] < 0 || item[1] < 0 || 7 < item[0] || 7 < item[1]) {
        continue;
      }
      if (this.board[row][column].split('-')[0] === this.board[item[0]][item[1]].split('-')[0]) {
        continue;
      }

      this.highlight.push(item);
    }
  }

  moveKing(row: number, column: number): void {
    const highlightTmp: number[][] = [];
    highlightTmp.push([row + 1, column]);
    highlightTmp.push([row + 1, column + 1]);
    highlightTmp.push([row, column + 1]);
    highlightTmp.push([row - 1, column + 1]);
    highlightTmp.push([row - 1, column]);
    highlightTmp.push([row + 1, column - 1]);
    highlightTmp.push([row, column - 1]);
    highlightTmp.push([row - 1, column - 1]);

    for (let item of highlightTmp) {
      if (item[0] < 0 || item[1] < 0 || 7 < item[0] || 7 < item[1]) {
        continue;
      }
      if (this.board[row][column].split('-')[0] === this.board[item[0]][item[1]].split('-')[0]) {
        continue;
      }

      this.highlight.push(item);
    }
  }

  movePawn(row: number, column: number): void {
    const move: number = this.board[row][column].split('-')[0] === 'white' ? -1 : 1;
    if ((move === -1 && row == 6) || move === 1 && row == 1) {
      if (this.board[row + move * 2][column] === piece.NONE) {
        this.highlight.push([row + move * 2, column]);
      }
    }
    if (this.board[row + move][column] === piece.NONE) {
      this.highlight.push([row + move, column]);
    }
    if (0 < column - 1 && this.board[row + move][column -1] !== piece.NONE
      && this.board[row][column].split('-')[0] !== this.board[row + move][column - 1].split('-')[0]) {
        this.highlight.push([row + move, column - 1]);
    }
    if (column + 1 < 8 && this.board[row + move][column + 1] !== piece.NONE
      && this.board[row][column].split('-')[0] !== this.board[row + move][column + 1].split('-')[0]) {
        this.highlight.push([row + move, column + 1]);
    }
  }

  putPiece(row: number, column: number): void {
    const idx = this.highlight.findIndex(tmp => {
      return tmp[0] === row && tmp[1] === column;
    });
    if (idx === -1 || idx === 0) {
      this.highlight = [];
      return;
    }

    const highlight0 = this.highlight[0];
    // 移動元ピースの特定
    const source = this.board[highlight0[0]][highlight0[1]];
    // 移動元の削除
    const sourceRow = this._.cloneDeep(this.board[highlight0[0]]);
    sourceRow[highlight0[1]] = piece.NONE;
    this.board.splice(highlight0[0], 1, sourceRow);
    // 移動
    const targetRow = this._.cloneDeep(this.board[row]);
    targetRow[column] = source;
    this.board.splice(row, 1, targetRow);

    this.highlight = [];
  }
}
</script>

<style>
</style>
