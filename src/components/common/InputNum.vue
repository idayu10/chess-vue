<template>
  <input
    type="text"
    :value="displayValue"
    @input="onInput"
    :class="['text-right', customClass]"
    :placeholder="placeholder"
  >
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import selection from '@/resources/selection.json';
import { Selection } from '@/resources/class/common/selection';
import { LabelValue } from '@/resources/class/common/label-value';

@Component({})
export default class InputNum extends Vue{

  @Prop()
  value!: number;
  @Prop()
  customClass?: string;
  @Prop()
  placeholder?: string;

  /** カーソル位置 */
  selection: number = 0;

  get displayValue(): string {
    if (this.value == null) {
      return '';
    } else {
      return this.separate(this.value);
    }
  }

  created(): void {
  }

  async onInput({target}: {target: HTMLInputElement}) {
    this.selection = target.selectionStart!;
    let val = target.value;
    val = val.replace(/[^0-9]/g, '');
    const beforeComma = (this.displayValue.match( /,/g ) || [] ).length;

    if (val == '') {
      this.$emit('input', null);
    } else {
      this.$emit('input', Number(val));
      target.value = this.displayValue;
    }

    await this.$nextTick();

    const afterComma = (this.displayValue.match( /,/g ) || [] ).length;
    if (beforeComma < afterComma) {
      target.selectionStart = this.selection + 1;
      target.selectionEnd = this.selection + 1;
    }else if (afterComma < beforeComma) {
      target.selectionStart = this.selection - 1;
      target.selectionEnd = this.selection - 1;
    } else {
      target.selectionStart = this.selection;
      target.selectionEnd = this.selection;
    }
  }

  separate(num: number): string {
    if (num == null) {
      return '';
    }
    const strValue = String(num);
    let natural;
    let decimal;
    const decimalPoint = strValue.indexOf('.');
    if (decimalPoint > 0) {
      // 小数点あり
      natural = strValue.substr(0, decimalPoint);
      decimal = strValue.substr(decimalPoint);
    } else {
      // 小数点なし
      natural = strValue;
      decimal = '';
    }
    return natural.replace(/(\d)(?=(\d{3})+$)/g , '$1,') + decimal;
  }
}
</script>

<style scoped>
</style>