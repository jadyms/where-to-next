import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

import { ApiCountry } from "../lib/types";

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
      {state.unMember ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          }}
        >
          {filterUnMember?.map((country: ApiCountry) => (
            <div key={country.cca3} style={{ width: "100%", height: "100%" }}>
              <button
                className="hover:bg-pink-100"
                onClick={() => onClick(country.cca3)}
                style={{ width: "100%", height: "100%", cursor: "pointer" }}
              >
                <h1>{country?.name?.common}</h1>
                <p>{country?.population}</p>
                <p>{country?.flag}</p>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          }}
        >
          {countries?.map((country: ApiCountry) => (
            <div key={country.cca3} style={{ width: "100%", height: "100%" }}>
              <button
                className="hover:bg-pink-100"
                onClick={() => onClick(country.cca3)}
                style={{ width: "100%", height: "100%", cursor: "pointer" }}
              >
                <h1>{country?.name?.common}</h1>
                <p>{country?.population}</p>
                <p>{country?.flag}</p>
              </button>
            </div>
          ))}
        </div>
      )}
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
      population: country.population,
      capital: country.capital ?? [],
      unMember: country.unMember,
    };
  });

  const countries = JSON.parse(JSON.stringify(allCountries));
  return {
    props: {
      countries,
    },
  };
};
