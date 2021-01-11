<template>
  <div class="board">
    <div
      v-for="row in 8"
      :key="row"
      class="row"
    >
      <div class="letter-y">{{ (9 - row).toString() }}</div>
      <cell
        v-for="column in 8"
        :key="column"
        :status="board[row - 1][column - 1]"
        :color="color(row - 1, column - 1)"
        @emit-click="emitClick(row - 1, column - 1)"
      />
    </div>
    <div class="row">
      <div class="letter-x">{{ $t('letter.a') }}</div>
      <div class="letter-x">{{ $t('letter.b') }}</div>
      <div class="letter-x">{{ $t('letter.c') }}</div>
      <div class="letter-x">{{ $t('letter.d') }}</div>
      <div class="letter-x">{{ $t('letter.e') }}</div>
      <div class="letter-x">{{ $t('letter.f') }}</div>
      <div class="letter-x">{{ $t('letter.g') }}</div>
      <div class="letter-x">{{ $t('letter.h') }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component({
  components: {
    Cell :() => import('@/components/common/Cell.vue')
  }
})
export default class Board extends Vue{
  @Prop()
  board!: string[][];
  @Prop()
  highlight!: number[][];

  get color() : Function {
    return (row: number, column: number) => {
      const idx = this.highlight.findIndex(tmp => {
        return tmp[0] === row && tmp[1] === column;
      });
      if (idx === -1) {
        return (row + column) % 2 == 0 ? 'white' : 'black';
      }
      return idx === 0 ? 'yellow' : 'red';
    }
  }

  emitClick(row: number, column: number) {
    this.$emit('emit-click', row, column);
  }
}
</script>

<style scoped>
</style>
