<template>
  <div class="countries" v-if="countries.length">
    <div
      v-for="countrie in countries"
      :key="countrie.name"
      class="countries__block"
      @click="openGoogleMaps(countrie.map)"
    >
      <div class="flag">
        <img :src="countrie.png" alt="" />
      </div>
      <div class="description">
        <div class="description__name">{{ countrie.name }}</div>
        <div class="description__capital">{{ countrie.capital }}</div>
      </div>
    </div>
  </div>
  <div class="empty" v-else>Стран не найдено</div>
</template>
<script setup lang="ts">
import { watch, ref, Ref } from "vue";
import { useCountries } from "../use/countries";

type Country = {
  png: string;
  name: string;
  capital: string;
  map: string;
};

const countries: Ref<Country[]> = ref([]);

const props = defineProps<{
  selectedTitle: string;
}>();

async function getCountries() {
  countries.value = await useCountries(props.selectedTitle);
}

function openGoogleMaps(countrieURL: string): void {
  window.open(countrieURL, '_blank')
}

watch(() => props.selectedTitle, getCountries, { immediate: true });
</script>
<style scoped lang="scss">
@mixin textcard {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: white;
  @media (max-width: 1350px) {
    font-size: 14px;
  }
  @media (max-width: 780px) {
    font-size: 18px;
  }
  @media (max-width: 660px) {
    font-size: 14px;
  }
}
.countries {
  display: flex;
  flex-wrap: wrap;
  &__block {
    position: relative;
    min-width: 300px;
    min-height: 300px;
    margin: 15px;
    box-shadow: 3px 3px 5px black;
    border-radius: 10px;
    transition: .3s;

    &:hover {
      transition: .3s;
      transform: scale(1.1);
      cursor: pointer;
    }

    @media (max-width: 1350px) {
      min-width: 200px;
      min-height: 200px;
    }

    @media (max-width: 780px) {
      min-width: 300px;
      min-height: 300px;
    }
    @media (max-width: 660px) {
      min-width: 200px;
      min-height: 200px;
    }
  }
}
.flag {
  position: relative;
  padding-bottom: 300px;
  img {
    position: absolute;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 1350px) {
    transition: .3s;
    padding-bottom: 200px;
  }
  @media (max-width: 780px) {
    transition: .3s;
    padding-bottom: 300px;
  }
  @media (max-width: 660px) {
    transition: .3s;
    padding-bottom: 200px;
  }
}
.description {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: linear-gradient(
    180deg,
    #1f1e1e 0%,
    rgba(97, 90, 90, 0.78184) 26.56%,
    rgba(108, 105, 105, 0.614583) 56.25%,
    rgba(217, 217, 217, 0) 100%
  );
  &__name {
    margin: 20px 20px 10px 20px;
    @include textcard();
  }

  &__capital {
    margin: 0px 0px 0px 20px;
    @include textcard();
  }
}
.empty {
  font-family: "Inter";
  font-style: normal;
  color: grey;
  font-size: 36px;
  display: flex;
  justify-content: center;
}
</style>
