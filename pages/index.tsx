import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ScriptProps } from "next/script";
import { ReactNode } from "react";

export type Country = {
  readonly commonName: string;
  readonly population: number;
  readonly flag: ReactNode;
};

export type CountriesProps = {
  countries: readonly Country[];
};
function Home({ countries }: CountriesProps) {
  const { isFallback } = useRouter();

  const onClick = (country: string) => {
    console.log(country);
  };

  if (isFallback) {
    return "Loading ...";
  }

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        }}
      >
        {countries?.map((country: Country) => (
          <div
            key={country.commonName}
            style={{ width: "100%", height: "100%" }}
          >
            <button
              onClick={() => onClick(country.commonName)}
              style={{ width: "100%", height: "100%", cursor: "pointer" }}
            >
              <h1>{country.commonName}</h1>
              <p>{country.population}</p>
              <p>{country.flag}</p>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();

  const allCountries: Country[] = data.map((c) => {
    return {
      commonName: c.name.common,
      flag: c.flag,
      population: c.population,
    };
  });

  const countries = JSON.parse(JSON.stringify(allCountries));
  return {
    props: {
      countries,
    },
  };
};
