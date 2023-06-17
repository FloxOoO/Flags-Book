import { useRequest } from "./request";

type CountryOptions = {
  flags: {
    png: string
  },
  translations: {
    rus: {
      official: string
    }
  },
  capital: [
    capital: string
  ] | [],
  maps: {
    googleMaps: string
  },
}

type Country = {
  png: string,
  name: string,
  capital: string,
  map: string
}

export async function useCountries(lang: string): Promise<Country[]> {
  let response: Array<CountryOptions>
  let countries: Array<Country> = []
  if (lang === 'Все' || lang === '') {
    response = await useRequest(`https://restcountries.com/v3.1/all`);
  }
  else {
    response = await useRequest(`https://restcountries.com/v3.1/lang/${lang}`);
  }
  response.forEach((country) => {
    const {
      flags: {
        png
      },
      translations: {
        rus: {
          official
        }
      },
      capital: [
        capital
      ] = [],
      maps: {
        googleMaps
      }
    } = country
    countries.push({
      png: png,
      name: official,
      capital: capital === undefined ? 'Столица отсутствует' : capital,
      map: googleMaps
    })
  })
  return countries
}
