import Link from "next/link";
import React, { FunctionComponent } from "react";
import { ApiCountry } from "../lib/types";

export type BorderingComponentProperties = {
  readonly borderCountry: ApiCountry;
};
const BorderingComponent: FunctionComponent<BorderingComponentProperties> = ({
  borderCountry,
}) => {
  return (
    <Link href={`/${borderCountry.cca3.toLowerCase()}`} passHref={true}>
      <a>
        <img
          className="rounded-md h-8 w-10"
          src={borderCountry.flags?.png}
          alt={`${borderCountry.name?.common}-flag`}
        />
        <div className="flex flex-col">
          <span className="text-lg font-medium">
            {borderCountry.name?.common}
          </span>

          <span className="text-sm text-gray-500">
            {borderCountry.name?.official}
          </span>
        </div>

        <span className="text-sm font-medium">
          Population: {borderCountry.population?.toLocaleString()}
        </span>
      </a>
    </Link>
  );
};
export default BorderingComponent;
