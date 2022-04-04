import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import BorderingComponent from "../components/BorderingComponent";
import CountryDetailsComponent from "../components/CountryDetailsComponent";
import { ApiCountry } from "../lib/types";

type ApiProps = {
  country: ApiCountry[];
  bordering: ApiCountry[];
};

function CountryDetails({ country, bordering }: ApiProps) {
  const router = useRouter();

  if (router.isFallback) {
    return "Loading ...";
  }
  const currentCountry = country[0];

  return (
    <div className="w-screen">
      <Link href={"/"} passHref={true}>
        <a
          className="text-lg font-medium"
          style={{
            cursor: "pointer",
          }}
        >
          Back to results
        </a>
      </Link>
      <CountryDetailsComponent currentCountry={currentCountry} />

      <h1 className="font-medium text-lg">Bordering</h1>
      <div
        className="gap-2"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        }}
      >
        {bordering.length === 0 && <h1>No neighbours</h1>}
        {bordering.length > 0 &&
          bordering?.map((borderCountry) => (
            <div
              key={borderCountry.cca3}
              style={{ width: "100%", height: "100%" }}
              className="shadow-sm hover:bg-blue-100 border border-gray-100 p-2 rounded-md"
            >
              <BorderingComponent borderCountry={borderCountry} />
            </div>
          ))}
      </div>
    </div>
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
  if (!params) {
    return {
      notFound: true,
    };
  }
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

  const countries = data.map((c: ApiCountry) => {
    return {
      cca3: c.cca3,
      flag: c.flag,
      name: c.name,
      capital: c.capital ?? [],
      currencies: c.currencies,
      population: c.population,
      languages: c.languages,
      borders: c.borders ?? [],
      flags: c.flags,
    };
  });

  const country = JSON.parse(JSON.stringify(countries));

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
            flag: item.flag,
            name: item.name,
            capital: item.capital ?? [],
            currencies: item.currencies,
            population: item.population,
            languages: item.languages,
            borders: item.borders ?? [],
            flags: item.flags,
          };
        });

        return result[0];
      })
    );

    return bordersDet;
  }

  const borderCountries = await getChapters(borders);
  const bordering = JSON.parse(JSON.stringify(borderCountries));

  return {
    props: {
      country,
      bordering,
    },
    revalidate: 60 * 60 * 24, //24 hours
  };
};
