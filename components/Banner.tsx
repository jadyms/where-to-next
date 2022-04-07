import React, { FunctionComponent } from "react";
import SearchInput from "./Search";
import {
  Header,
  HeaderBannerWrapper,
  HeaderBanner,
  Subtitle,
  BannerImage,
  InputWrapperOrange,
  InputWrapperWhite,
} from "./styled/Header.styled";

export type BannerProperties = {
  readonly hasSearch?: boolean;
  readonly onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
};
const Banner: FunctionComponent<BannerProperties> = ({
  hasSearch = true,
  onChange,
}) => {
  return (
    <Header>
      <HeaderBannerWrapper>
        <HeaderBanner>
          <div>
            <h1>Where to next?</h1>

            <Subtitle>
              Using the {""}
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://restcountries.com/#rest-countries"
              >
                Rest Countries API
              </a>
            </Subtitle>
          </div>

          <BannerImage>
            <img
              src="/pngwing.com.png"
              alt="Cartoon with a guy stepping on a map"
            />
          </BannerImage>
        </HeaderBanner>
      </HeaderBannerWrapper>

      {hasSearch && onChange && (
        <InputWrapperOrange>
          <InputWrapperWhite>
            <SearchInput
              id="search-country"
              onChange={(event) => onChange(event)}
            />
          </InputWrapperWhite>
        </InputWrapperOrange>
      )}
    </Header>
  );
};
export default Banner;
