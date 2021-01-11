<template>
  <div class="side">
    <div class="buttos">
      <button @click="onClickDefault">
        初期配置
      </button>
      <button @click="onClickToFirst">
        <i class="fa fa-angle-double-left"></i>
        最初へ
      </button>
      <button @click="onClickUndo">
        <i class="fa fa-angle-left"></i>
        1手戻す
      </button>
      <button v-if="isGame" @click="onClickEdit(modeConst.DELETE)">
        編集モード
      </button>
      <button v-else @click="onClickEnd">
        編集モード終了
      </button>
    </div>
    <div v-if="!isGame" class="edit">
      <div class="mode">
        <div class="row">
          <div>mode:</div>
          <div v-if="mode === modeConst.DELETE">削除</div>
          <div v-else :class="['small-box', mode]"></div>
        </div>
      </div>
      <div class="row">
        <div :class="['small-box', modeConst.W_KING]" @click="onClickEdit(modeConst.W_KING)"></div>
        <div :class="['small-box', modeConst.W_QUEEN]" @click="onClickEdit(modeConst.W_QUEEN)"></div>
        <div :class="['small-box', modeConst.W_ROOK]" @click="onClickEdit(modeConst.W_ROOK)"></div>
        <div :class="['small-box', modeConst.W_BISHOP]" @click="onClickEdit(modeConst.W_BISHOP)"></div>
        <div :class="['small-box', modeConst.W_KNIGHT]" @click="onClickEdit(modeConst.W_KNIGHT)"></div>
        <button @click="onClickEdit(modeConst.DELETE)">削除</button>
      </div>
      <div class="row">
        <div :class="['small-box', modeConst.B_KING]" @click="onClickEdit(modeConst.B_KING)"></div>
        <div :class="['small-box', modeConst.B_QUEEN]" @click="onClickEdit(modeConst.B_QUEEN)"></div>
        <div :class="['small-box', modeConst.B_ROOK]" @click="onClickEdit(modeConst.B_ROOK)"></div>
        <div :class="['small-box', modeConst.B_BISHOP]" @click="onClickEdit(modeConst.B_BISHOP)"></div>
        <div :class="['small-box', modeConst.B_KNIGHT]" @click="onClickEdit(modeConst.B_KNIGHT)"></div>
      </div>
    </div>
    <div class="player">
      <label>
        <input type="radio" name="color" value="white" v-model="computedValue">
        白
      </label>
      <label>
        <input type="radio" name="color" value="black" v-model="computedValue">
        黒
      </label>
    </div>
    <div class="record"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import modes from '@/resources/const/mode';

@Component({})
export default class SideArea extends Vue{
  @Prop()
  value!: string;
  @Prop()
  color!: string;
  @Prop()
  mode!: string;

  modeConst = modes;

  get computedValue(): string {
    return this.value;
  }
  set computedValue(value: string) {
    this.$emit('input', value);
  }

  get isGame(): boolean {
    return this.mode === modes.GAME;
  }

  onClickDefault(): void {
    this.$emit('emit-click-default');
  }

  onClickToFirst(): void {
    this.$emit('emit-click-first');
  }

  onClickUndo(): void {
    this.$emit('emit-click-undo');
  }

  onClickEdit(mode: string): void {
    this.$emit('emit-click-edit', mode);
  }

  onClickEnd(): void {
    this.$emit('emit-click-end');
  }
}
</script>

<style scoped>
</style>
