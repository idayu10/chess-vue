<template>
  <div class="board">
    <div
      v-for="row in 8"
      :key="row"
      class="row"
    >
      <div class="letter-y">{{ (9 - row).toString() }}</div>
      <div
        v-for="column in 8"
        :key="column"
        :class="['box', (row + column) % 2 == 0 ? 'white' : 'black', 'none']"
      >
      </div>
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

@Component({})
export default class Board extends Vue{

}
</script>

<style scoped>
</style>
