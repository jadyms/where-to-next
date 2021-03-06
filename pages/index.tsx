import type { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import Banner from "../components/Banner";
import CountryCard from "../components/CountryCard";
import { Container } from "../components/styled/Container.styled";
import { HomeContentContainer } from "../components/styled/HomePage.styled";
import { ListGrid } from "../components/styled/ListGrid";
import { Loading } from "../components/styled/Loading.styled";
import { ApiCountry } from "../lib/types";

export type CountriesProps = {
  countries: readonly ApiCountry[];
};
function Home({ countries }: CountriesProps) {
  const router = useRouter();

  const [search, setSearch] = useState("");

  //Check if every country has cca3 to use it as a country id
  //If country does not have it, make a decision to use another id
  //or remove from list - future implementation
  const countryHasCca3 = () => {
    const ids = countries.map((country) => country.cca3);
    const resSize = new Set(ids).size;

    if (resSize !== countries.length) {
      return false;
    }

    return true;
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setSearch(value);
  };

  const filterBySearch = countries.filter((item) => {
    const parsedName = item.name?.common.toLowerCase();
    const parsedSearch = search.toLowerCase();

    return parsedName?.includes(parsedSearch);
  });

  if (router.isFallback) {
    return <Loading />;
  }

  return (
    <Container>
      <Head>
        <title>Where to next?</title>
        <link rel="icon" href="/world.png" />
        <meta name="description" content={`Find the next country to visit`} />
        <meta
          property="og:title"
          content={`Where to Next? Using the Rest Countries API`}
        />
        <meta
          property="og:description"
          content={`Find the next country to visit`}
        />
        <meta property="og:type" content="website" />
      </Head>
      <div>
        <Banner onChange={onChange} />
        <HomeContentContainer>
          <ListGrid>
            {filterBySearch?.map((country: ApiCountry) => (
              <li key={country.cca3}>
                <Link href={`/${country.cca3.toLowerCase()}`} passHref>
                  <CountryCard country={country} />
                </Link>
              </li>
            ))}
          </ListGrid>
        </HomeContentContainer>
      </div>
    </Container>
  );
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const response = fetch("https://restcountries.com/v3.1/all")
    .then(async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const data = isJson ? await response.json() : null;

      if (!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }

      return data;
    })
    .catch((error) => {
      console.error("There was an error!", error);
      return null;
    });

  const data = await response;

  const allCountries: ApiCountry[] = data?.map((country: ApiCountry) => {
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

  const countries = JSON.parse(JSON.stringify(allCountries));
  return {
    props: {
      countries,
    },
  };
};
