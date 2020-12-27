<template>
  <button
    class="btn-condition-clear"
     @click="onClick"
  >
    <i class="fa fa-times-circle"></i>
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({})
export default class ConditionClearButton extends Vue{

  created(): void {
  }

  onClick(): void {
    this.$emit('emit-click');
  }
}
</script>

<style scoped>
.btn-condition-clear {
  display: inline-block;
  text-decoration: none;
  background: none;
  /*ボタン色*/
  color: rgb(132, 137, 151);
  border: none;
  border-bottom: solid 1px;
}
.btn-condition-clear:hover {
  /*ボタンを押したとき*/
  -webkit-transform: translateY(4px);
  transform: translateY(4px);/*下に動く*/
  border-bottom: none;/*線を消す*/
}
</style>