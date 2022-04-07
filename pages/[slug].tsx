import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Banner from "../components/Banner";
import CountryCard from "../components/CountryCard";
import CountryDetailsComponent from "../components/CountryDetailsComponent";
import { ContentContainer } from "../components/styled/DetailsPage.styled";
import { Container } from "../components/styled/Container.styled";
import {
  BackLink,
  IconChevronLeft,
  NoData,
  SubHeader,
} from "../components/styled/CountryDetails.styled";
import { ListGrid } from "../components/styled/ListGrid";
import { Loading } from "../components/styled/Loading.styled";
import { ApiCountry } from "../lib/types";

type ApiProps = {
  country: ApiCountry[];
  bordering: ApiCountry[];
};

function CountryDetails({ country, bordering }: ApiProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <Loading />;
  }
  const currentCountry = country[0];

  const currentCountryName = currentCountry.name?.common;

  return (
    <Container>
      <Head>
        <title>{currentCountryName} - Where to Next?</title>
        <link rel="icon" href="/world.png" />
        <meta
          name="description"
          content={`Learn more about ${currentCountryName}`}
        />
        <meta
          property="og:title"
          content={`${currentCountryName} - Where to next?`}
        />
        <meta
          property="og:description"
          content={`Learn more about ${currentCountryName}`}
        />
        <meta property="og:type" content="website" />
      </Head>
      <div>
        <Banner hasSearch={false} />
        <ContentContainer>
          <Link href={"/"} passHref={true}>
            <BackLink>
              <IconChevronLeft />
              Back to results
            </BackLink>
          </Link>
          <CountryDetailsComponent currentCountry={currentCountry} />

          <SubHeader>
            <h1>Bordering countries</h1>
          </SubHeader>

          {bordering.length === 0 && (
            <NoData>
              <h2>No data found</h2>
            </NoData>
          )}

          {bordering.length > 0 && (
            <ListGrid columns={3}>
              {bordering?.map((borderCountry) => (
                <div key={borderCountry.cca3}>
                  <Link href={`/${borderCountry.cca3.toLowerCase()}`} passHref>
                    <CountryCard country={borderCountry} />
                  </Link>
                </div>
              ))}
            </ListGrid>
          )}
        </ContentContainer>
      </div>
    </Container>
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
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${item}`)
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

        const json = await res;

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
