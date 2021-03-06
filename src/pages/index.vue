<template>
  <div class="container">
    <top-header/>
    <board
      :board="board"
      :highlight="highlight"
      @emit-click="emitClick"
    />
    <side-area
      v-model="color"
      :mode="mode"
      @emit-click-default="emitClickDefault"
      @emit-click-undo="emitClickUndo"
      @emit-click-first="emitClickToFirst"
      @emit-click-edit="emitClickEdit"
      @emit-click-end="emitClickEnd"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import piece from '@/resources/const/piece';
import mode from '@/resources/const/mode';
import MoveUtil from '@/util/move-util';

@Component({
  components: {
    TopHeader :() => import('@/components/common/header/TopHeader.vue'),
    Board :() => import('@/components/common/Board.vue'),
    SideArea :() => import('@/components/common/SideArea.vue')
  }
})
export default class Index extends Vue {
  board: string[][] = [];
  highlight: number[][] = [];
  color: string = piece.WHITE;
  records: string[][][] = [];
  mode: string = mode.GAME;

  created():void {
    this.clearBoard();
    this.resetBoard();
    this.records.push(this._.cloneDeep(this.board));
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

  async emitClick(row: number, column: number): Promise<void> {
    if (this.mode === mode.GAME) {
      if (this.highlight.length === 0) {
        // 可能手の検索
        this.searchBoard(row, column);
      } else {
        // 駒の移動
        this.putPiece(row, column);
        this.highlight = [];
        await this.$nextTick();
        if (!this.canMove(this.changeColor(this.color))) {
          alert('checkmate')
        }
      }
    } else if (this.mode === mode.DELETE) {
      const targetRow = this._.cloneDeep(this.board[row]);
      targetRow[column] = piece.NONE;
      this.board.splice(row, 1, targetRow);
    } else {
      const targetRow = this._.cloneDeep(this.board[row]);
      targetRow[column] = this.mode;
      this.board.splice(row, 1, targetRow);
    }
  }

  searchBoard(row: number, column: number): void {
    if (this.board[row][column] === piece.NONE) {
      return;
    }
    this.highlight = [];
    this.highlight.push([row, column]);
    let arr: number[][] = [];
    arr.push([row, column]);

    switch (this.board[row][column].split('-')[1]) {
      case piece.ROOK:
        arr = arr.concat(MoveUtil.moveStraight(row, column, this.board));
        break;
      case piece.BISHOP:
        arr = arr.concat(MoveUtil.moveCrossly(row, column, this.board));
        break;
      case piece.QUEEN:
        arr = arr.concat(MoveUtil.moveStraight(row, column, this.board));
        arr = arr.concat(MoveUtil.moveCrossly(row, column, this.board));
        break;
      case piece.KNIGHT:
        arr = arr.concat(MoveUtil.moveKnight(row, column, this.board));
        break;
      case piece.KING:
        arr = arr.concat(MoveUtil.moveKing(row, column, this.board));
        break;
      case piece.PAWN:
        arr = arr.concat(MoveUtil.movePawn(row, column, this.board));
        break;
      default:
        break;
    }

    this.removeCheck(arr);
    this.highlight = arr;
  }

  putPiece(row: number, column: number): void {
    const idx = this.highlight.findIndex(tmp => {
      return tmp[0] === row && tmp[1] === column;
    });
    if (idx === -1 || idx === 0) {
      this.highlight = [];
      return;
    }

    this.movePiece(this.highlight[0], [row, column], this.board);
    this.highlight = [];
    this.records.push(this._.cloneDeep(this.board));
  }

  canMove(color: string): boolean {
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        const pieceTmp = this.board[row][column];
        if (pieceTmp === piece.NONE || pieceTmp.split('-')[0] !== color) {
          continue;
        }
        let moveList: number[][] = [];
        switch (pieceTmp.split('-')[1]) {
          case piece.ROOK:
            moveList = MoveUtil.moveStraight(row, column, this.board);
            break;
          case piece.BISHOP:
            moveList = MoveUtil.moveCrossly(row, column, this.board);
            break;
          case piece.QUEEN:
            moveList = MoveUtil.moveStraight(row, column, this.board);
            moveList = MoveUtil.moveCrossly(row, column, this.board);
            break;
          case piece.KNIGHT:
            moveList = MoveUtil.moveKnight(row, column, this.board);
            break;
          case piece.KING:
            moveList = MoveUtil.moveKing(row, column, this.board);
            break;
          case piece.PAWN:
            moveList = MoveUtil.movePawn(row, column, this.board);
            break;
          default:
            break;
        }

        moveList.unshift([row, column]);
        this.removeCheck(moveList);
        if (1 < moveList.length) {
          return true;
        }
      }
    }
    return false;
  }

  movePiece(from: number[], to: number[], board: string[][]): void {
    // 移動元ピースの特定
    const source = board[from[0]][from[1]];
    // 移動元の削除
    const sourceRow = this._.cloneDeep(board[from[0]]);
    sourceRow[from[1]] = piece.NONE;
    board.splice(from[0], 1, sourceRow);
    // 移動
    const targetRow = this._.cloneDeep(board[to[0]]);
    targetRow[to[1]] = source;
    board.splice(to[0], 1, targetRow);
  }

  removeCheck(arr: number[][]): void {
    const removeList: number[][] = [];
    for (let i = 1; i < arr.length; i++) {
      const board: string[][] = this._.cloneDeep(this.board);
      const color = board[arr[0][0]][arr[0][1]].split('-')[0];
      this.movePiece(arr[0], arr[i], board);
      if (0 < MoveUtil.countChecked(color, board)) {
        removeList.push(arr[i]);
      }
    }
    removeList.forEach((item) => {
      const index = arr.indexOf(item);
      if (index !== -1) {
        arr.splice(index, 1);
      }
    });
  }

  changeColor(color: string): string {
    return piece.WHITE === color ? piece.BLACK : piece.WHITE;
  }

  emitClickDefault(): void {
    this.resetBoard();
    this.records.splice(0, 1, this._.cloneDeep(this.board));
    this.records.splice(1, this.records.length);
  }

  emitClickUndo(): void {
    if (this.records.length < 2) {
      return;
    }
    this.records.pop();
    this.board = this._.cloneDeep(this.records[this.records.length - 1]);
  }

  emitClickToFirst(): void {
    this.records.splice(1, this.records.length);
    this.board = this._.cloneDeep(this.records[0]);
  }

  emitClickEdit(modeStr: string): void {
    this.mode = modeStr;
  }

  emitClickEnd(): void {
    let wKing = 0;
    let bKing = 0;
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        const pieceTmp = this.board[row][column];
        if (piece.W_KING === pieceTmp) {
          wKing++;
        }
        if (piece.B_KING === pieceTmp) {
          bKing++;
        }
      }
    }

    if (wKing === 1 && bKing === 1) {
      this.mode = mode.GAME;
      this.records.splice(0, 1, this._.cloneDeep(this.board));
      this.records.splice(1, this.records.length);
    } else {
      alert('キングは白と黒1ずつ配置してください。')
    }
  }
}
</script>

<style>
</style>
