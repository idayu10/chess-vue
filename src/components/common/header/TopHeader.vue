<template>
  <header id="header">
    <div class="contents">
      <div class="dropdown">
        <span> menu </span>
        <div class="dropdown-content">
          <p
            v-for="(menu, index) in menuItems"
            :key="index"
            @click.stop.prevent="clickMenu(menu.url)"
          >
            {{menu.label}}
          </p>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import menu from './menu';
import { Menu } from '@/resources/class/common/menu'

@Component({})
export default class TopHeader extends Vue{

  menuItems: Menu[] = menu;

  created(): void {
  }

  clickMenu(url: string) {
    this.$router.push(url);
  }
}
</script>

<style scoped>
header {
  width: 100%;
  padding: 25px 15px;
  color: #ffffff;
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  background-color: rgb(91, 91, 91);
}
/** ドロップダウン部分 */
.dropdown {
  position: relative;
  display: flex;
  width: 10%;
}
.dropdown-content {
  display: none;
  position: absolute;
  color: #000000;
  background-color: #f9f9f9;
  /* opacity: 80%; */
  min-width: 160px;
  white-space: nowrap;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
}
.dropdown:hover .dropdown-content {
  display: block;
}
.dropdown-content > p{
  text-align: left;
}
</style>
