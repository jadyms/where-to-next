import React, { forwardRef, FunctionComponent } from "react";
import { ApiCountry } from "../lib/types";
import {
  CardBody,
  CardContent,
  CardHeader,
  CountryCardStyled,
  Pill,
} from "./styled/CountryCard.styled";
import { Detail } from "./styled/Detail.styled";
import { Text } from "./styled/Text.styled";
import { Title } from "./styled/Title.styled";

export type CountryCardProperties = {
  readonly country: ApiCountry;
};
export type CardWrappedProperties = CountryCardProperties & {
  href?: string;
};

// eslint-disable-next-line react/display-name
const CardWrapped = forwardRef<any, CardWrappedProperties>(
  ({ country, href }, ref) => (
    <a ref={ref} href={href}>
      <CountryCard country={country} />
    </a>
  )
);

const CountryCard: FunctionComponent<CountryCardProperties> = ({ country }) => {
  return (
    <CountryCardStyled>
      <CardBody>
        <CardHeader>
          <img src={country.flags?.png} alt={`${country.name?.common}-flag`} />
          <div>
            <Title>{country.name?.common}</Title>
            <Text>{country.name?.official}</Text>
          </div>
        </CardHeader>
        {country.unMember && <Pill>UN Member</Pill>}
      </CardBody>
      <CardContent>
        <Detail>Population: {country.population?.toLocaleString()}</Detail>
      </CardContent>
    </CountryCardStyled>
  );
};
export default CardWrapped;
