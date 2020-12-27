<template>
  <select  v-model="compValue">
    <option value=""></option>
    <option
      v-for="(item, index) in items"
      :key="index"
      :value="item.value"
    >
      {{ item.label }}
    </option>
  </select>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import selection from '@/resources/selection.json';
import { Selection } from '@/resources/class/common/selection';
import { LabelValue } from '@/resources/class/common/label-value';

@Component({})
export default class SelectBox extends Vue{

  @Prop()
  value!: string;
  /** 選択肢のカテゴリー */
  @Prop()
  category!: string;
  /** valueを数値として扱う */
  @Prop()
  isNumber?: boolean;

  /** 選択肢 */
  items: LabelValue[] = [];

  get compValue(): string  {
    return this.value;
  }

  created(): void {
    const readed: Selection = selection;
    if (readed[this.category] != null) {
      this.items = readed[this.category];
    }
  }

  set compValue(value: string) {
    const isNumber = this.isNumber == null ? false : this.isNumber;
    let retrunVal: string | number | null = null;
    if (this.isNumber) {
      if (value === '') {
        retrunVal = null;
      } else {
        retrunVal = Number(value);
      }
    } else {
      retrunVal = value;
    }
    this.$emit('input', retrunVal);
  }
}
</script>

<style scoped>
</style>