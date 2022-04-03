import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export type Country = {
  readonly id: string;
  readonly commonName: string;
  readonly population: number;
  readonly flag: ReactNode;
};

export type CountriesProps = {
  countries: readonly Country[];
};
function Home({ countries }: CountriesProps) {
  const router = useRouter();
  const { isFallback } = useRouter();

  //Check if every country has cca3
  const countryHasCca3 = () => {
    const ids = countries.map((country) => country.id);
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

  return (
    <>
      <h1>{countries.length} countries!!</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        }}
      >
        {countries?.map((country: Country) => (
          <div key={country.id} style={{ width: "100%", height: "100%" }}>
            <button
              onClick={() => onClick(country.id)}
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

  const allCountries: Country[] = data.map((country: any) => {
    return {
      id: country.cca3,
      commonName: country.name.common,
      flag: country.flag,
      population: country.population,
    };
  });

  const countries = JSON.parse(JSON.stringify(allCountries));
  return {
    props: {
      countries,
    },
  };
};
