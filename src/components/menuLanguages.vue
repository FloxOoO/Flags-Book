<template>
  <div class="languages">
    <div
      class="languages__title"
      v-for="(title, id) of menuTitles"
      :key="id"
      @click="switchTitle(title)"
      :class="{
        'languages__title-active': title === activeTitle,
      }"
    >
      <span> {{ title }} </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

const emit = defineEmits<{
  'selected-title': [title: string]
}>()

const activeTitle: Ref<string> = ref('Все')

function switchTitle(title: string): void {
  activeTitle.value = title
  emit('selected-title', title)
}

const menuTitles: Array<string> = [
  "Все",
  "Chinese",
  "Spanish",
  "English",
  "Arabic",
  "Hindi",
  "Bengali",
  "Portuguese",
  "Russian",
  "Japanese",
  "Italian",
  "French",
  "Korean",
  "German"
];
</script>
<style lang="scss">
.languages {
  width: 100%;
  position: sticky;
  top: 120px;
  &__title {
    cursor: pointer;
    span {
      padding: 27px;
      font-family: Inter;
      font-size: 20px;
      font-weight: 500;
      line-height: 41px;
      letter-spacing: 0em;
      text-align: left;

      @media (max-width: 500px) {
        font-size: 28px;
        line-height: 61px;
      }
    }

    &:hover {
      span {
        font-weight: 700;
      }
    }
    position: relative;

    &-active {
      span {
        font-weight: 700;
      }
      &:before {
        content: " ";
        position: absolute;
        top: 50%;
        left: 9px;
        transform: translateY(-50%);
        display: inline-block;
        width: 5px;
        height: 21px;
        background: #058cd9;
      }
    }
  }
}
</style>
