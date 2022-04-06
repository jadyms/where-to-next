import Head from "next/head";
import Link from "next/link";
import { BackLink } from "../components/styled/CountryDetails.styled";
import { Page404 } from "../components/styled/Page404.styled";

export default function Custom500() {
  return (
    <>
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
      <Page404>
        <div>
          Oops... something went wrong
          <Link href={"/"}>
            <BackLink>Click here to go back</BackLink>
          </Link>
        </div>
      </Page404>
    </>
  );
}
