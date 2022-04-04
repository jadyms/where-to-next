import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

import { ApiCountry } from "../lib/types";
import CountryCard from "../components/CountryCard";

export type CountriesProps = {
  countries: readonly ApiCountry[];
};
function Home({ countries }: CountriesProps) {
  const router = useRouter();
  const { isFallback } = useRouter();
  const [state, setState] = useState({
    unMember: false,
  });

  //Check if every country has cca3
  const countryHasCca3 = () => {
    const ids = countries.map((country) => country.cca3);
    const resSize = new Set(ids).size;

    if (resSize !== countries.length) {
      return false;
    }

    return true;
  };

  const onClick = (countryId: string) => {
    router.push(`/${countryId.toLowerCase()}`);
  };

  if (isFallback) {
    return "Loading ...";
  }

  const filterUnMember = countries.filter((c) => c.unMember);

  return (
    <>
      <h1>{countries.length} countries!!</h1>
      <button onClick={() => setState({ ...state, unMember: !state.unMember })}>
        click
      </button>

      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        }}
      >
        {state.unMember
          ? filterUnMember?.map((country: ApiCountry) => (
              <li
                key={country.cca3}
                onClick={() => onClick(country.cca3)}
                className="hover:bg-blue-100 cursor-pointer"
              >
                <CountryCard country={country} />
              </li>
            ))
          : countries?.map((country: ApiCountry) => (
              <li
                key={country.cca3}
                onClick={() => onClick(country.cca3)}
                className="hover:bg-blue-100 cursor-pointer"
              >
                <CountryCard country={country} />
              </li>
            ))}
      </ul>
    </>
  );
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();

  const allCountries: ApiCountry[] = data.map((country: ApiCountry) => {
    return {
      cca3: country.cca3,
      name: country.name,
      flag: country.flag,
      flags: country.flags,
      population: country.population,
      capital: country.capital ?? [],
      unMember: country.unMember,
    };
  });
  console.log(allCountries[0]);

  const countries = JSON.parse(JSON.stringify(allCountries));
  return {
    props: {
      countries,
    },
  };
};
