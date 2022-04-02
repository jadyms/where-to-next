import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";

function Home({ countries }) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return "Loading ...";
  }
  return (
    <>
      <h1>Hello</h1>
      <div
        style={{
          display: "grid",

          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        }}
      >
        {countries
          .sort((a, b) =>
            a.name.common < b.name.common
              ? -1
              : a.name.common > b.name.common
              ? 1
              : 0
          )
          .map((country) => (
            <div key={country.cioc}>
              <h1>{country.name.common}</h1>
              <p>{country.population}</p>
              <p>{country.flag}</p>
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

  return {
    props: {
      countries: data,
    },
  };
};
