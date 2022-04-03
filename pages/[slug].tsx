import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ApiCountry } from "../lib/types";

type ApiProps = {
  country: ApiCountry[];
  bordering: ApiCountry[];
};

function CountryDetails({ country, bordering }: ApiProps) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return "Loading ...";
  }
  const currentCountry = country[0];

  return (
    <>
      <Link href={"/"} passHref={true}>
        <h1
          style={{
            cursor: "pointer",
          }}
        >
          Back to results
        </h1>
      </Link>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        }}
      >
        <div
          key={currentCountry.cca3}
          style={{ width: "100%", height: "100%" }}
        >
          <h1>{currentCountry.name.common}</h1>
          <p>{currentCountry.population}</p>
          <p>{currentCountry.flag}</p>
          <p>{currentCountry.capital[0]}</p>
          <p>{currentCountry.currencies.key}</p>
          <p>{currentCountry.languages.spa}</p>
        </div>
      </div>

      <h1>Bordering</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        }}
      >
        {bordering.length === 0 && <h1>No neighbours</h1>}
        {bordering.length > 0 &&
          bordering?.map((c) => (
            <div key={c.cca3} style={{ width: "100%", height: "100%" }}>
              <h1>{c.name.common}</h1>
              <p>{c.population}</p>
              <p>{c.flag}</p>
            </div>
          ))}
      </div>
    </>
  );
}

export default CountryDetails;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = fetch(
    `https://restcountries.com/v3.1/alpha/${params.slug as string}`
  )
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

  if (!data) {
    return {
      notFound: true,
    };
  }

  const country = data.map((c: ApiCountry) => {
    return {
      cca3: c.cca3,
      flag: c.flag,
      name: c.name,
      capital: c.capital,
      currencies: c.currencies,
      population: c.population,
      languages: c.languages,
      borders: c.borders || [],
    };
  });

  const borders = country[0]?.borders
    ? country[0].borders.map((item: string) => item.toLowerCase())
    : [];

  async function getChapters(borders: string[]) {
    if (!borders) {
      return [];
    }
    const bordersDet = await Promise.all(
      borders.map(async (item) => {
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${item}`);
        const json = await res.json();

        const result = json.map((item: ApiCountry) => {
          return {
            cca3: item.cca3,
            name: item.name,
            flag: item.flag,
            population: item.population,
          };
        });

        return result[0];
      })
    );

    return bordersDet;
  }

  const bordering = await getChapters(borders);

  return {
    props: {
      country,
      bordering,
    },
    revalidate: 60 * 60 * 24, //24 hours
  };
};
