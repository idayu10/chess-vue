<template>
  <div
    :class="['box', status, color]"
    @click="onClick"
  >
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component({})
export default class Cell extends Vue{
  @Prop()
  status!: string;
  @Prop()
  color!: string;

  onClick(): void {
    this.$emit('emit-click');
  }
}
</script>

<style scoped>
</style>
