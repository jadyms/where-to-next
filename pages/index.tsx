import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
// import Container from "../components/Container";
import { Container } from "../components/styled/Container.styled";
import CountryCard from "../components/CountryCard";
import Search from "../components/Search";
import { ApiCountry } from "../lib/types";

export type CountriesProps = {
  countries: readonly ApiCountry[];
};
function Home({ countries }: CountriesProps) {
  const router = useRouter();
  const { isFallback } = useRouter();
  const [search, setSearch] = useState("");

  //Check if every country has cca3
  const countryHasCca3 = () => {
    const ids = countries.map((country) => country.cca3);
    const resSize = new Set(ids).size;

    if (resSize !== countries.length) {
      return false;
    }

    return true;
  };

  //todo change for link
  const onClick = (countryId: string) => {
    router.push(`/${countryId.toLowerCase()}`);
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

  if (isFallback) {
    return "Loading ...";
  }

  return (
    <Container>
      <div className="h-full">
        {/* header */}
        <div className="pb-6">
          <div className="h-[260px] bg-blue-700 flex items-center justify-center px-2">
            <div className="flex flex-col text-white items-center">
              <h1 className=" font-bold text-4xl sm:text-7xl text-center">
                Where to next?
              </h1>
              <span className="pt-2">
                Using the{" "}
                <a
                  className="cursor-pointer hover:text-orange-200 underline"
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://restcountries.com/#rest-countries"
                >
                  Rest Countries API
                </a>
              </span>
            </div>
            <div className="flex justify-start w-64 h-">
              <img
                className="w-full w-full object-contain"
                src="/pngwing.com.png"
                alt="Cartoon with a guy stepping on a map"
              />
            </div>
          </div>

          <div className="-mt-8 px-4">
            <div className="-mx-1 flex bg-orange-500 rounded-lg items-center justify-center py-4 ">
              <div className="bg-white w-full mx-4 rounded-md text-center">
                <Search
                  id="search-country"
                  onChange={(event) => onChange(event)}
                />
              </div>
            </div>
          </div>
        </div>
        {/* end header */}

        <ul
          className="w-full h-[calc(100%_-_260px)] grid grid-cols-1 sm:grid-cols-2 overflow-y-auto mb-20 gap-2"
          // style={{
          //   display: "grid",
          //   gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          //   width: "100%",
          // }}
        >
          {filterBySearch?.map((country: ApiCountry) => (
            <li
              key={country.cca3}
              onClick={() => onClick(country.cca3)}
              className="hover:bg-blue-100 cursor-pointer"
            >
              <CountryCard country={country} />
            </li>
          ))}
        </ul>
      </div>
    </Container>
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

  const countries = JSON.parse(JSON.stringify(allCountries));
  return {
    props: {
      countries,
    },
  };
};
