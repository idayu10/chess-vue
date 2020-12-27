<template>
  <div class="container">
    <top-header/>
    <board/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  components: {
    TopHeader :() => import('@/components/common/header/TopHeader.vue'),
    Board :() => import('@/components/common/Board.vue')
  }
})
export default class Index extends Vue {
  private readonly NONE: string = 'none';
  private readonly W_KING: string = 'wk';
  private readonly W_QUEEN: string = 'wq';
  private readonly W_ROOK: string = 'wr';
  private readonly W_KNIGHT: string = 'wn';
  private readonly W_BISHOP: string = 'wb';
  private readonly W_PAWN: string = 'wp';
  private readonly B_KING: string = 'bk';
  private readonly B_QUEEN: string = 'bq';
  private readonly B_ROOK: string = 'br';
  private readonly B_KNIGHT: string = 'bn';
  private readonly B_BISHOP: string = 'bb';
  private readonly B_PAWN: string = 'bp';
  private readonly PIECE_CLASS:{[key: string]: string} = {
    none: 'none',
    wk: 'white-king',
    wq: 'white-queen',
    wr: 'white-rook',
    wn: 'white-knight',
    wb: 'white-bishop',
    wp: 'white-pawn',
    bk: 'black-king',
    bq: 'black-queen',
    br: 'black-rook',
    bn: 'black-knight',
    bb: 'black-bishop',
    bp: 'black-pawn'
  }
  board: string[][] = [];

  mounted():void {
    this.clearBoard();
    this.resetBoard();
    this.showBoard();
  }

  clearBoard(): void {
    for (let row = 0; row < 8; row++) {
      this.board[row] = [];
      for (let column = 0; column < 8; column++) {
        this.board[row][column] = this.NONE;
      }
    }
  }

  resetBoard(): void {
    this.board = [
      [this.B_ROOK, this.B_KNIGHT, this.B_BISHOP, this.B_QUEEN, this.B_KING, this.B_BISHOP, this.B_KNIGHT,this.B_ROOK],
      [this.B_PAWN, this.B_PAWN, this.B_PAWN, this.B_PAWN, this.B_PAWN, this.B_PAWN, this.B_PAWN, this.B_PAWN],
      [this.NONE, this.NONE, this.NONE, this.NONE, this.NONE, this.NONE, this.NONE, this.NONE],
      [this.NONE, this.NONE, this.NONE, this.NONE, this.NONE, this.NONE, this.NONE, this.NONE],
      [this.NONE, this.NONE, this.NONE, this.NONE, this.NONE, this.NONE, this.NONE, this.NONE],
      [this.NONE, this.NONE, this.NONE, this.NONE, this.NONE, this.NONE, this.NONE, this.NONE],
      [this.W_PAWN, this.W_PAWN, this.W_PAWN, this.W_PAWN, this.W_PAWN, this.W_PAWN, this.W_PAWN, this.W_PAWN],
      [this.W_ROOK, this.W_KNIGHT, this.W_BISHOP, this.W_QUEEN, this.W_KING, this.W_BISHOP, this.W_KNIGHT,this.W_ROOK]
    ]
  }

  showBoard(): void {
    const board: Element = document.getElementsByClassName('board').item(0)!;
    for (let row = 0; row < 8; row++) {
      const rowEle = board.children.item(row);
      for (let column = 1; column < 9; column++) {
        const item = rowEle!.children.item(column);
        this.changeStatus(item!, this.board[row][column-1]);
      }
    }
  }

  changeStatus(element: Element, piece: string): void {
    const classes = element.className.split(' ');
    for (let classVal of Object.values(this.PIECE_CLASS)) {
      const index = classes.findIndex(item => item === classVal);
      if (index !== -1) {
        classes.splice(index, 1);
        classes.push(this.PIECE_CLASS[piece]);
        element.className = classes.join(' ');
        break;
      }
    }
  }
}
</script>

<style>
</style>
