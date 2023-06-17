<template>
  <div class="page">
    <div class="page__leftcolumn">
      <menu-languages @selected-title="switchTitle" />
    </div>
    <div class="page__rightcolumn">
      <h1 v-if="error" class="error"> {{ error }} </h1>
      <div v-else class="container">
        <suspense> <!-- экспериментальная функция vue -->
          <table-countries :selected-title="selectedTitle" />
          <template #fallback> Загрузка... </template>
        </suspense>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onErrorCaptured } from "vue";
import menuLanguages from "./components/menuLanguages.vue";
import tableCountries from "./components/tableCountries.vue";

const selectedTitle = ref("");
const error = ref("");

function switchTitle(title: string): void {
  selectedTitle.value = title;
}

onErrorCaptured(e => {
  error.value = e.message
})
</script>

<style scope lang="scss">
.page {
  position: relative;
  display: flex;
  align-items: stretch;
  min-height: 100vh;
  &__rightcolumn {
    background: #f5f5f5;
    width: 100vw;
  }

  &__leftcolumn {
    max-width: 300px;
    min-width: 200px;
    background-color: #8bcce7;
  }
}
.container {
  margin: 90px 84px 0px 36px;

  @media (max-width: 500px) {
    margin-left: 18px;
  }
}
.error {
  color: red;
  display: flex;
  margin-top: 50px;
  justify-content: center;
}
</style>
